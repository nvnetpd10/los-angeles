import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", color: "#424242", px: 4, py: 6 }}>
      <Grid container spacing={4}>
        {/* About */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>About LosAngelesLore</Typography>
          <Typography variant="body2">
            Discover hidden stories, vibrant art, and voices from Los Angeles streets.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Quick Links</Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="/" underline="hover" sx={{ color: "#424242", "&:hover": { color: "#E91E63" } }}>Home</Link>
            <Link href="/stories" underline="hover" sx={{ color: "#424242", "&:hover": { color: "#E91E63" } }}>Stories</Link>
            <Link href="/submit" underline="hover" sx={{ color: "#424242", "&:hover": { color: "#E91E63" } }}>Submit</Link>
            <Link href="/contact" underline="hover" sx={{ color: "#424242", "&:hover": { color: "#E91E63" } }}>Contact</Link>
          </Box>
        </Grid>

        {/* Resources */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Resources</Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="/faq" underline="hover" sx={{ color: "#424242", "&:hover": { color: "#E91E63" } }}>FAQ</Link>
            <Link href="/privacy" underline="hover" sx={{ color: "#424242", "&:hover": { color: "#E91E63" } }}>Privacy</Link>
            <Link href="/terms" underline="hover" sx={{ color: "#424242", "&:hover": { color: "#E91E63" } }}>Terms</Link>
          </Box>
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Newsletter Signup</Typography>
          <TextField
            size="small"
            type="email"
            placeholder="Your email"
            fullWidth
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#E91E63", color: "white", ":hover": { backgroundColor: "#d81b60" } }}
          >
            Subscribe
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
