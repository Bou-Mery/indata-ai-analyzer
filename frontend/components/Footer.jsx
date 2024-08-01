// components/Footer.js
import React from 'react';
import '@styles/Footer.css'

const Footer = () => {
  return (
    <footer className='footer flex-center'>
      <div className='footer-content'>
        <p>&copy; 2024 INDATA-<span className='ocp'>OCP</span>. All rights reserved.</p>
        <div className='social-links'>
          <a href='#' className='social-link'>LinkedIn</a>
          <a href='#' className='social-link'>Twitter</a>
          <a href='#' className='social-link'>GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
