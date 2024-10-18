import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReviewSubmission.css'; // Import CSS for styles
import { useForm } from '../context/FormContext'; // Import useForm to access form data

const ReviewSubmission: React.FC = () => {
  const navigate = useNavigate(); // Navigation hook
  const { formData } = useForm(); // Get the form data from context

  const handleSubmit = () => {
    const confirmed = window.confirm('Are you sure you want to submit your application?');
    if (confirmed) {
      console.log('Application submitted successfully!', formData);
      // Proceed to the next step or submit logic here
    }
  };

  return (
    <div className="review-submission-container">
      <h2 className="form-heading fade-in">Final Review & Submission</h2>

      {/* Display Personal Information */}
      <div className="summary-section fade-in">
        <h3>Personal Information</h3>
        <p><strong>First Name:</strong> {formData.personalInfo?.firstName || 'N/A'}</p>
        <p><strong>Last Name:</strong> {formData.personalInfo?.lastName || 'N/A'}</p>
        <p><strong>Mobile:</strong> {formData.personalInfo?.mobile || 'N/A'}</p>
        <p><strong>Email:</strong> {formData.personalInfo?.email || 'N/A'}</p>

        {/* Display Address Information */}
        <h3>Address Information</h3>
        <p><strong>Country:</strong> {formData.addressInfo?.country || 'N/A'}</p>
        <p><strong>State:</strong> {formData.addressInfo?.state || 'N/A'}</p>
        <p><strong>City:</strong> {formData.addressInfo?.city || 'N/A'}</p>
        <p><strong>Postal Code:</strong> {formData.addressInfo?.postalCode || 'N/A'}</p>

        {/* Display Academic Information */}
        <h3>Academic Information</h3>
        <p><strong>Interested Country:</strong> {formData.academicInfo?.interestedCountry || 'N/A'}</p>
        <p><strong>English Test:</strong> {formData.academicInfo?.englishTest || 'N/A'}</p>
        <p><strong>Test Score:</strong> {formData.academicInfo?.testScore || 'N/A'}</p>

        {/* Display Educational Background */}
        <h3>Educational Background:</h3>
        {formData.educationalBackground?.length ? (
          formData.educationalBackground.map((education, index) => (
            <div key={index}>
              <p><strong>Qualification {index + 1}:</strong></p>
              <p>Degree: {education.qualification || 'N/A'}</p>
              <p>Institution: {education.institution || 'N/A'}</p>
              <p>Percentage: {education.percentage !== undefined ? education.percentage : 'N/A'}</p>
              <p>Passing Year: {education.passingYear || 'N/A'}</p>
              <p>Country: {education.country || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>No qualifications added.</p>
        )}

        {/* Display Background Information */}
        <h3>Background Information</h3>
        <p><strong>Visa Rejection:</strong> {formData.backgroundInfo?.visaRejection || 'N/A'}</p>
        <p><strong>Education Gap:</strong> {formData.backgroundInfo?.educationGap || 'N/A'}</p>

        {/* Display Uploaded Documents */}
        <h3>Uploaded Documents:</h3>
        {formData.documents?.length ? (
          formData.documents.map((doc, index) => (
            <div key={index}>
              <p><strong>{index + 1}. {doc.name}:</strong> {doc.file}</p>
            </div>
          ))
        ) : (
          <p>No documents uploaded.</p>
        )}
      </div>

      <div className="button-container">
        <button
          type="button"
          className="nav-button back-button"
          onClick={() => navigate('/document-upload')}
        >
          Edit Information
        </button>
        <button
          type="button"
          className="nav-button submit-button bounce"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmission;
