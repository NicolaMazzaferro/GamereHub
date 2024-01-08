import { useState, useEffect, useRef, useContext } from 'react';
import supabase from '../supabase/client';
import formatMessageDate from '../utils/formatMessageDate';
import { Typography, Paper, Box, useTheme } from '@mui/material';
import AppContext from '../context/AppContext';

function Messages({ game }) {
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);
  const { session } = useContext(AppContext);

  const theme = useTheme();

  const isLightTheme = theme.palette.mode === 'light';

  const loggedInUserId = session ? session.user.id : null;
  

  const getMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, profile: profiles(username)')
      .eq('game_id', game.id);
    if (error) {
      alert(error.message);
    } else {
      setChat(data);
    }
  };

  useEffect(() => {
    getMessages();
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        () => getMessages()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <Paper
    sx={{
      height: '500px',
      overflowY: 'auto',
      p: 2,
    }}
    ref={chatRef}
  >
 {chat && chat.length > 0 ? (
  chat.map((message) => (
    <article
      key={message.id}
      style={{
        marginBottom: '20px',
        textAlign: loggedInUserId === message.profile_id ? 'right' : 'left',
      }}
    >
      <Box sx={{ mb: 2 }}>
       <Paper sx={{ p: 2 }} >
        <Typography
            variant="subtitle1"
            fontWeight="bold"
            style={{
                textAlign: loggedInUserId === message.profile_id ? 'right' : 'left',
                display: 'block',
                marginLeft: loggedInUserId === message.profile_id ? 'auto' : 'unset',
                marginRight: loggedInUserId === message.profile_id ? 'unset' : 'auto',
                marginBottom: 10
            }}
            >
            {message.profile.username}
            </Typography>
            <div
            style={{
                textAlign: loggedInUserId === message.profile_id ? 'right' : 'left',
            }}
            >
           <Paper 
                sx={{ p: 2 }}
                variant="body1"
                style={{
                padding: '10px',
                borderRadius: '12px',
                backgroundColor: isLightTheme ? '#E0E0E0' : '#202020',
                marginLeft: loggedInUserId === message.profile_id ? 'auto' : 'unset',
                marginRight: loggedInUserId === message.profile_id ? 'unset' : 'auto',
                }}
            >
                {message.content}
            </Paper>
            <Typography variant="caption" color="textSecondary" >
                {formatMessageDate(message.created_at)}
            </Typography>
        </div>
        </Paper>
        </Box>
    </article>
  ))
) : (
  <Typography variant="body1" color="textSecondary">
    No messages yet.
  </Typography>
)}
  </Paper>
  );
}

export default Messages;