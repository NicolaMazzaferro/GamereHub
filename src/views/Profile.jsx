/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import AppContext from "../context/AppContext";
import getProfileImg from "../utils/getProfileImg";
import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import supabase from "../supabase/client";
import formatMessageDate from "../utils/formatMessageDate";

export default function Profile() {
  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile: profiles(username)')
        .eq('profile_id', session.user.id);
      if (error) {
        alert(error.message);
      } else {
        setComments(data);
      }
    };
    getComments();
  }, [session.user.id]);

  useEffect(() => {
    const getFav = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('profile_id', session.user.id);
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        setFavorites(data);
      }
    };
    getFav();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Avatar
            sx={{ width: 200, height: 200, mx: 'auto' }}
            alt="User Avatar"
            src={profile && getProfileImg(profile.avatar_url)}
          />
          <Box mt={2}>
            <Typography variant="h5" component="h1">
              Welcome {profile && (profile.username || session.user.user_metadata.full_name)}
            </Typography>
            {profile && profile.first_name && profile.last_name && (
              <Box mt={2}>
                <Typography variant="body1" component="label">
                  Nome:
                </Typography>
                <Typography variant="body1" component="p">
                  {profile.first_name} {profile.last_name}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
      <Paper
        sx={{
          height: '300px',
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Your Reviews
        </Typography>
        <Divider sx={{ my: 2 }} />
        {comments.length >= 1 ? (
          comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 2 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" color="textPrimary" p={2}>
                  {comment.game_name}
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2" color="textPrimary" p={2}>
                    {comment.comment_content}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" textAlign={'end'}>
                    {formatMessageDate(comment.created_at)}
                  </Typography>
                </Paper>
              </Paper>
            </Box>
          ))
        ) : (
          <>
          <Box sx={{ mb: 2 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="p" color="textPrimary" p={2}>
                You haven't written any reviews yet.
                </Typography>
              </Paper>
            </Box>
          </>
        )}
      </Paper>
    </Grid>

      <Grid item xs={12} md={12}>
      <Paper
            sx={{
            height: '300px',
            overflowY: 'auto',
            p: 2,
            }}
        >
          <Typography variant="h6" component="h2">
          Your Favorites
          </Typography>
          <Divider sx={{ my: 2 }} />
          {favorites.length >= 1 ? (
            favorites.map((favorite) => (
              <Box key={favorite.id} sx={{ mb: 2 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" color="textPrimary" p={2}>
                    {favorite.game_name}
                  </Typography>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body2" color="textPrimary" p={2}>
                      {favorite.favorite_content}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" textAlign={'end'}>
                      {formatMessageDate(favorite.created_at)}
                    </Typography>
                  </Paper>
                </Paper>
              </Box>
            ))
          ) : (
            <Box sx={{ mb: 2 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="p" color="textPrimary" p={2}>
                  You haven't added any games yet
                </Typography>
              </Paper>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
