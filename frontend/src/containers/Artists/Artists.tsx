import React, { useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { Artist } from '../../types';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../constants';
import personPlaceholder from '../../assets/images/person-placeholder.jpg';

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<Artist[]>('/artists');
      setArtists(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void fetchArtists();
  }, []);

  let content = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} />
    </Box>
  );

  if (artists.length > 0 && !loading) {
    content = (
      <Grid container spacing={2}>
        {artists.map((artist) => (
          <Grid item xs={12} sm={6} md={4} key={artist._id}>
            <Link
              to={`/albums?artist=${artist._id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component={'img'}
                  image={
                    artist.image
                      ? apiUrl + '/' + artist.image
                      : personPlaceholder
                  }
                  alt='img'
                  sx={{ width: 120 }}
                />
                <CardContent>
                  <Typography variant='h6'>{artist.name}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  } else if (artists.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No artists yet.
      </Typography>
    );
  }
  return <Container sx={{ py: 10 }}>{content}</Container>;
};

export default Artists;
