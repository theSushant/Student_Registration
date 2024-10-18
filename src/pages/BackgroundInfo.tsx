import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StepNavigator from '../components/StepNavigator';
import '../styles/BackgroundInfo.css'; // Import CSS for styles
import { useForm } from '../context/FormContext'; // Import useForm to store the data

// Validation schema
const validationSchema = Yup.object({
  visaRejection: Yup.string().required('Visa rejection status is required'),
  educationGap: Yup.string().required('Gap in Education is required'),
});

// Type for Form Values
interface FormValues {
  visaRejection: string;
  educationGap: string;
}

const BackgroundInfo: React.FC = () => {
  const navigate = useNavigate(); // Navigation hook
  const { setFormData } = useForm(); // Use FormContext to store data

  return (
    <div className="background-info-container">
      <StepNavigator currentStep={5} /> {/* Step Navigator */}
      <h2 className="form-heading">Background Information</h2>
      <p className="form-description">
        Please provide your visa rejection status and gap in education details.
      </p>

      <Formik
        initialValues={{
          visaRejection: '',
          educationGap: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues) => {
          // Store background information in the context
          setFormData((prevData) => ({
            ...prevData, // Keep other form data intact
            backgroundInfo: {
              visaRejection: values.visaRejection,
              educationGap: values.educationGap,
            },
          }));

          // Proceed to the next step
          navigate('/document-upload');
        }}
      >
        {({ handleChange, values }) => (
          <Form className="form-container">
            {/* Visa Rejection Status */}
            <div className="form-field">
              <label><span className="required">*</span>Visa Rejection Status</label>
              <div className="radio-group">
                <label className={`radio-pill ${values.visaRejection === 'Yes' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="visaRejection"
                    value="Yes"
                    className="radio-input bounce-animation"
                    onChange={handleChange}
                    checked={values.visaRejection === 'Yes'}
                  />
                  <span className="radio-label">Yes</span>
                </label>
                <label className={`radio-pill ${values.visaRejection === 'No' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="visaRejection"
                    value="No"
                    className="radio-input bounce-animation"
                    onChange={handleChange}
                    checked={values.visaRejection === 'No'}
                  />
                  <span className="radio-label">No</span>
                </label>
              </div>
              <ErrorMessage name="visaRejection" component="div" className="error-message" />
            </div>

            {/* Gap in Education */}
            <div className="form-field">
              <div className='row_val'>
                <label htmlFor="educationGap"><span className="required">*</span>Gap in Education</label>
                <div className="tooltip-container">
                  <i className="tooltip-icon" aria-label="Education gap info">?</i>
                  <span className="tooltip-text">Select the gap period if applicable.</span>
                </div>
              </div>

              <Field
                as="select"
                name="educationGap"
                className="form-select"
                value={values.educationGap}
                onChange={handleChange}
              >
                <option value="" label="Select gap duration" />
                <option value="None" label="None" />
                <option value="Less than 1 year" label="Less than 1 year" />
                <option value="1-2 years" label="1-2 years" />
                <option value="More than 2 years" label="More than 2 years" />
              </Field>
              <ErrorMessage name="educationGap" component="div" className="error-message" />
            </div>

            {/* Navigation Buttons */}
            <div className="button-container">
              <button
                type="button"
                className="nav-button prev-button"
                onClick={() => navigate('/educational-background')}
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

export default BackgroundInfo;
