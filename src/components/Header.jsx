import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <AppBar position="sticky" elevation={2} sx={{ backgroundColor: "white", color: "#424242" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "#E91E63", fontWeight: "bold" }}
        >
          LosAngelesLore
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{ color: pathname === "/" ? "#E91E63" : "#424242" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/stories"
            sx={{ color: pathname === "/stories" ? "#E91E63" : "#424242" }}
          >
            Stories
          </Button>
          <Button
            component={Link}
            to="/submit"
            sx={{ color: pathname === "/submit" ? "#E91E63" : "#424242" }}
          >
            Submit
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
