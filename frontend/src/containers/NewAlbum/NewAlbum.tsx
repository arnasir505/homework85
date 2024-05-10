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
import React, { useEffect } from 'react';
import FileInput from '../../components/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  clearForm,
  clearImage,
  selectNewAlbum,
  selectNewAlbumAddError,
  selectNewAlbumAddLoading,
  selectNewAlbumImageFilename,
  updateArtist,
  updateFilename,
  updateImage,
  updateTitle,
  updateYear,
} from '../../store/newAlbum/newAlbumSlice';
import { addNewAlbum } from '../../store/newAlbum/newAlbumThunks';
import { selectArtists } from '../../store/artists/artistsSlice';
import { fetchArtists } from '../../store/artists/artistsThunks';

const NewAlbum: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newAlbum = useAppSelector(selectNewAlbum);
  const loading = useAppSelector(selectNewAlbumAddLoading);
  const error = useAppSelector(selectNewAlbumAddError);
  const artists = useAppSelector(selectArtists);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      const blobImageUrl = window.URL.createObjectURL(files[0]);
      dispatch(updateImage(blobImageUrl));
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addNewAlbum()).unwrap();
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

  useEffect(() => {
    void getArtists();
  }, []);

  return (
    <Container sx={{ py: 3 }} maxWidth='md'>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Add album
      </Typography>
      <Box component='form' onSubmit={onFormSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              type='text'
              name='title'
              label='Title'
              value={newAlbum.title}
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
                required
                autoWidth
                name='artist'
                value={newAlbum.artist}
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
            <TextField
              required
              type='number'
              name='year'
              label='Year'
              value={newAlbum.year}
              onChange={(e) => dispatch(updateYear(e.target.value))}
              error={Boolean(getFieldError('year'))}
              helperText={getFieldError('year')}
            />
          </Grid>
          <Grid item xs={12}>
            <FileInput
              onChange={fileInputChangeHandler}
              name='image'
              label='Image'
              selectFilename={selectNewAlbumImageFilename}
              selectError={selectNewAlbumAddError}
              updateFilename={updateFilename}
              clearImage={clearImage}
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

export default NewAlbum;
