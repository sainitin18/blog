import React, { useState } from 'react'
import { Box, Typography, TextField, Button, InputLabel, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function CreateBlog() {
    const id = localStorage.getItem('usersId');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: '',
    })

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
            const { data } = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success("Blog is created");
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
                        Create A Blog
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "14px", fontWeight: "bold" }}>
                        Title
                    </InputLabel>
                    <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined" required
                    />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "14px", fontWeight: "bold" }}>
                        Description
                    </InputLabel>
                    <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined" fullWidth multiline rows={5} maxRows={10}
                    />

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

export default CreateBlog