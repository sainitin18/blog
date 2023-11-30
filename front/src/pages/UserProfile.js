import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import '../styles/UserProfile.css';
import toast from 'react-hot-toast';

function UserProfile() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserProfile = async () => {
        try {
            const id = localStorage.getItem('usersId');
            const response = await axios.get(`/api/v1/user/profile/${id}`);
            const { username, email } = response.data;
            setFormData({ username, email });
            setLoading(false);
        } catch (error) {
            setError('Error fetching user profile.');
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const id = localStorage.getItem('usersId');
            await axios.put(`/api/v1/user/update-profile/${id}`, formData);
            console.log('Profile updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    function handleClick() {
        toast.success("Blog Updated");
    }

    return (
        <div className='profile-container'>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <Box className='field'>
                    <Typography>
                        <div className='field'>
                            <div>Username:</div>
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                /></div>
                        </div>
                    </Typography>
                </Box>
                <br />
                <Box>
                    <Typography>
                        <div className='field'>
                            <div>Email:</div>
                            <div> <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            /></div>
                        </div>
                    </Typography>
                </Box>
                <br />
                <Button onClick={handleClick} type="submit">Update Profile</Button>
            </form>
        </div>
    );
}

export default UserProfile;
