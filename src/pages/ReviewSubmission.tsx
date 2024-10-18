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
      <h3 className="form-heading fade-in">Final Review & Submission</h3>

      {/* Personal Information Section */}
      <div className="summary-section fade-in">
        <div className="info-card">
          <h3 className="section-title">Personal Information</h3>
          <div className="info-details">
            <p><strong>First Name:</strong> {formData.personalInfo?.firstName || 'N/A'}</p>
            <p><strong>Last Name:</strong> {formData.personalInfo?.lastName || 'N/A'}</p>
            <p><strong>Mobile:</strong> {formData.personalInfo?.mobile || 'N/A'}</p>
            <p><strong>Email:</strong> {formData.personalInfo?.email || 'N/A'}</p>
          </div>
        </div>

        {/* Address Information Section */}
        <div className="info-card">
          <h3 className="section-title">Address Information</h3>
          <div className="info-details">
            <p><strong>Country:</strong> {formData.addressInfo?.country || 'N/A'}</p>
            <p><strong>State:</strong> {formData.addressInfo?.state || 'N/A'}</p>
            <p><strong>City:</strong> {formData.addressInfo?.city || 'N/A'}</p>
            <p><strong>Postal Code:</strong> {formData.addressInfo?.postalCode || 'N/A'}</p>
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="info-card">
          <h3 className="section-title">Academic Information</h3>
          <div className="info-details">
            <p><strong>Interested Country:</strong> {formData.academicInfo?.interestedCountry || 'N/A'}</p>
            <p><strong>English Test:</strong> {formData.academicInfo?.englishTest || 'N/A'}</p>
            <p><strong>Test Score:</strong> {formData.academicInfo?.testScore || 'N/A'}</p>
          </div>
        </div>

        {/* Educational Background Section */}
        <div className="info-card">
          <h3 className="section-title">Educational Background</h3>
          {formData.educationalBackground?.length ? (
            <div className="education-info-container">
              {formData.educationalBackground.map((education, index) => (
                <div key={index} className="education-info">
                  <div className="qualification-title">
                    <strong>Qualification {index + 1}</strong>
                    <div className="separator"></div>
                  </div>
                  <div className="education-item">
                    <strong>Degree:</strong> {education.qualification || 'N/A'}
                  </div>
                  <div className="education-item">
                    <strong>Institution:</strong> {education.institution || 'N/A'}
                  </div>
                  <div className="education-item">
                    <strong>Percentage:</strong> {education.percentage !== undefined ? education.percentage : 'N/A'}
                  </div>
                  <div className="education-item">
                    <strong>Passing Year:</strong> {education.passingYear || 'N/A'}
                  </div>
                  <div className="education-item">
                    <strong>Country:</strong> {education.country || 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No qualifications added.</p>
          )}
        </div>



        {/* Background Information Section */}
        <div className="info-card">
          <h3 className="section-title">Background Information</h3>
          <div className="info-details">
            <p><strong>Visa Rejection:</strong> {formData.backgroundInfo?.visaRejection || 'N/A'}</p>
            <p><strong>Education Gap:</strong> {formData.backgroundInfo?.educationGap || 'N/A'}</p>
          </div>
        </div>

        {/* Uploaded Documents Section */}
        <div className="info-card">
          <h3 className="section-title">Uploaded Documents</h3>
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
      </div>

      {/* Button Section */}
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