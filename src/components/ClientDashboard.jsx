import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SideBar from './SideBar'
import axios from 'axios';
import './ClientDashboard.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const ClientDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch all posts when the component mounts
  useEffect(() => {
    axios
      .post(
        'http://localhost:8000/getAllPosts',
        {},
        { headers: { token: sessionStorage.getItem('token') } }
      )
      .then((response) => {
        console.log(response.data); // Check the data structure
        setPosts(response.data); // Set the array of posts directly
      })
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const filtered = posts.filter((post) =>
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // Determine which posts to display (filtered or all)
  const postsToDisplay = filteredPosts.length > 0 ? filteredPosts : posts;

  // Slider settings for the images
  const sliderSettings = {
    dots: true,
    infinite: postsToDisplay.some(post => post.postedImages.length > 1), // Enable infinite scroll only if there is more than 1 image
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="dashboard-container">
      <SideBar /> {/* Sidebar component */}

      <div className="content-container">
        {/* Posts Section */}
        <div className="posts-section">
          {postsToDisplay.map((post) => (
            <React.Fragment key={post._id}>
              <div className="post-card">
                {/* Image Slider */}
                <Slider {...sliderSettings}>
                  {post.postedImages.map((image) => (
                    <div key={image._id} className="slider-image-wrapper">
                      <img
                        src={`http://localhost:8000/uploads/posts/${image.url}`}
                        alt="Post"
                        className="post-image"
                      />
                    </div>
                  ))}
                </Slider>

                {/* Post Details */}
                <div className="post-details">
                  <div className="post-header">
                    <p className="post-professional">By: {post.professionalName || 'Unknown'}</p>
                    <p className="post-cost">{post.cost ? `Cost: ${post.cost}` : 'Cost: Not specified'}</p>
                  </div>
                  <p className="post-description">
                    {post.description || 'No description provided.'}
                  </p>

                  {/* Buttons Section */}
                  <div className="post-buttons">
                    <button className="view-profile-button">
                      <Link to={`/profile/${post.professionalId}`}>View Profile</Link>
                    </button>
                    <button className="save-image-button">Save Image</button>
                  </div>
                </div>
              </div>

              {/* Horizontal line after each post */}
              <hr className="post-divider" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Sticky Search Section */}
      <div className="search-section">
        <label htmlFor="">Search tag</label>
        <input
          type="text"
          placeholder="Search tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    </div>
  );
}

export default ClientDashboard
