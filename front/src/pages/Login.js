import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import WC from "../images/wc1.png"
import '../styles/Login.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //state
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    //handleChange for a particular input
    function handleChange(event) {
        const { name, value } = event.target
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/login', { email: inputs.email, password: inputs.password });
            if (data.success) {
                localStorage.setItem('usersId', data?.user._id);
                dispatch(authActions.login());
                toast.success('User Logged in  Successfully');
                navigate('/blogs');
            }
        } catch (error) {
            console.log(error);
            toast.error('Incorrect username or password');
        }
    }
    const imageStyle = {
        backgroundImage: `url(${WC})`,
    };
    return (
        <div className='login-container'>
            <div className='login-image' style={imageStyle}></div>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <Box
                        maxWidth={450}
                        display="flex"
                        flexDirection={"column"}
                        alignItems="center"
                        justifyContent={"center"}
                        margin="auto"
                        marginTop={5}
                        boxShadow="10px 10px 20px #ccc"
                        padding={3}
                        borderRadius={5}
                    >
                        <Typography
                            variant="h4"
                            sx={{ textTransform: "uppercase" }}
                            padding={3}
                            textAlign="center"
                        >
                            Login
                        </Typography>

                        <TextField
                            placeholder="email"
                            value={inputs.email}
                            name="email"
                            margin="normal"
                            type={"email"}
                            required
                            onChange={handleChange}
                        />
                        <TextField
                            placeholder="password"
                            value={inputs.password}
                            name="password"
                            margin="normal"
                            type={"password"}
                            required
                            onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            sx={{ borderRadius: 3, marginTop: 3 }}
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => navigate("/register")}
                            sx={{ borderRadius: 3, marginTop: 3 }}
                        >
                            Not an user ? Please Register
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    )
}

export default Login