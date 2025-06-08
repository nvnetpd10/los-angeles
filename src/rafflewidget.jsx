import { useState, useEffect } from "react";
//import "./RaffleWidget.css";

const userId = 123;

export default function RaffleWidget() {
  const [expanded, setExpanded] = useState(false);
  const [tickets, setTickets] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchTickets = async () => {
    try {
      const res = await fetch(`/api/raffle-status?userId=${userId}`);
      const data = await res.json();
      setTickets(data.tickets || 0);
      setError("");
    } catch (err) {
      setError("Error loading tickets");
    }
  };

  const joinRaffle = async () => {
    try {
      await fetch(`/api/raffle-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      await fetchTickets();
    } catch (err) {
      setError("Error, try again.");
    }
  };

  const proceedToPayment = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 100,
          currency: "usd",
          userId,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        // Redirect to Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else {
        setError("Failed to initiate payment.");
      }
    } catch (err) {
      setError("Stripe checkout failed.");
    }
  };

  // Handle simulated webhook on page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("payment");
    const returnedUserId = params.get("userId");

    if (status === "success" && returnedUserId === String(userId)) {
      fetch("/api/stripe-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMessage("✅ Payment successful! Tickets updated.");
            fetchTickets();
          } else {
            setMessage("❌ Payment succeeded but ticket update failed.");
          }
        })
        .catch(() => setMessage("❌ Payment succeeded but webhook failed."));
    } else if (status === "fail") {
      setMessage("❌ Payment failed. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className={`raffle-widget ${expanded ? "expanded" : ""}`}>
      {expanded ? (
        <div className="raffle-panel">
          <button className="close-btn" onClick={() => setExpanded(false)}>×</button>
          <h3>🎟️ Raffle Tickets</h3>
          {tickets !== null ? <p>You have {tickets} tickets.</p> : <p>Loading...</p>}
          <button
            className="raffle-join-btn"
            style={{ backgroundColor: "var(--primary-color)" }}
            onClick={joinRaffle}
          >
            Join the Raffle
          </button>
          <button
            className="payment-btn"
            style={{ backgroundColor: "var(--accent-color)" }}
            onClick={proceedToPayment}
          >
            Proceed to Payment
          </button>
          {error && <p className="error-msg">{error}</p>}
          {message && <p className="message-msg">{message}</p>}
        </div>
      ) : (
        <button className="raffle-icon" onClick={() => setExpanded(true)}>🎟️</button>
      )}
    </div>
  );
}
