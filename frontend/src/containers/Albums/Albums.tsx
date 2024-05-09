import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import albumPlaceholder from '../../assets/images/album-placeholder.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbums } from '../../store/albums/albumsThunks';
import {
  selectAlbums,
  selectAlbumsArtistName,
  selectAlbumsLoading,
} from '../../store/albums/albumsSlice';

const Albums: React.FC = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectAlbumsLoading);
  const artistName = useAppSelector(selectAlbumsArtistName);
  const getAlbums = async () => {
    await dispatch(fetchAlbums());
  };

  useEffect(() => {
    void getAlbums();
  }, []);

  let content = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} />
    </Box>
  );

  if (albums.length > 0 && !loading) {
    content = (
      <>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Typography variant='h6'>{artistName}</Typography>
        </Breadcrumbs>
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid item xs={12} sm={6} md={4} key={album._id}>
              <Link
                to={`/tracks?album=${album._id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    component={'img'}
                    image={
                      album.image
                        ? apiUrl + '/' + album.image
                        : albumPlaceholder
                    }
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
