import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StepNavigator from '../components/StepNavigator';
import '../styles/EducationalBackground.css'; // Import the CSS file for styles
import { useForm } from '../context/FormContext'; // Import useForm to store the data

// Validation schema
const validationSchema = Yup.object({
  qualifications: Yup.array().of(
    Yup.object({
      qualification: Yup.string().required('Qualification is required'),
      institution: Yup.string().required('Institution/Board/University is required'),
      percentage: Yup.number()
        .required('Percentage is required')
        .min(0, 'Must be at least 0')
        .max(100, 'Must be at most 100'),
      passingYear: Yup.string().required('Passing Year is required'),
      country: Yup.string().required('Country is required'),
    })
  ).required('At least one qualification is required'),
});

const EducationalBackground: React.FC = () => {
  const navigate = useNavigate(); // Navigation hook
  const { formData, setFormData } = useForm(); // Use FormContext to store and retrieve data

  // Initialize qualifications from context if present
  const initialQualifications = formData.educationalBackground || [{
    qualification: '',
    institution: '',
    percentage: '',
    passingYear: '',
    country: ''
  }];

  return (
    <div className="educational-background-container">
      <StepNavigator currentStep={4} /> {/* Step Navigator */}
      <h2 className="form-heading">Educational Background</h2>
      <p className="form-description">
        Please provide your previous education details. You can add multiple qualifications.
      </p>

      <Formik
        initialValues={{
          qualifications: initialQualifications
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Store all qualifications in the context
          setFormData((prevData) => ({
            ...prevData, // Spread previous form data to keep other parts intact
            educationalBackground: values.qualifications.map(qualification => ({
              qualification: qualification.qualification,
              institution: qualification.institution,
              percentage: Number(qualification.percentage), // Ensure percentage is a number
              passingYear: qualification.passingYear,
              country: qualification.country,
            })),
          }));

          setSubmitting(false); // Set submitting to false after storing data
          navigate('/background-info'); // Proceed to the next step
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="form-container">
            <FieldArray name="qualifications">
              {({ push, remove }) => (
                <div>
                  {values.qualifications.map((_, index) => (
                    <div key={index} className="qualification-section animate-slide-down">
                      <h4>Qualification {index + 1}</h4>

                      {/* Qualification */}
                      <div className="form-field">
                        <label htmlFor={`qualifications.${index}.qualification`}><span className="required">*</span>Qualification</label>
                        <Field
                          name={`qualifications.${index}.qualification`}
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.qualification`} component="div" className="error-message" />
                      </div>

                      {/* Institution/Board/University */}
                      <div className="form-field">
                        <label htmlFor={`qualifications.${index}.institution`}><span className="required">*</span>Institution/Board/University</label>
                        <Field
                          name={`qualifications.${index}.institution`}
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.institution`} component="div" className="error-message" />
                      </div>

                      {/* Percentage */}
                      <div className="form-field">
                        <label htmlFor={`qualifications.${index}.percentage`}><span className="required">*</span>Percentage</label>
                        <Field
                          name={`qualifications.${index}.percentage`}
                          type="number"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.percentage`} component="div" className="error-message" />
                      </div>

                      {/* Passing Year */}
                      <div className="form-field">
                        <label htmlFor={`qualifications.${index}.passingYear`}><span className="required">*</span>Passing Year</label>
                        <Field
                          name={`qualifications.${index}.passingYear`}
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.passingYear`} component="div" className="error-message" />
                      </div>

                      {/* Country */}
                      <div className="form-field">
                        <label htmlFor={`qualifications.${index}.country`}><span className="required">*</span>Country</label>
                        <Field
                          name={`qualifications.${index}.country`}
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.country`} component="div" className="error-message" />
                      </div>

                      {/* Remove Button */}
                      {index > 0 && (
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => remove(index)}
                        >
                          Remove Qualification
                        </button>
                      )}

                      <hr />
                    </div>
                  ))}

                  {/* Add Qualification Button */}
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => push({
                      qualification: '',
                      institution: '',
                      percentage: '',
                      passingYear: '',
                      country: ''
                    })}
                  >
                    Add Another Qualification
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Navigation Buttons */}
            <div className="button-container">
              <button
                type="button"
                className="nav-button prev-button"
                onClick={() => navigate('/address-info')}
              >
                Previous
              </button>
              <button type="submit" className="nav-button next-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Next'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EducationalBackground;
