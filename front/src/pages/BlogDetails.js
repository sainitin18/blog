import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, InputLabel, } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function BlogDetails() {
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const id = useParams().id;

    const [inputs, setInputs] = useState({});

    const getBlogDetails = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/one-blog/${id}`)
            if (data?.success) {
                setBlog(data?.blog);
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBlogDetails();
    }, [id])
    console.log(blog);

    function handleChange(event) {
        const { name, value } = event.target;
        setInputs((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success("Blog Updated");
                navigate('/my-blogs');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box width={"50%"} border={3} borderRadius={10} padding={3} margin="auto" boxShadow={"10px 10px 20px #ccc"} display="flex" flexDirection={"column"} marginTop="30px">
                    <Typography variant="h4" textAlign={"center"} fontWeight="bold" padding={3} color="gray">
                        Edit A Blog
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "14px", fontWeight: "bold" }}>
                        Title
                    </InputLabel>
                    <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined" required
                    />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "14px", fontWeight: "bold" }}>
                        Description
                    </InputLabel>

                    <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined" fullWidth multilin rows={5} maxRows={10} />

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "14px", fontWeight: "bold" }} >
                        Image URL
                    </InputLabel>
                    <TextField name="image" value={inputs.image} onChange={handleChange} margin="normal" variant="outlined" required />
                    <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                        SUBMIT
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default BlogDetails