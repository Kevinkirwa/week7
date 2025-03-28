import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(post._id);
        if (onDelete) {
          onDelete(post._id);
        }
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          By {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" paragraph>
          {post.content.substring(0, 150)}...
        </Typography>
        <Box sx={{ mt: 2 }}>
          {post.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={RouterLink}
          to={`/posts/${post._id}`}
        >
          Read More
        </Button>
        {user && (user.id === post.author._id || user.role === 'admin') && (
          <>
            <Button
              size="small"
              component={RouterLink}
              to={`/edit-post/${post._id}`}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default PostCard; 