import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import { addTrackToHistory } from '../../store/trackHistory/trackHistoryThunks';
import {
  selectTracks,
  selectTracksAlbumAndArtistName,
  selectTracksLoading,
} from '../../store/tracks/tracksSlice';
import { fetchTracks } from '../../store/tracks/tracksThunks';
import { PlayArrow } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Breadcrumbs,
  Button,
} from '@mui/material';

const Tracks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tracks = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksLoading);
  const album = useAppSelector(selectTracksAlbumAndArtistName);
  const [disabledBtn, setDisabledBtn] = useState('');

  const getTracks = async () => {
    try {
      if (user) {
        await dispatch(fetchTracks());
      } else {
        navigate('/login');
      }
    } catch (error) {
      throw error
    }
  };

  useEffect(() => {
    void getTracks();
  }, []);

  const onPlayClick = async (trackId: string) => {
    setDisabledBtn(trackId);
    await dispatch(addTrackToHistory(trackId));
    setDisabledBtn('');
  };

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
          <Typography variant='h6'>{album?.artist.name}</Typography>
          <Typography variant='h6'>{album?.title}</Typography>
        </Breadcrumbs>
        <Grid container spacing={2}>
          {tracks.map((track) => (
            <Grid item xs={12} sm={6} md={4} key={track._id}>
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}
                >
                  <Box>
                    <Typography variant='h6'>
                      {track.position}. {track.title}
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#bcbcbc' }}>
                      {track.duration}
                    </Typography>
                  </Box>
                  {user && (
                    <Button
                      variant='outlined'
                      endIcon={<PlayArrow />}
                      size='small'
                      onClick={() => onPlayClick(track._id)}
                      disabled={track._id === disabledBtn}
                    >
                      Play
                    </Button>
                  )}
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
