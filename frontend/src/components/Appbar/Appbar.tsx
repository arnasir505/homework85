import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Appbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link to='/' style={{ color: '#64ffda', textDecoration: 'none' }}>
                Spotify
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Appbar;
