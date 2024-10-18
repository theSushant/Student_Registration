import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type = 'text', placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} placeholder={placeholder} />
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default FormInput;
