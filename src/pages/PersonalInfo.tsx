import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StepNavigator from '../components/StepNavigator'; 
import '../styles/PersonalInfo.css'; 
import { useForm } from '../context/FormContext'; 

// Validation schema for form inputs
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is required'),
  mobile: Yup.string().required('Mobile number is required'),
  emergencyContact: Yup.string().required('Emergency contact number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  maritalStatus: Yup.string().required('Marital status is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
});

const PersonalInfo: React.FC = () => {
  const navigate = useNavigate(); 
  const { formData, setFormData } = useForm(); 

  const handleSubmit = (values: any) => {
    // Store the submitted data in the context
    console.log('Form data:', values);
    setFormData((prevData) => ({
      ...prevData,
      personalInfo: values, 
    }));

    navigate('/address-info');
  };

  useEffect(() => {
  }, [formData]);

  return (
    <div className="personal-info-container">
      <StepNavigator currentStep={1} /> 
      <h2 className="form-heading">Personal Information</h2>
      <p className="form-description">
        Please fill out your personal information to proceed with the registration process.
      </p>

      <Formik
        initialValues={{
          title: formData.personalInfo?.title || '',
          firstName: formData.personalInfo?.firstName || '',
          middleName: formData.personalInfo?.middleName || '',
          lastName: formData.personalInfo?.lastName || '',
          mobile: formData.personalInfo?.mobile || '',
          emergencyContact: formData.personalInfo?.emergencyContact || '',
          email: formData.personalInfo?.email || '',
          maritalStatus: formData.personalInfo?.maritalStatus || '',
          gender: formData.personalInfo?.gender || '',
          dateOfBirth: formData.personalInfo?.dateOfBirth || null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} 
      >
        {({ isSubmitting }) => (
          <Form className="personal-form-container">
            {/* Form Fields */}
            <div className="form-field">
              <label htmlFor="title"><span className="required">*</span>Title</label>
              <Field as="select" name="title" id="title" className="form-select">
                <option value="" label="Select title" />
                <option value="Mr." label="Mr." />
                <option value="Mrs." label="Mrs." />
                <option value="Miss" label="Miss" />
                <option value="Dr." label="Dr." />
                <option value="Prof." label="Prof." />
              </Field>
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="firstName"><span className="required">*</span>First Name</label>
              <Field type="text" name="firstName" id="firstName" className="form-control" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="middleName">Middle Name</label>
              <Field type="text" name="middleName" id="middleName" className="form-control" />
            </div>

            <div className="form-field">
              <label htmlFor="lastName"><span className="required">*</span>Last Name</label>
              <Field type="text" name="lastName" id="lastName" className="form-control" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="mobile"><span className="required">*</span>Mobile No.</label>
              <Field type="text" name="mobile" id="mobile" className="form-control" />
              <ErrorMessage name="mobile" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="emergencyContact"><span className="required">*</span>Emergency Contact No.</label>
              <Field type="text" name="emergencyContact" id="emergencyContact" className="form-control" />
              <ErrorMessage name="emergencyContact" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="email"><span className="required">*</span>Student Email ID</label>
              <Field type="email" name="email" id="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="maritalStatus"><span className="required">*</span>Marital Status</label>
              <Field as="select" name="maritalStatus" id="maritalStatus" className="form-select">
                <option value="" label="Select marital status" />
                <option value="Single" label="Single" />
                <option value="Married" label="Married" />
                <option value="Divorced" label="Divorced" />
                <option value="Widowed" label="Widowed" />
              </Field>
              <ErrorMessage name="maritalStatus" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="gender"><span className="required">*</span>Gender</label>
              <Field as="select" name="gender" id="gender" className="form-select">
                <option value="" label="Select gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
                <option value="Other" label="Other" />
              </Field>
              <ErrorMessage name="gender" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="dateOfBirth"><span className="required">*</span>Date of Birth</label>
              <Field type="date" name="dateOfBirth" id="dateOfBirth" className="form-control" />
              <ErrorMessage name="dateOfBirth" component="div" className="error-message" />
            </div>

            <div className="button-container">
              <button type="button" className="nav-button prev-button" onClick={() => navigate('/')}>Previous</button>
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

export default PersonalInfo;
