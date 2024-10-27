import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/professionallogin');
    };

    // State to manage dropdown visibility
    const [dropdown, setDropdown] = useState({
        projects: false,
        posts: false,
        products: false,
    });

    const toggleDropdown = (section) => {
        setDropdown((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2 className="navbar-brand" onClick={() => navigate('/professionaldashboard')}>BuildFinder</h2>
            </div>
            <div className="navbar-center">
                <div className="navbar-item">
                    <span className="navbar-link" onClick={() => toggleDropdown('projects')}>Projects</span>
                    {dropdown.projects && (
                        <div className="dropdown">
                            <Link to="/postProjects" className="dropdown-link">Add Project</Link>
                            <Link to="/ViewProjectProfessional" className="dropdown-link">View All Projects</Link>
                        </div>
                    )}
                </div>
                <div className="navbar-item">
                    <span className="navbar-link" onClick={() => toggleDropdown('posts')}>Posts</span>
                    {dropdown.posts && (
                        <div className="dropdown">
                            <Link to="/addPost" className="dropdown-link">Add Post</Link>
                            <Link to="/viewAllPosts" className="dropdown-link">View All Posts</Link>
                        </div>
                    )}
                </div>
                <div className="navbar-item">
                    <span className="navbar-link" onClick={() => toggleDropdown('products')}>Products</span>
                    {dropdown.products && (
                        <div className="dropdown">
                            <Link to="/addProducts" className="dropdown-link">Add Product</Link>
                            <Link to="/professionalViewProducts" className="dropdown-link">View All Products</Link>
                        </div>
                    )}
                </div>
                <Link to="/professionalQaA" className="navbar-link">QandA</Link>
            </div>
            <div className="navbar-right">
                
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
