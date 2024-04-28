import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  styled,
  Grid,
} from '@mui/material';

const LogoLink = styled(NavLink)({
  color: '#64ffda',
  textDecoration: 'none',
});

const Appbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                <LogoLink to='/'>Spotify</LogoLink>
              </Typography>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Appbar;
