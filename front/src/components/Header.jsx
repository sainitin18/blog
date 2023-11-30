import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Header.css';
import toast from 'react-hot-toast';

function Header() {

    let isLogin = useSelector(state => state.isLogin)
    isLogin = isLogin || localStorage.getItem('usersId');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userId = useSelector(state => state.userId);
    console.log(userId);

    //state
    const [value, setValue] = useState(0);
    const [menu, setMenu] = useState(false);

    //logout
    async function handleLogout() {
        try {
            dispatch(authActions.logout());
            toast.success('Logged out successfully');
            navigate("/login");
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function toggleMenu() {
        setMenu(!menu);
    }
    return (
        <div>
            <AppBar position='sticky' sx={{ backgroundColor: "	#4caf50" }}>
                <Toolbar >
                    <Box>
                        <Typography variant='h4' fontFamily={'cursive'} className={`title ${menu ? 'show-on-menu' : 'show-title'}`}>
                            BlogBloom
                        </Typography>
                    </Box>

                    {isLogin && menu && (
                        <Box display={"flex"} flex='1' justifyContent='center'>
                            <Tabs textColor="inherit" value={value} onChange={handleChange}>
                                <Tab label="Blogs" component={Link} to="/blogs" />
                                <Tab label="My blogs" component={Link} to="/my-blogs" />
                                <Tab label="Create blog" component={Link} to="/create-blog" />
                                <Tab label="Profile" component={Link} to="/profile" />
                            </Tabs>
                        </Box>)}

                    <Box display={"flex"} margin='0 0 0 auto'>
                        {!isLogin &&
                            (<>
                                <Button sx={{ margin: 1, color: 'white' }} component={Link} to="/login">LOGIN</Button>
                                <Button sx={{ margin: 1, color: 'white' }} component={Link} to="/register">REGISTER</Button>
                            </>)}
                        {isLogin && (
                            <>
                                <IconButton color="inherit" onClick={toggleMenu} sx={{ marginRight: 2 }}>
                                    <ReorderIcon />
                                </IconButton>
                                <Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }} component={Link} to="/login" >LOGOUT</Button>
                                <Button sx={{ margin: 1, color: 'white' }} component={Link} to="/export-to-excel" >Export</Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header


