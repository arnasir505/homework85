import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Track } from '../../types';
import axiosApi from '../../axiosApi';
import {
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from '@mui/material';

const Tracks: React.FC = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState('');

  const fetchTracks = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<Track[]>(`/tracks${location.search}`);
      setTracks(response.data);
      // setArtist(response.data[0].artist.name);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void fetchTracks();
  }, []);

  let content = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} />
    </Box>
  );

  if (tracks.length > 0 && !loading) {
    content = (
      <>
        <Typography variant='h5' sx={{ mb: 1 }}>
          {artist}
        </Typography>
        <Grid container>
          {tracks.map((track) => (
              <Card
                sx={{
                  my: 1,
                  display: 'flex',
                  minWidth: '350px',
                  marginRight: '20px',
                }}
                key={track._id}
              >
                <CardContent>
                  <Typography variant='h6'>{track.position}. {track.title}</Typography>
                  <Typography variant='body1' sx={{ color: '#bcbcbc' }}>
                    {track.duration}
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Grid>
      </>
    );
  } else if (tracks.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No tracks yet.
      </Typography>
    );
  }
  return <Container sx={{ py: 5 }}>{content}</Container>;
};

export default Tracks;
