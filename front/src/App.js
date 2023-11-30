import './App.css';
import Header from './components/Header.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import MyBlogs from "./pages/MyBlogs.js";
import CreateBlog from "./pages/CreateBlog.js";
import BlogDetails from './pages/BlogDetails.js';
import { Toaster } from 'react-hot-toast';
import Export from './pages/Export';
import SingleBlogDetail from './pages/SingleBlogDetail.js';
import UserProfile from './pages/UserProfile.js';

function App() {
  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<SingleBlogDetail />} />
        <Route path="/export-to-excel" element={<Export />} />
      </Routes>
    </Router>
  );
}

export default App;
