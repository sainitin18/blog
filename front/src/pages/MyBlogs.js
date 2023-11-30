import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard.jsx';
import '../styles/BlogGrid.css';

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);

    //get user blogs
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('usersId');
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserBlogs();
    }, []);
    return (
        <div className="blog-grid">
            {blogs && blogs.map((blog, index) => {
                return <BlogCard
                    key={index}
                    id={blog._id}
                    isUser={true}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.username}
                    time={blog.createdAt}
                />
            })}
        </div>
    )
}

export default MyBlogs