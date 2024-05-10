import React, { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  clearForm,
  selectNewTrack,
  selectNewTrackAddError,
  selectNewTrackAddLoading,
  updateTitle,
  updateArtist,
  updateAlbum,
  updateDuration,
} from '../../store/newTrack/newTrackSlice';
import { addNewTrack } from '../../store/newTrack/newTrackThunks';
import { selectArtists } from '../../store/artists/artistsSlice';
import { fetchArtists } from '../../store/artists/artistsThunks';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { selectAlbums } from '../../store/albums/albumsSlice';
import { fetchAlbums } from '../../store/albums/albumsThunks';

const NewTrack: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newTrack = useAppSelector(selectNewTrack);
  const loading = useAppSelector(selectNewTrackAddLoading);
  const error = useAppSelector(selectNewTrackAddError);
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addNewTrack()).unwrap();
    dispatch(clearForm());
    navigate('/');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const getArtists = async () => {
    await dispatch(fetchArtists());
  };

  const getAlbums = async () => {
    await dispatch(fetchAlbums(newTrack.artist));
  };

  useEffect(() => {
    void getArtists();
  }, []);

  useEffect(() => {
    void getAlbums();
  }, [newTrack.artist]);

  return (
    <Container sx={{ py: 3 }} maxWidth='md'>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Add track
      </Typography>
      <Box component='form' onSubmit={onFormSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              type='text'
              name='title'
              label='Title'
              value={newTrack.title}
              onChange={(e) => dispatch(updateTitle(e.target.value))}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{ minWidth: 200 }}
              error={Boolean(getFieldError('artist'))}
            >
              <InputLabel>Select Artist</InputLabel>
              <Select
                defaultValue=''
                autoWidth
                name='artist'
                value={newTrack.artist}
                label='Select Artist'
                onChange={(e) => dispatch(updateArtist(e.target.value))}
              >
                {artists.map((artist) => (
                  <MenuItem value={artist._id} key={artist._id}>
                    {artist.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{getFieldError('artist')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{ minWidth: 200 }}
              error={Boolean(getFieldError('album'))}
            >
              <InputLabel>Select Album</InputLabel>
              <Select
                required
                defaultValue=''
                autoWidth
                name='album'
                value={newTrack.album}
                label='Select Album'
                onChange={(e) => dispatch(updateAlbum(e.target.value))}
              >
                {albums.map((album) => (
                  <MenuItem value={album._id} key={album._id}>
                    {album.title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{getFieldError('album')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type='text'
              name='duration'
              label='Duration'
              inputProps={{
                pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
              }}
              value={newTrack.duration}
              onChange={(e) => dispatch(updateDuration(e.target.value))}
              error={Boolean(getFieldError('duration'))}
              helperText={`${getFieldError('duration') || ''} Format: 3:15 etc.`}
            />
          </Grid>
          <Grid item>
            <LoadingButton type='submit' variant='contained' loading={loading}>
              <span>Save</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NewTrack;
