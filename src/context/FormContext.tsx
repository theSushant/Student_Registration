import React, { createContext, useState, useContext, ReactNode } from 'react';

// Shape of the form data
interface FormData {
  personalInfo?: {
    title: string,
    firstName: string;
    middleName: string,
    lastName: string;
    email: string;
    mobile: string;
    emergencyContact: string,
    maritalStatus: string,
    gender: string,
    dateOfBirth: string,
  };
  addressInfo?: {
    nativeCountry: string;
    nativeState: string;
    nativeCity: string;
    postalCode: string;
    passportNumber: string,
    passportExpiry: string,
  };
  academicInfo?: {
    interestedCountry: string;
    englishTest: string;
    testScore?: string; // Optional
    educationBoard?: string; // Optional
  };

  educationalBackground?: Array<{ 
    qualification: string; 
    institution: string; 
    percentage: number; 
    passingYear: string; 
    country: string; 
  }>;

  backgroundInfo?: {
    visaRejection: string;
    educationGap: string;
  };

  documents?: Array<{
    name: string; 
    file: string; 
  }>;
}

// Context for form data
interface FormContextType {
  formData: FormData; // Current form data
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; // Function to update the form data
}

// FormContext
const FormContext = createContext<FormContextType | undefined>(undefined);

// Context Provider component (FormProvider)
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children} 
    </FormContext.Provider>
  );
};

// Custom hook to use the form context (useForm)
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider'); // Error handling if context is not found
  }
  return context; // Return the context for use in components
};
