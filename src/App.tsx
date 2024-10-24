import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Home from './pages/Home';
import PersonalInfo from './pages/PersonalInfo';
import AddressInfo from './pages/AddressInfo';
import AcademicInfo from './pages/AcademicInfo';
import EducationalBackground from './pages/EducationalBackground';
import BackgroundInfo from './pages/BackgroundInfo';
import DocumentUpload from './pages/DocumentUpload';
import ReviewSubmission from './pages/ReviewSubmission';
import Layout from './components/Layout';
import FeedbackPage from './pages/FeedbackPage';

const App: React.FC = () => {
  return (
    <FormProvider>
      <Layout> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/address-info" element={<AddressInfo />} />
          <Route path="/academic-info" element={<AcademicInfo />} />
          <Route path="/educational-background" element={<EducationalBackground />} />
          <Route path="/background-info" element={<BackgroundInfo />} />
          <Route path="/document-upload" element={<DocumentUpload />} />
          <Route path="/review-submission" element={<ReviewSubmission />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Layout>
    </FormProvider>
  );
};

export default App;
