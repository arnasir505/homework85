import React, { useState } from 'react';
import { User } from '../../types';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLogoutLoading } from '../../store/users/usersSlice';
import { logout } from '../../store/users/usersThunk';
import { Button, CircularProgress, Menu, MenuItem } from '@mui/material';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAncorEl] = useState<HTMLElement | null>(null);
  const loading = useAppSelector(selectLogoutLoading);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAncorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAncorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <>
      <Button color='inherit' onClick={handleClick}>
        Hello {user.username}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <Link
          to='/track-history'
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <MenuItem>Track History</MenuItem>
        </Link>
        <Link
          to='/artists/new'
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <MenuItem>Add Artist</MenuItem>
        </Link>
        <Link
          to='/albums/new'
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <MenuItem>Add Album</MenuItem>
        </Link>
        <Link
          to='/tracks/new'
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <MenuItem>Add Track</MenuItem>
        </Link>
        {user.role === 'admin' && (
          <Link
            to='/admin'
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <MenuItem>Admin</MenuItem>
          </Link>
        )}
        <MenuItem onClick={handleLogout}>
          {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
