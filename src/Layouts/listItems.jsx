import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { NavLink } from 'react-router-dom';


export const MainListItems = () => {
  return (
    <React.Fragment>
      <ListItemButton component={NavLink} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/genres">
        <ListItemIcon>
          <SmartToyIcon />
        </ListItemIcon>
        <ListItemText primary="Genres" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/platforms">
        <ListItemIcon>
          <SportsEsportsIcon />
        </ListItemIcon>
        <ListItemText primary="Platforms" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/stores">
        <ListItemIcon>
          <LocalMallIcon />
        </ListItemIcon>
        <ListItemText primary="Stores" />
      </ListItemButton>
    </React.Fragment>
  );
};