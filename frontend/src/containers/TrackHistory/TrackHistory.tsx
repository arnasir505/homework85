import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import {
  selectTrackHistory,
  selectTrackHistoryLoading,
} from '../../store/trackHistory/trackHistorySlice';
import { fetchTrackHistory } from '../../store/trackHistory/trackHistoryThunks';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

const TrackHistory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tracks = useAppSelector(selectTrackHistory);
  const loading = useAppSelector(selectTrackHistoryLoading);

  const getTrackHistory = async () => {
    if (user) {
      await dispatch(fetchTrackHistory());
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    void getTrackHistory();
  }, []);

  let content = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} />
    </Box>
  );

  if (tracks.length > 0 && !loading) {
    content = (
      <>
        {tracks.map((track) => (
          <Card sx={{ my: 2 }} key={track._id}>
            <CardContent>
              <Typography variant='body1' color='gray'>
                {track.artist.name}
              </Typography>
              <Typography variant='h6'>{track.track.title}</Typography>
              <Typography variant='body1' color='gray'>
                {dayjs(track.datetime).format('DD.MM.YYYY HH:mm')}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  } else if (tracks.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No tracks yet.
      </Typography>
    );
  }
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant='h4'>Track History:</Typography>
      {content}
    </Container>
  );
};

export default TrackHistory;
