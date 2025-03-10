'use client'
import { useState } from 'react';

const ProfilePage = () => {
  const [activeComponent, setActiveComponent] = useState('Profile');

  const handleMenuClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-gray-900 mt-10 mx-8">
      <div className="w-64 h-full bg-gray-800 p-4">
        <nav className="space-y-4 text-white">
          <ul>
            <li
              onClick={() => handleMenuClick('Profile')}
              className={`cursor-pointer p-2 hover:bg-gray-700 ${activeComponent === 'Profile' ? 'bg-gray-700' : ''}`}
            >
              Profile
            </li>
            <li
              onClick={() => handleMenuClick('History')}
              className={`cursor-pointer p-2 hover:bg-gray-700 ${activeComponent === 'History' ? 'bg-gray-700' : ''}`}
            >
              History
            </li>
            <li
              onClick={() => handleMenuClick('Change Password')}
              className={`cursor-pointer p-2 hover:bg-gray-700 ${activeComponent === 'Change Password' ? 'bg-gray-700' : ''}`}
            >
              Change Password
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {activeComponent === 'Profile' && <h1 className="text-2xl font-bold text-white">Profile</h1>}
        {activeComponent === 'History' && <h1 className="text-2xl font-bold text-white">History</h1>}
        {activeComponent === 'Change Password' && <h1 className="text-2xl font-bold text-white">Change Password</h1>}
      </div>
    </div>
  );
}

export default ProfilePage;