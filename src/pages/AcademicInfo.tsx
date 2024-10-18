import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StepNavigator from '../components/StepNavigator';
import '../styles/AcademicInfo.css'; // Import the CSS file for styles
import { useForm } from '../context/FormContext'; // Import useForm to access the context

// Validation schema
const validationSchema = Yup.object({
  interestedCountry: Yup.string().required('Interested Country is required'),
  englishTest: Yup.string().required('English Proficiency Test is required'),
  testScore: Yup.string().nullable(), // No conditional validation
  educationBoard: Yup.string().nullable(), // No conditional validation
});

const AcademicInfo: React.FC = () => {
  const navigate = useNavigate(); // Navigation hook
  const { formData, setFormData } = useForm(); // Use FormContext to store data

  const [showTestScore, setShowTestScore] = useState(false);
  const [showEducationBoard, setShowEducationBoard] = useState(false);
  
  const handleTestChange = (value: string) => {
    if (value === 'None') {
      setShowTestScore(false);
      setShowEducationBoard(true);
    } else {
      setShowTestScore(true);
      setShowEducationBoard(false);
    }
  };

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Store the submitted academic data in the context
    setFormData((prevData) => ({
      ...prevData, // Keep existing data intact
      academicInfo: { // Add academic information
        interestedCountry: values.interestedCountry,
        englishTest: values.englishTest,
        testScore: values.testScore,
        educationBoard: values.educationBoard,
      },
    }));

    // Navigate to the next page
    navigate('/educational-background'); 
  };

  return (
    <div className="academic-info-container">
      <StepNavigator currentStep={3} /> {/* Step Navigator */}
      <h2 className="form-heading">Academic Information</h2>
      <p className="form-description">Please provide your academic preferences and proficiency details.</p>

      <Formik
        initialValues={{
          interestedCountry: formData.academicInfo?.interestedCountry || '',
          englishTest: formData.academicInfo?.englishTest || '',
          testScore: formData.academicInfo?.testScore || '',
          educationBoard: formData.academicInfo?.educationBoard || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // Save form data to context and navigate to next step
      >
        {({ setFieldValue }) => (
          <Form className="form-container">

            {/* Interested Country */}
            <div className="form-field">
              <label htmlFor="interestedCountry"><span className="required">*</span>Interested Country</label>
              <Field as="select" name="interestedCountry" className="form-select" required>
                <option value="" label="Select country" />
                <option value="USA" label="USA" />
                <option value="Canada" label="Canada" />
                <option value="UK" label="UK" />
                <option value="Australia" label="Australia" />
              </Field>
              <ErrorMessage name="interestedCountry" component="div" className="error-message" />
            </div>

            {/* English Proficiency Test */}
            <div className="form-field">
              <label htmlFor="englishTest"><span className="required">*</span>English Proficiency Test</label>
              <Field
                as="select"
                name="englishTest"
                className="form-select"
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFieldValue('englishTest', e.target.value);
                  handleTestChange(e.target.value); // Show or hide fields based on value
                }}
              >
                <option value="" label="Select test" />
                <option value="IELTS" label="IELTS" />
                <option value="TOEFL" label="TOEFL" />
                <option value="PTE" label="PTE" />
                <option value="None" label="None" />
              </Field>
              <ErrorMessage name="englishTest" component="div" className="error-message" />
            </div>

            {/* Conditional Test Score Field */}
            {showTestScore && (
              <div className="form-field">
                <label htmlFor="testScore"><span className="required">*</span>Test Score</label>
                <Field
                  type="text"
                  name="testScore"
                  className="form-control"
                />
                <ErrorMessage name="testScore" component="div" className="error-message" />
              </div>
            )}

            {/* Conditional Education Board Field */}
            {showEducationBoard && (
              <div className="form-field">
                <label htmlFor="educationBoard"><span className="required">*</span>Education Board</label>
                <Field
                  type="text"
                  name="educationBoard"
                  className="form-control"
                />
                <ErrorMessage name="educationBoard" component="div" className="error-message" />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="button-container">
              <button
                type="button"
                className="nav-button prev-button"
                onClick={() => navigate('/address-info')}
              >
                Previous
              </button>
              <button type="submit" className="nav-button next-button">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AcademicInfo;
