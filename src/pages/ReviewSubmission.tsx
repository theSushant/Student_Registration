import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReviewSubmission.css'; 
import { useForm } from '../context/FormContext'; 
import ConfirmDialog from './ConfirmDialog';

const ReviewSubmission: React.FC = () => {
  const navigate = useNavigate(); 
  const { formData } = useForm(); 
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSubmit = () => {
    setShowConfirmDialog(true);
  };

  const closeDialog = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="review-submission-container">
      <h3 className="form-heading fade-in">Final Review & Submission</h3>

      {/* Personal Information Section */}
      <div className="summary-section fade-in">
        <div className="info-card">
          <h3 className="section-title">Personal Information</h3>
          <div className="info-details">
            <p><strong>Title:</strong> {formData.personalInfo?.title || 'N/A'}</p>
            <p><strong>First Name:</strong> {formData.personalInfo?.firstName || 'N/A'}</p>
            <p><strong>Middle Name:</strong> {formData.personalInfo?.middleName || 'N/A'}</p>
            <p><strong>Last Name:</strong> {formData.personalInfo?.lastName || 'N/A'}</p>
            <p><strong>Mobile:</strong> {formData.personalInfo?.mobile || 'N/A'}</p>
            <p><strong>Emergency Contact:</strong> {formData.personalInfo?.emergencyContact || 'N/A'}</p>
            <p><strong>Email:</strong> {formData.personalInfo?.email || 'N/A'}</p>
            <p><strong>Marital Status:</strong> {formData.personalInfo?.maritalStatus || 'N/A'}</p>
            <p><strong>Gender:</strong> {formData.personalInfo?.gender || 'N/A'}</p>
            <p><strong>Date Of Birth:</strong> {formData.personalInfo?.dateOfBirth   || 'N/A'}</p>
          </div>
        </div>

        {/* Address Information Section */}
        <div className="info-card">
          <h3 className="section-title">Address Information</h3>
          <div className="info-details">
            <p><strong>Country:</strong> {formData.addressInfo?.nativeCountry || 'N/A'}</p>
            <p><strong>State:</strong> {formData.addressInfo?.nativeState || 'N/A'}</p>
            <p><strong>City:</strong> {formData.addressInfo?.nativeCity || 'N/A'}</p>
            <p><strong>Postal Code:</strong> {formData.addressInfo?.postalCode || 'N/A'}</p>
            <p><strong>Passport Number:</strong> {formData.addressInfo?.passportNumber || 'N/A'}</p>
            <p><strong>Passport Expiry:</strong> {formData.addressInfo?.passportExpiry || 'N/A'}</p>
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="info-card">
          <h3 className="section-title">Academic Information</h3>
          <div className="info-details">
            <p><strong>Interested Country:</strong> {formData.academicInfo?.interestedCountry || 'N/A'}</p>
            <p><strong>English Test:</strong> {formData.academicInfo?.englishTest || 'N/A'}</p>
            <p><strong>Test Score:</strong> {formData.academicInfo?.testScore || 'N/A'}</p>
            <p><strong>Education Board:</strong> {formData.academicInfo?.educationBoard || 'N/A'}</p>
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
      {/* Custom Confirmation Dialog */}
      {showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure you want to submit your application?"
          closeDialog={closeDialog} 
        />
      )}
    </div>
  );
};

export default ReviewSubmission;