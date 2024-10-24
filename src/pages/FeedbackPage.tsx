import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FeedbackPage.css'; 

const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState(0); 
  const navigate = useNavigate(); 

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex); 
  };

  useEffect(() => {
    if (rating > 0) {
      // Redirect to the home page 
      const timer = setTimeout(() => {
        navigate('/'); 
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [rating, navigate]); 

  return (
    <div className="feedback-container">
      <h2>Thank you for submitting your application!</h2>
      <p>We would love to hear your feedback on the registration process.</p>

      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span
            key={index}
            className={`star ${rating >= star ? 'selected' : ''}`} 
            onClick={() => handleStarClick(star)}
          >
            &#9733;
          </span>
        ))}
      </div>

      {rating > 0 && <p>You rated us {rating} out of 5 stars!</p>}
    </div>
  );
};

export default FeedbackPage;
