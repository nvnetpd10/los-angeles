import { Helmet } from 'react-helmet-async';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Los Angeles Lore – Discover the Untold Stories</title>
        <meta name="description" content="Explore tales, photos, and street art capturing the soul of Los Angeles from locals and visitors alike." />
      </Helmet>

      <Box sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Los Angeles Lore is your gateway to the city's untold stories—poems, street art, hidden histories, and more shared by locals and visitors.
        </Typography>
        <Typography variant="body1">
          Dive into a curated collection of cultural insights that bring the vibrant soul of LA to life through visuals and words.
        </Typography>
      </Box>
    </>
  );
}
