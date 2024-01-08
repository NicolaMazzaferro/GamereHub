import { EditCalendar } from '@mui/icons-material';
import AppContext from '../context/AppContext';
import useProfile from '../hooks/useProfile';
import supabase from '../supabase/client';
import { Avatar, Box, Typography } from '@mui/material';
import { useContext } from 'react';
import getProfileImg from '../utils/getProfileImg';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { NavLink, useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function SecondaryListItems() {
    const { session } = useContext(AppContext);
    const { profile } = useProfile();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          navigate('/settings');
        } catch (error) {
          console.log(error);
        }
      };
  
    return (
      <>
        {!session ? (
          <>
            <ListItemButton component={NavLink} to="/login">
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/register">
              <ListItemIcon>
                <EditCalendar />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton component={NavLink} to="/account" sx={{ padding: 1, margin: 0 }}>
              <Box display="flex" alignItems="center">
                <Avatar alt="User Avatar" src={profile && getProfileImg(profile.avatar_url)} />
                <Typography variant="body1" sx={{ marginLeft: 3 }}>
                {profile && (profile.username || session.user.user_metadata.full_name)}
                </Typography>
              </Box>
            </ListItemButton>
            <ListItemButton onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/settings">
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </>
        )}
      </>
    );
}