import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';
import { apiUrl } from '../../constants';
import {
  Box,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Breadcrumbs,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import albumPlaceholder from '../../assets/images/album-placeholder.png';

const Albums: React.FC = () => {
  const location = useLocation();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState('');

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<Album[]>(`/albums${location.search}`);
      setAlbums(response.data);
      setArtist(response.data[0].artist.name);
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
      <>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize='small' />}
          sx={{ mb: 1 }}
        >
          <Typography variant='h6'>{artist}</Typography>
        </Breadcrumbs>
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid item xs={12} sm={6} md={4}>
              <Link
                to={`/tracks?album=${album._id}`}
                style={{ textDecoration: 'none' }}
                key={album._id}
              >
                <Card sx={{ display: 'flex' }}>
                    <CardMedia
                      component={'img'}
                      image={album.image ? (apiUrl + '/' + album.image) : albumPlaceholder}
                      alt='img'
                      sx={{ width: 120 }}
                    />
                  <CardContent>
                    <Typography variant='h6'>{album.title}</Typography>
                    <Typography variant='body1' sx={{ color: '#bcbcbc' }}>
                      {album.year}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </>
    );
  } else if (albums.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No albums yet.
      </Typography>
    );
  }
  return <Container sx={{ py: 5 }}>{content}</Container>;
};

export default Albums;
