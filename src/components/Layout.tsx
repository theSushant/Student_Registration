import React from 'react';
import logo from '../assets/images/Daltin_Logo_TM.png'; // Importing the logo
import '../styles/Layout.css'; // Importing styles for the layout

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <img src={logo} alt="Logo" className="logo" />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
