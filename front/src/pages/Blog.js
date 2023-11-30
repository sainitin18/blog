import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard.jsx';
import '../styles/BlogGrid.css';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    //get blogs
    async function getAllBlogs() {
        try {
            const { data } = await axios.get('/api/v1/blog/all-blogs')
            if (data?.success) {
                setBlogs(data?.blogs);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllBlogs();
    }, [])
    return (
        <div className="blog-grid">
            {blogs && blogs.map((blog, index) => {
                return <BlogCard
                    key={index}
                    id={blog._id}
                    isUser={localStorage.getItem("usersId") === blog.user._id}
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

export default Blog;