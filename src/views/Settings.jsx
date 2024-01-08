import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/client';
import AppContext from '../context/AppContext';
import Avatar from '../components/Avatar';
import { Button, Grid, TextField } from '@mui/material';

export default function Settings() {
  const { session } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setfirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name, avatar_url`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setfirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    setLoading(true);
    const { user } = session;
    event.preventDefault();
    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={updateProfile}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem' }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={7} sm={5} md={3} lg={2} style={{ marginBottom: '1rem' }}>
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(event, url) => {
              updateProfile(event, url);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} style={{ marginBottom: '1rem' }}>
              <TextField
                id="first_name"
                label="First Name"
                variant="outlined"
                value={first_name || ''}
                onChange={(e) => setfirstName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ marginBottom: '1rem' }}>
              <TextField
                id="last_name"
                label="Last Name"
                variant="outlined"
                value={last_name || ''}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '1rem' }}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={session.user.email}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '1rem' }}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                required
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem' }}
        disabled={loading}
      >
        {loading ? 'Loading ...' : 'Update'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginTop: '0.5rem' }}
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </Button>
    </form>
  );
}
