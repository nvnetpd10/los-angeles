import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { imageUtil } from '../imageUtil';
import RaffleWidget from '../rafflewidget';

const mockStories = [
  {
    id: 1,
    title: "The Forgotten Jazz Club",
    snippet: "Hidden beneath Sunset Blvd lies a jazz club that once echoed with the sound of legends.",
    imageUrl: imageUtil.two ,
  },
  {
    id: 2,
    title: "Graffiti Alley in Echo Park",
    snippet: "Every wall tells a story—of rebellion, dreams, and silent protests.",
    imageUrl:  imageUtil.one ,
  },
  {
    id: 3,
    title: "Whispers of the Old Theatre",
    snippet: "Shuttered for decades, the Orpheum Theatre holds memories of golden screens and velvet curtains.",
    imageUrl: imageUtil.three ,
  },
  {
    id: 4,
    title: "Mystery of the LA Tunnels",
    snippet: "Beneath the city's bright lights lies a hidden maze of prohibition-era tunnels.",
    imageUrl: imageUtil.four ,
  },
  {
    id: 5,
    title: "The Street Poet of Venice",
    snippet: "A man with a typewriter and a dream leaves pieces of poetry on park benches.",
    imageUrl: imageUtil.five ,
  },
  {
    id: 6,
    title: "Echoes in the Canyons",
    snippet: "Locals swear the hills carry whispers of stories left untold by hikers and wanderers.",
    imageUrl: imageUtil.six ,
  },
];

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // simulate fetch delay
      setTimeout(() => {
        setStories(mockStories);
      }, 1000);
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <>
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h3" fontFamily="Playfair Display" gutterBottom>
        City Stories
      </Typography>

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          Unable to load stories.
        </Alert>
      )}

      {!stories.length && !error ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {stories.map((story) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={story.id}
              onClick={() => navigate(`/stories/${story.id}`)}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                '&:hover .readMore': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={story.imageUrl}
                  alt={story.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontFamily="Playfair Display"
                    gutterBottom
                  >
                    {story.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily="Lora"
                    color="text.secondary"
                  >
                    {story.snippet}
                  </Typography>
                </CardContent>

                <Box
                  className="readMore"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: '#E91E63',
                    color: '#fff',
                    textAlign: 'center',
                    py: 1,
                    fontFamily: 'Lora',
                    fontSize: 14,
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Read More
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    <RaffleWidget/>
    </>
  );

};

export default Stories;
