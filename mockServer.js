import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import Stripe from 'stripe';


const app = express();
const PORT = 4000;

// Initialize Stripe with your test secret key
const stripe = import.meta.env.VITE_STRIPE_PUBLIC_KEY // <-- Replace this with your actual test key

// Middleware
app.use(cors());
app.use(express.json());

// In-memory mock ticket data
let userTickets = {
  '123': 2, // userId: 123 starts with 2 tickets
};

// Root route
app.get('/', (req, res) => {
  res.send('Mock API Server is running');
});

// GET /api/raffle-status?userId=123
app.get('/api/raffle-status', async (req, res) => {
  const userId = req.query.userId;
  await new Promise((r) => setTimeout(r, 500));
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  const tickets = userTickets[userId] || 0;
  return res.json({ tickets });
});

// POST /api/raffle-entry
app.post('/api/raffle-entry', async (req, res) => {
  const { userId } = req.body;
  await new Promise((r) => setTimeout(r, 500));
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  const current = userTickets[userId] || 0;
  const newCount = current + 1;
  userTickets[userId] = newCount;

  return res.json({ success: true, tickets: newCount });
});

// ✅ Stripe: Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, currency, userId } = req.body;

  if (!amount || !currency || !userId) {
    return res.status(400).json({ error: 'Missing amount, currency, or userId' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          product_data: { name: 'Raffle Ticket' },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `http://localhost:5173/?payment=success&userId=${userId}`,
      cancel_url: `http://localhost:5173/?payment=fail&userId=${userId}`,
      metadata: { userId },
    });

    return res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error.message);
    return res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

// ✅ Simulate Stripe webhook
app.post('/api/stripe-webhook', (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  const current = userTickets[userId] || 0;
  const newCount = current + 1;
  userTickets[userId] = newCount;

  return res.json({ success: true, tickets: newCount });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎟️ Mock Raffle Server running at http://localhost:${PORT}`);
});
