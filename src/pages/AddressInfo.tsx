import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import StepNavigator from '../components/StepNavigator';
import '../styles/AddressInfo.css';
import { useForm } from '../context/FormContext';

// Validation schema
const validationSchema = Yup.object({
  nativeCountry: Yup.string().required('Native Country is required'),
  nativeState: Yup.string().required('Native State is required'),
  nativeCity: Yup.string().required('Native City is required'),
  postalCode: Yup.string().required('Postal Code is required'),
  passportNumber: Yup.string().required('Passport No. is required'),
  passportExpiry: Yup.date().required('Passport Expiry is required').nullable(),
});

const AddressInfo: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useForm(); // Access formData from context
  const [isAddressOpen, setIsAddressOpen] = useState(true);
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  // Toggle accordion sections
  const toggleAddressSection = () => setIsAddressOpen(!isAddressOpen);
  const togglePassportSection = () => setIsPassportOpen(!isPassportOpen);

  const handleSubmit = (values: any) => {
    // Store the submitted address and passport data
    setFormData((prevData) => ({
      ...prevData,
      addressInfo: values,
    }));
    navigate('/academic-info'); // Navigate to the next step
  };

  useEffect(() => {
  }, [formData]);

  return (
    <div className="address-info-container">
      <StepNavigator currentStep={2} />
      <h2 className="form-heading">Address & Passport Information</h2>
      <p className="form-description">Please fill out the information below to proceed.</p>

      <Formik
        initialValues={{
          nativeCountry: formData.addressInfo?.nativeCountry || '',
          nativeState: formData.addressInfo?.nativeState || '',
          nativeCity: formData.addressInfo?.nativeCity || '',
          postalCode: formData.addressInfo?.postalCode || '',
          passportNumber: formData.addressInfo?.passportNumber || '',
          passportExpiry: formData.addressInfo?.passportExpiry || null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // Save form data to context and navigate to next step
      >
        {() => (
          <Form className="form-container">
            {/* Address Information Section */}
            <div className="accordion-section">
              <div className="accordion-header" onClick={toggleAddressSection}>
                <h3>Address Information</h3>
                <span className={`accordion-toggle ${isAddressOpen ? 'open' : ''}`}>
                  {isAddressOpen ? '-' : '+'}
                </span>
              </div>
              {isAddressOpen && (
                <div className="accordion-content">
                  <div className="form-field">
                    <label htmlFor="nativeCountry"><span className="required">*</span>Native Country</label>
                    <Field as="select" name="nativeCountry" id="nativeCountry" required className="form-select">
                      <option value="" label="Select country" />
                      <option value="India" label="India" />
                      <option value="USA" label="USA" />
                      <option value="Canada" label="Canada" />
                      <option value="UK" label="UK" />
                      <option value="Australia" label="Australia" />
                    </Field>
                  </div>

                  <div className="form-field">
                    <label htmlFor="nativeState"><span className="required">*</span>Native State</label>
                    <Field name="nativeState" id="nativeState" required className="form-control" />
                  </div>

                  <div className="form-field">
                    <label htmlFor="nativeCity"><span className="required">*</span>Native City</label>
                    <Field name="nativeCity" id="nativeCity" required className="form-control" />
                  </div>

                  <div className="form-field">
                    <label htmlFor="postalCode"><span className="required">*</span>Postal Code</label>
                    <Field name="postalCode" id="postalCode" required className="form-control" />
                  </div>
                </div>
              )}
            </div>

            {/* Passport Information Section */}
            <div className="accordion-section">
              <div className="accordion-header" onClick={togglePassportSection}>
                <h3>Passport Information</h3>
                <span className={`accordion-toggle ${isPassportOpen ? 'open' : ''}`}>
                  {isPassportOpen ? '-' : '+'}
                </span>
              </div>
              {isPassportOpen && (
                <div className="accordion-content">
                  <div className="form-field">
                    <label htmlFor="passportNumber"><span className="required">*</span>Passport No.</label>
                    <Field name="passportNumber" id="passportNumber" required className="form-control" />
                  </div>

                  <div className="form-field">
                    <label htmlFor="passportExpiry"><span className="required">*</span>Passport Expiry</label>
                    <Field type="date" name="passportExpiry" id="passportExpiry" required className="form-control" />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="button-container">
              <button
                type="button"
                className="nav-button prev-button"
                onClick={() => navigate('/personal-info')}
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

export default AddressInfo;
