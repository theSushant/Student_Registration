import React from 'react';
import logo from '../assets/images/Daltin_Logo_TM.png'; 
import '../styles/Layout.css'; 
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
    <Link to="/">
      <img src={logo} alt="Logo" className="logo" />
    </Link>
    <div className="content">{children}</div>
  </div>
  );
};

export default Layout;
