import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../../types';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAncorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAncorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAncorEl(null);
  }

  return (
    <>
      <Button color='inherit' onClick={handleClick}>
        Hello {user.username}!
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem>Profile Item</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
