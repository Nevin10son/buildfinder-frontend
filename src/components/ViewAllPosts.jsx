import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ViewAllPost.css'

const ViewAllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const sliderSettings = {
        dots: true,
        infinite: false,  // Disable infinite loop to avoid unintended repetition
        speed: 500,
        slidesToShow: 1,  // Only show one image per slide
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,  // Adjust height based on content
      };
      
      useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.post(
              'http://localhost:8000/viewAllPosts',
              { professionalId: sessionStorage.getItem('userId') },
              { headers: { token: sessionStorage.getItem('token') } }
            );
            setPosts(response.data.posts);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
        fetchPosts();
      }, [])

      const openModal = (post) => {
        setSelectedPost(post); // Store selected post details
        setIsModalOpen(true); // Open modal
      };

      const closeModal = () => {
        setIsModalOpen(false); // Close modal
        setSelectedPost(null); // Clear selected post
      };


  return (
    <div className="posts-container">
    {posts.length > 0 ? (
      posts.map((post, index) => (
        <div className="post-card" key={index}>
          <Slider {...sliderSettings}>
            {post.postedImages.map((image, i) => (
              <div key={i}>
                <img
                  src={`http://localhost:8000/uploads/posts/${image.url}`}
                  alt={`Post Image ${i + 1}`}
                  className="post-image"
                />
              </div>
            ))}
          </Slider>
          <div className="post-details">
            <p className="post-description">{post.description}</p>
            <p className="post-cost">Cost: {post.cost || 'N/A'}</p>
            <button
              className="view-post-btn"
              onClick={() => openModal(post)}
            >
              View Details
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No posts found.</p>
    )}

    {isModalOpen && selectedPost && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal-btn" onClick={closeModal}>
            Close
          </button>
          <h3 className="modal-title">Post Details</h3>
          <div className="modal-info">
            <p><strong>Description:</strong> {selectedPost.description}</p>
            <p><strong>Cost:</strong> {selectedPost.cost || 'N/A'}</p>
          </div>
          <div className="modal-images">
            {selectedPost.postedImages.map((image, i) => (
              <img
                key={i}
                src={`http://localhost:8000/uploads/posts/${image.url}`}
                alt={`Post Image ${i + 1}`}
                className="modal-post-image"
              />
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);
}
export default ViewAllPosts
