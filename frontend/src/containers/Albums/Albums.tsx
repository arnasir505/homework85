import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Album } from '../../types';
import axiosApi from '../../axiosApi';
import { apiUrl } from '../../constants';
import { Box, CircularProgress, Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

const Albums: React.FC = () => {
  const location = useLocation();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<Album[]>(`/albums${location.search}`);
      setAlbums(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void fetchAlbums();
  }, []);

  let content = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} />
    </Box>
  );

  if (albums.length > 0 && !loading) {
    content = (
      <Grid container>
        {albums.map((album) => (
          <Link
            to={`/tracks?albums=${album._id}`}
            style={{ textDecoration: 'none' }}
          >
            <Card
              sx={{
                my: 1,
                display: 'flex',
                minWidth: '350px',
                marginRight: '20px',
              }}
            >
              {album.image ? (
                <CardMedia
                  component={'img'}
                  image={apiUrl + '/' + album.image}
                  alt='img'
                  sx={{ width: 120 }}
                />
              ) : null}
              <CardContent>
                <Typography variant='h6'>{album.title}</Typography>
                <Typography variant='body1'>{album.year}</Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Grid>
    );
  } else if (albums.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No albums yet.
      </Typography>
    );
  }
  return <Container sx={{ py: 5 }}>{content}</Container>;
}

export default Albums