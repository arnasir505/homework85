import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectArtists,
  selectArtistsLoading,
} from '../../store/artists/artistsSlice';
import { fetchArtists } from '../../store/artists/artistsThunks';
import personPlaceholder from '../../assets/images/person-placeholder.jpg';
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
import { selectUser } from '../../store/users/usersSlice';

const Artists: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading);

  const getArtists = async () => {
    await dispatch(fetchArtists());
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    void getArtists();
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
                  sx={{ width: 120, height: 120 }}
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
