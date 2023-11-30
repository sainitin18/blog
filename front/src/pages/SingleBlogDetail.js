import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import "../styles/SingleBlogDetail.css"

function SingleBlogDetail() {
    const location = useLocation();
    const { title, description, image } = location.state;

    return (
        <div className='container'>
            <div className='image'>
                <img className='image' src={image} alt={title} />
            </div>
            <div className='matter' >
                <Typography variant="h4">Title:{title}</Typography>
                <Typography variant="body1">Description:{description}</Typography>
            </div>
        </div>
    );
}

export default SingleBlogDetail;
