import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useEffect, useState } from 'react';
import CustomizedTables from './CustomizedTables';
import { Link } from 'react-router-dom';
import supabase from '../supabase/client';
import AppContext from '../context/AppContext';
import useProfile from '../hooks/useProfile';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function CardMUI({game}) {

  const [expanded, setExpanded] = useState(false);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
    <Link to={`/game/${game.id}`} key={game.id}>
        <CardMedia
          component="img"
          height="194"
          image={ game.background_image }
          alt={ game.slug }
          />

        <Typography variant="h4" p={2}>{game.name}</Typography>
    </Link>

        <CardActions disableSpacing>
        {profile && (
            <>
              {fav.length !== 0 ? (
                <IconButton aria-label="add to favorites" onClick={removeFromFavorites}>
                  <HeartBrokenIcon sx={{ fontSize: 40 }} />
                </IconButton>
                ) : (
                  <IconButton aria-label="add to favorites" onClick={addToFavorites}>
                    <FavoriteIcon sx={{ fontSize: 40 }} />
                  </IconButton>
              )}
            </>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CustomizedTables game={game} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}