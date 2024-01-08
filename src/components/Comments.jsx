import { useEffect, useState } from 'react';
import supabase from '../supabase/client';
import formatMessageDate from '../utils/formatMessageDate';
import { Box, Container, Paper, Typography } from '@mui/material';

function Comments({ game }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile: profiles(username)')
        .eq('game_id', game.id);
      if (error) {
        alert(error.message);
      } else {
        setComments(data);
      }
    };
    getComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fixed>
    <Paper sx={{ p: 2, mt: 2, height: '500px', overflowY: 'auto' }}>
      <Typography variant="h6" component="div" mb={2}>
        Reviews
      </Typography>
      <Box>
        {comments &&
          comments.map((comment) => (
            <Container key={comment.id} sx={{ mb: 2 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  {comment.comment_title}
                </Typography>
                <Typography variant="body1" mb={1}>
                  {comment.comment_content}
                </Typography>
                <div>
                  <Typography variant="body2" color="textSecondary">
                    Published by: {comment.profile.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatMessageDate(comment.created_at)}
                  </Typography>
                </div>
              </Paper>
            </Container>
          ))}
      </Box>
    </Paper>
  </Container>
  );
}

export default Comments;