import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists } from '../../store/artists/artistsSlice';
import { fetchArtists } from '../../store/artists/artistsThunks';
import { apiUrl } from '../../constants';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import personPlaceholder from '../../assets/images/person-placeholder.jpg';
import { selectAdminPageDisabledBtn } from '../../store/admin/adminSlice';
import { deleteEntity, togglePublish } from '../../store/admin/adminThunks';

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const disabledBtn = useAppSelector(selectAdminPageDisabledBtn);

  const getArtists = async () => {
    await dispatch(fetchArtists());
  };

  const onTogglePublish = async (route: string, id: string) => {
    await dispatch(togglePublish({ route: route, id: id }));
    await dispatch(fetchArtists());
  };

  const onDelete = async (route: string, id: string) => {
    await dispatch(deleteEntity({ route: route, id: id }));
    await dispatch(fetchArtists());
  };

  useEffect(() => {
    void getArtists();
  }, []);

  return (
    <Container sx={{ py: 5 }} maxWidth='md'>
      <Typography variant='h5'>All artists</Typography>
      {artists.map((artist) => (
        <Card sx={{ display: 'flex', mt: 1 }} key={artist._id}>
          <CardMedia
            component={'img'}
            image={
              artist.image ? apiUrl + '/' + artist.image : personPlaceholder
            }
            alt='img'
            sx={{ width: 64, height: 64 }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: '1',
              px: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='body1'>{artist.name}</Typography>
              <Typography variant='body2' color='lightgray'>
                {artist.isPublished ? '✔️' : '🚫'}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Button
                variant='outlined'
                color='primary'
                size='small'
                sx={{ mr: 2 }}
                onClick={() => onTogglePublish('artists', artist._id)}
                disabled={artist._id === disabledBtn}
              >
                {artist.isPublished ? 'Unpublish' : 'Publish'}
              </Button>
              <Button
                variant='outlined'
                color='error'
                size='small'
                onClick={() => onDelete('artists', artist._id)}
                disabled={artist._id === disabledBtn}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Card>
      ))}
    </Container>
  );
};

export default AdminPage;
