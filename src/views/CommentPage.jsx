import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container, Paper } from '@mui/material';
import supabase from '../supabase/client';

function CommentPage() {
  const game = useLoaderData();
  const [success, setSuccess] = useState(false);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentForm = event.currentTarget;
    const { title, content } = Object.fromEntries(new FormData(commentForm));
    if (
      typeof title === 'string' &&
      typeof content === 'string' &&
      title.trim().length !== 0 &&
      content.trim().length !== 0
    ) {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            game_id: game.id,
            game_name: game.name,
            comment_title: title,
            comment_content: content,
          },
        ])
        .select();
      if (error) {
        alert(error.message);
      } else {
        commentForm.reset();
        setSuccess(true);
      }
    }
  };

  return (
    <Container maxWidth="md" mt={2}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom textAlign={'center'} marginBottom={4}>
          Write a comment about{' '}
          <Typography variant="h6" component="span" color="#0F7A9E">
            {game.name}
          </Typography>
        </Typography>
        <form onSubmit={handleCommentSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="content"
              name="content"
              label="Comment text"
              placeholder="Write a comment"
              variant="outlined"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth >
            {success ? 'Review inviata con successo' : 'Publish'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CommentPage;
