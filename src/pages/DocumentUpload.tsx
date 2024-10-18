import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import StepNavigator from '../components/StepNavigator';
import '../styles/DocumentUpload.css'; // Import CSS for styles

// Validation schema for document uploads
const validationSchema = Yup.object({
  documents: Yup.array().of(
    Yup.object({
      file: Yup.mixed()
        .required('File is required')
        .test('fileType', 'Unsupported File Format', (value) => {
          if (value && value instanceof File) {
            return ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type);
          }
          return false; // Return false if value is not a File
        })
        .test('fileSize', 'File Size is too large', (value) => {
          if (value && value instanceof File) {
            return value.size <= 10485760; // 10MB limit
          }
          return false; // Return false if value is not a File
        }),
    })
  ).min(1, 'At least one document is required.'),
});

const DocumentUpload: React.FC = () => {
  const navigate = useNavigate(); // Navigation hook
  const [files, setFiles] = useState<any[]>([]); // State to manage files
  const [progress, setProgress] = useState<number[]>([]); // State to manage upload progress

  const handleDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const newIndex = files.length;
      setFiles((currentFiles) => [...currentFiles, { file, name: file.name }]);
      setProgress((currentProgress) => {
        const newProgress = [...currentProgress];
        newProgress[newIndex] = 0; // Initialize progress for the new file
        return newProgress;
      });

      // Simulate file upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = [...prev];
          newProgress[newIndex] = Math.min(newProgress[newIndex] + 10, 100);
          return newProgress;
        });
      }, 100); // Simulating progress every 100ms

      setTimeout(() => {
        clearInterval(interval);
      }, 1000); // Simulating upload completion after 1 second
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const updatedFiles = [...files];
      updatedFiles[index] = { file, name: file.name }; // Update the specific index
      setFiles(updatedFiles);
    }
  };

  const triggerFileInputClick = (index: number) => {
    const input = document.querySelector(`input[name="documents.${index}.file"]`) as HTMLInputElement;
    input?.click(); // Cast to HTMLInputElement
  };

  return (
    <div className="document-upload-container">
      <StepNavigator currentStep={6} /> {/* Step Navigator */}
      <h2 className="form-heading">Document Upload</h2>
      <p className="form-description">
        Please upload the required documents for your application.
      </p>

      <Formik
        initialValues={{ documents: files }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Uploaded files:', values);
          navigate('/review-submission'); // Proceed to the next step
        }}
      >
        {({ setFieldValue, errors }) => (
          <Form className="form-container">
            <FieldArray name="documents">
              {({ push, remove }) => (
                <div>
                  {/* Upload fields for each document */}
                  {['10th Marksheet', '12th Marksheet', 'Passport', 'English Proficiency Test Certificate', 'SOP', 'CV', 'Experience', 'Bachelor’s Degree'].map((doc, index) => (
                    <div className="upload-field" key={index}>
                      <label><strong>{doc}</strong></label>
                      <div className="drag-and-drop-area"
                        onDrop={(e) => {
                          e.preventDefault();
                          const droppedFiles = Array.from(e.dataTransfer.files);
                          handleDrop(droppedFiles);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <p>Drag & Drop your {doc} here</p>
                        <p>or</p>
                        <input
                          type="file"
                          name={`documents.${index}.file`}
                          onChange={(e) => handleFileChange(e, index)}
                          className="file-input"
                        />
                        <button
                          type="button"
                          onClick={() => triggerFileInputClick(index)} // Use the function to trigger click
                          className="upload-button"
                        >
                          Choose File
                        </button>
                      </div>

                      {/* Progress Indicator */}
                      {progress[index] > 0 && (
                        <div className="progress-bar">
                          <div
                            className="progress"
                            style={{ width: `${progress[index]}%` }}
                          />
                          <span>{progress[index]}%</span>
                        </div>
                      )}

                      {/* Display uploaded files */}
                      {files[index]?.file && (
                        <div className="uploaded-file">
                          <span>{files[index].file.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            {/* Navigation Buttons */}
            <div className="button-container">
              <button
                type="button"
                className="nav-button prev-button"
                onClick={() => navigate('/background-info')}
              >
                Previous
              </button>
              <button type="submit" className="nav-button next-button" onClick={() => navigate('/review-submission')}>
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DocumentUpload;
