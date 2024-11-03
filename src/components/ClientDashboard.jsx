import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import axios from 'axios';
import './ClientDashboard.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const ClientDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios
      .post(
        'http://localhost:8000/getAllPosts',
        {},
        { headers: { token: sessionStorage.getItem('token') } }
      )
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  const handleSearch = () => {
    const filtered = posts.filter((post) =>
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const postsToDisplay = filteredPosts.length > 0 ? filteredPosts : posts;

  return (
    <div className="dashboard-container">
      <SideBar />

      <div className="content-container">
        <div className="posts-section">
          {postsToDisplay.map((post) => (
            <React.Fragment key={post._id}>
              <div className="post-card">
                <Slider
                  dots={true}
                  infinite={post.postedImages.length > 1}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                >
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

                <div className="post-details">
                  <div className="post-header">
                    <p className="post-professional">By: {post.professionalId.name || 'Unknown'}</p>
                    <p className="post-cost">{post.cost ? `Cost: ${post.cost}` : 'Cost: Not specified'}</p>
                  </div>
                  <p className="post-description">
                    {post.description || 'No description provided.'}
                  </p>

                  
                </div>
              </div>

              <hr className="post-divider" />
            </React.Fragment>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default ClientDashboard;
