import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/userContext';
import attendance from '../assets/img/attendance.png';

export const Header = () => {
  const { authUser, logout } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const dropdownRef = useRef(null);

  const firstLetter = authUser?.name?.charAt(0).toUpperCase();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center py-4 px-8 border-b">
      <div>
        <img 
            src={attendance}
            alt="attendance logo"
            className='w-10'
        />
      </div>

      <h1 className="text-2xl font-semibold">
        Attendance Management
      </h1>

      <div className="relative" ref={dropdownRef}>
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full bg-black text-white text-xl cursor-pointer flex items-center justify-center font-semibold"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {firstLetter}
        </div>

        {/* Dropdown */}
        {showDetails && (
          <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-lg border p-4 z-50">
            <p className="font-semibold">{authUser?.name}</p>
            <p className="text-sm text-gray-500 mb-4">
              {authUser?.email}
            </p>

            <button
              onClick={logout}
              className="w-full py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
