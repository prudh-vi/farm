// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ currentLang, onLanguageChange }) => {
  return (
    <nav className="bg-green-950 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold">FarmSmart</span>
          </div>
          <div className="flex items-center space-x-8">
            <select 
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="px-4 py-2 rounded-md bg-white bg-opacity-20 text-white border border-white border-opacity-20"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;