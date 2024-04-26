import { CircularProgress, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import axiosApi from '../../axiosApi';

const Artists: React.FC = () => {

  const [artists, setArtists] = useState([]);

  const fetchArtists = async () => {
    try {
      const response = await axiosApi.get('/artists');
    } catch (error) {
      
    }
  };

  let content = <CircularProgress />;
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          {content}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Artists;
