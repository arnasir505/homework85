import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import Artists from './containers/Artists/Artists';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import TrackHistory from './containers/TrackHistory/TrackHistory';
import NewArtist from './containers/NewArtist/NewArtist';
import NewAlbum from './containers/NewAlbum/NewAlbum';
import NewTrack from './containers/NewTrack/NewTrack';
import { Typography } from '@mui/material';
import { useAppSelector } from './app/hooks';
import { selectUser } from './store/users/usersSlice';
import AdminPage from './containers/Admin/AdminPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Artists />} />
          <Route path='/albums' element={<Albums />} />
          <Route path='/tracks' element={<Tracks />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/track-history' element={<TrackHistory />} />
          <Route path='/artists/new' element={<NewArtist />} />
          <Route path='/albums/new' element={<NewAlbum />} />
          <Route path='/tracks/new' element={<NewTrack />} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='*'
            element={
              <Typography variant='h2' style={{ textAlign: 'center' }}>
                Not Found
              </Typography>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
