import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists } from '../../store/artists/artistsSlice';
import { fetchArtistsAdmin } from '../../store/artists/artistsThunks';
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
import { selectAlbums } from '../../store/albums/albumsSlice';
import { fetchAlbumsAdmin } from '../../store/albums/albumsThunks';
import { selectTracks } from '../../store/tracks/tracksSlice';
import { fetchTracksAdmin } from '../../store/tracks/tracksThunks';

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const tracks = useAppSelector(selectTracks);
  const disabledBtn = useAppSelector(selectAdminPageDisabledBtn);

  const fetchAllEntities = async () => {
    await dispatch(fetchArtistsAdmin());
    await dispatch(fetchAlbumsAdmin());
    await dispatch(fetchTracksAdmin());
  };

  const onTogglePublish = async (route: string, id: string) => {
    await dispatch(togglePublish({ route: route, id: id }));
    void fetchAllEntities();
  };

  const onDelete = async (route: string, id: string) => {
    await dispatch(deleteEntity({ route: route, id: id }));
    void fetchAllEntities();
  };

  useEffect(() => {
    void fetchAllEntities();
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
              flexWrap: 'wrap',
              px: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='body1'>{artist.name}</Typography>
              <Typography variant='body2' color='lightgray'>
                {artist.isPublished ? '✔️' : '⛔️'}
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
      <Typography variant='h5' sx={{ mt: 3 }}>
        All albums
      </Typography>
      {albums.map((album) => (
        <Card sx={{ display: 'flex', mt: 1 }} key={album._id}>
          <CardMedia
            component={'img'}
            image={album.image ? apiUrl + '/' + album.image : personPlaceholder}
            alt='img'
            sx={{ width: 64, height: 64 }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: '1',
              flexWrap: 'wrap',
              px: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='body1'>{album.title}</Typography>
              <Typography variant='body2' color='lightgray'>
                {album.isPublished ? '✔️' : '⛔️'}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Button
                variant='outlined'
                color='primary'
                size='small'
                sx={{ mr: 2 }}
                onClick={() => onTogglePublish('albums', album._id)}
                disabled={album._id === disabledBtn}
              >
                {album.isPublished ? 'Unpublish' : 'Publish'}
              </Button>
              <Button
                variant='outlined'
                color='error'
                size='small'
                onClick={() => onDelete('albums', album._id)}
                disabled={album._id === disabledBtn}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Card>
      ))}
      <Typography variant='h5' sx={{ mt: 3 }}>
        All tracks
      </Typography>
      {tracks.map((track) => (
        <Card sx={{ mt: 1 }} key={track._id}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 1,
              px: 2,
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
                gap: 1,
              }}
            >
              <Typography variant='body1'>{track.title}</Typography>
              <Typography variant='body1' sx={{ color: '#bcbcbc' }}>
                {track.duration}
              </Typography>
              <Typography variant='body2' color='lightgray'>
                {track.isPublished ? '✔️' : '⛔️'}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Button
                variant='outlined'
                color='primary'
                size='small'
                sx={{ mr: 2 }}
                onClick={() => onTogglePublish('tracks', track._id)}
                disabled={track._id === disabledBtn}
              >
                {track.isPublished ? 'Unpublish' : 'Publish'}
              </Button>
              <Button
                variant='outlined'
                color='error'
                size='small'
                onClick={() => onDelete('tracks', track._id)}
                disabled={track._id === disabledBtn}
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
