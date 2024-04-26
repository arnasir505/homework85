import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Track, TrackByAlbum } from '../../types';
import axiosApi from '../../axiosApi';
import {
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Breadcrumbs,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Tracks: React.FC = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState({
    title: '',
    artist: {
      name: '',
    },
  });

  const fetchTracks = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<TrackByAlbum>(
        `/tracks${location.search}`
      );
      setTracks(response.data.tracks);
      setAlbum(response.data.album);
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
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize='small' />}
          sx={{ mb: 1 }}
        >
          <Typography variant='h6'>{album.artist.name}</Typography>
          <Typography variant='h6'>{album.title}</Typography>
        </Breadcrumbs>
        <Grid container spacing={2}>
          {tracks.map((track) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={track._id}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>
                    {track.position}. {track.title}
                  </Typography>
                  <Typography variant='body1' sx={{ color: '#bcbcbc' }}>
                    {track.duration}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
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
