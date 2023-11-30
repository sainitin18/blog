import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/BlogGrid.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function BlogCard({ title, description, image, username, time, id, isUser }) {
  const navigate = useNavigate();

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function handleEdit(event) {
    event.stopPropagation();
    return navigate(`/blog-details/${id}`);
  }

  function handleCardClick() {
    return navigate(`/blog/${id}`, {
      state: { title, description, username, image },
    });
  };

  async function handleDelete(event) {
    event.stopPropagation();
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const truncatedDescription = description.length > 50 ? `${description.substring(0, 50)}...` : description;


  return (
    <Card className="blog-card" sx={{ maxWidth: 345 }} onClick={handleCardClick}>
      {isUser && (
        <Box display={'flex'}>
          <IconButton onClick={handleEdit} sx={{ ml: 'auto' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={formatDate(time)}
      />
      <CardMedia
        component="img"
        image={image}
        alt="Paella dish"
        style={{ objectFit: "contain", height: "200px" }}
      />
      <CardContent>
        <Typography variant='h6' color="text.secondary">
          Title:{title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {truncatedDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}