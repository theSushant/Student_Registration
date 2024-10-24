import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ConfirmDialog.css';
import { useForm } from '../context/FormContext'; 

interface ConfirmDialogProps {
  message: string;
  closeDialog: () => void; 
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, closeDialog }) => {
  const navigate = useNavigate(); 
  const { setFormData } = useForm(); 

  const handleConfirm = () => {
    // Clear the form data by setting it to an empty object
    setFormData({}); 

    closeDialog(); 
    navigate('/feedback'); 
  };

  const handleCancel = () => {
    console.log('Submission canceled');
    closeDialog(); 
  };

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog-box">
        <p>{message}</p>
        <div className="dialog-buttons">
          <button onClick={handleCancel} className="no-button">No</button>
          <button onClick={handleConfirm} className="yes-button">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
