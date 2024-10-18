import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StepNavigator.css'; // Importing CSS for styles

interface StepNavigatorProps {
  currentStep: number; // Current step number (1-indexed)
}

const StepNavigator: React.FC<StepNavigatorProps> = ({ currentStep }) => {
  const steps = [
    { label: 'Personal Info', path: '/personal-info' },
    { label: 'Address Info', path: '/address-info' },
    { label: 'Academic Info', path: '/academic-info' },
    { label: 'Educational Background', path: '/educational-background' },
    { label: 'Background Info', path: '/background-info' },
    { label: 'Document Upload', path: '/document-upload' },
  ];

  return (
    <div className="step-navigator">
      {steps.map((step, index) => (
        <div key={index} className="step">
          <Link 
            to={step.path} 
            className={`circle ${currentStep === index + 1 ? 'active' : ''}`} 
          >
            {index + 1}
            <span className="tooltip">{step.label}</span> {/* Tooltip below circle */}
          </Link>
          {index < steps.length - 1 && <div className="line" />}
        </div>
      ))}
    </div>
  );
};

export default StepNavigator;
