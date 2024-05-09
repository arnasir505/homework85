import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import FileInput from '../../components/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  clearForm,
  clearImage,
  selectNewArtist,
  selectNewArtistAddError,
  selectNewArtistAddLoading,
  selectNewArtistImageFilename,
  updateFilename,
  updateImage,
  updateInformation,
  updateName,
} from '../../store/newArtist/newArtistSlice';
import { addNewArtist } from '../../store/newArtist/newArtistThunks';

const NewArtist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newArtist = useAppSelector(selectNewArtist);
  const loading = useAppSelector(selectNewArtistAddLoading);
  const error = useAppSelector(selectNewArtistAddError);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      const blobImageUrl = window.URL.createObjectURL(files[0]);
      dispatch(updateImage(blobImageUrl));
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addNewArtist()).unwrap();
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

  return (
    <Container sx={{ py: 3 }} maxWidth='md'>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Add artist
      </Typography>
      <Box component='form' onSubmit={onFormSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              type='text'
              name='name'
              label='Name'
              value={newArtist.name}
              onChange={(e) => dispatch(updateName(e.target.value))}
              error={Boolean(getFieldError('name'))}
              helperText={getFieldError('name')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              type='text'
              name='information'
              label='Information'
              rows={5}
              value={newArtist.information}
              onChange={(e) => dispatch(updateInformation(e.target.value))}
              error={Boolean(getFieldError('information'))}
              helperText={getFieldError('information')}
            />
          </Grid>
          <Grid item xs={12}>
            <FileInput
              onChange={fileInputChangeHandler}
              name='image'
              label='Image'
              selectFilename={selectNewArtistImageFilename}
              selectError={selectNewArtistAddError}
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

export default NewArtist;
