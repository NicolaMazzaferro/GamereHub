import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonBase, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabase/client";
import AppContext from "../context/AppContext"
import Messages from "../components/Messages";
import useProfile from '../hooks/useProfile';
import Comments from "../components/Comments";
import ReviewsIcon from '@mui/icons-material/Reviews';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';

// eslint-disable-next-line react-refresh/only-export-components
export async function getSingleGame({ params }) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}games/${params.id}?key=${import.meta.env.VITE_API_KEY}`
  );
  const json = await response.json();
  return json;
}
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function DetailGames() {
  const game = useLoaderData();
  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const [fav, setFav] = useState([]);

  const addToFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .insert([
        {
          game_id: game.id,
          game_name: game.name,
        },
      ])
      .select();
    if (error) {
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  const removeFromFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  const getFavGame = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setFav(() => [...data]);
    }
  };

  useEffect(() => {
    if (session) {
      getFavGame();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputForm = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputForm));
    if (typeof message === 'string' && message.trim().length !== 0) {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            profile_id: session.user.id,
            game_id: game.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        alert(error.message);
      } else {
        inputForm.reset();
      }
    }
  };


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Dettagli Gioco */}
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase>
                  <Img alt="complex" src={game.background_image} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column">
                {profile && (
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs>
                      <Link
                        to={`/game/${game.id}/comment`}
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <Button type="submit" variant="contained" color="primary" mt={2}>
                          Write Reviews
                          <ReviewsIcon sx={{ fontSize: 20, textAlign: 'center', marginLeft: 1 }} />
                        </Button>
                      </Link>
                    </Grid>

                    <Grid item xs>
                      {fav.length !== 0 ? (
                        <IconButton aria-label="remove from favorites" onClick={removeFromFavorites}  >
                          <HeartBrokenIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                      ) : (
                        <IconButton aria-label="add to favorites" onClick={addToFavorites}>
                          <FavoriteIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                )}
                            
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div" marginTop={3}>
                    {game.name}
                  </Typography>
                  {game.genres.map((genre, index) => (
                    <React.Fragment key={genre.id}>
                      <label>{genre.name}</label>
                      {index < game.genres.length - 1 && <span> - </span>}
                  </React.Fragment>
              ))}
                
              <Typography variant="body2" gutterBottom dangerouslySetInnerHTML={{ __html: game.description }} />
              {game.developers.map((developer, index) => (
              <React.Fragment key={developer.id}>
                  <label>{developer.name}</label>
                  {index < game.developers.length - 1 && <span> - </span>}
              </React.Fragment>
                ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                  {game.esrb_rating.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

         {/* Chat */}
         {profile && (
          <Grid item xs={12} md={6}>
            <Typography component="h1" m={2} textAlign={'center'} fontSize={19} style={{ textTransform: 'uppercase' }} >
              Chat with gamers
            </Typography>
            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
              }}
            >
              <Messages game={game} />
              <form onSubmit={handleMessageSubmit} >
                <TextField
                  type="text"
                  name="message"
                  label="Type your message..."
                  variant="outlined"
                  fullWidth
                />
                <Button type="submit" variant="contained" color="primary" fullWidth mt={2}>
                  Send
                </Button>
              </form>
            </Paper>
            <Grid item xs={12} md={12} textAlign={"center"}>
              <Comments game={game} />
            </Grid>
          </Grid>
        )}
      </Grid>
      
    </>
  );
}
