import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import Artists from './containers/Artists/Artists';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';

const App = () => {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path='/' element={<Artists />} />
        <Route path='/albums' element={<Albums />} />
        <Route path='/tracks' element={<Tracks />} />
        <Route
          path='*'
          element={<h1 style={{ textAlign: 'center' }}>Not Found</h1>}
        />
      </Routes>
    </>
  );
};

export default App;
