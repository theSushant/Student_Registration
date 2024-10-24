import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; 

const Home: React.FC = () => {
  // Steps with numbers and descriptions
  const steps = [
    { number: 1, description: 'Personal Information: Enter your personal details including name and contact information.' },
    { number: 2, description: 'Address Information: Provide your current address and related details.' },
    { number: 3, description: 'Academic Information: Share your academic interests and qualifications.' },
    { number: 4, description: 'Educational Background: Fill in your previous education details.' },
    { number: 5, description: 'Background Information: Answer any additional questions regarding your background.' },
  ];

  return (
    <div className="home-container">
      <h1 className="home-text fade-in">Welcome to the Student Registration Portal</h1>
      <p className="overview fade-in">
        Please follow the steps to complete your registration. This process consists of multiple sections to collect your personal and educational information.
      </p>
      <Link to="/personal-info" className="start-button">Start Registration</Link>
      
      {/* Steps Section */}
      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.number} className="home-step fade-in">
            <strong>Step {step.number}:</strong>
            <span className="step-description"> {step.description}</span> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
