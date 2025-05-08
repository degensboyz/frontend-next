'use client'
import { useState } from 'react';
import ProfileHistory from '@/components/profile/history';
import ChangePassword from '@/components/profile/change-password';
import About from '@/components/profile/about';
const ProfilePage = () => {
  const [activeComponent, setActiveComponent] = useState('Profile');

  const handleMenuClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="flex flex-row h-screen bg-gray-900 mt-10 mx-8">
      <div className="flex-1 flex flex-col items-center p-4">

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="">
            <button onClick={() => handleMenuClick('Profile')} className="bg-blue-600 p-4 text-white rounded-md">ข้อมูลส่วนตัว</button>
          </div>
          <div className="">
            <button onClick={() => handleMenuClick('History')} className="bg-blue-600 p-4 text-white rounded-md">ประวัติการซื้อ</button>
          </div>
          <div className="">
            <button onClick={() => handleMenuClick('Change Password')} className="bg-blue-600 p-4 text-white rounded-md">เปลี่ยนรหัสผ่าน</button>
          </div>
        </div>
        {activeComponent === 'Profile' && <About />}
        {activeComponent === 'History' && <div className="mb-4 w-full"><ProfileHistory /></div>}
        {activeComponent === 'Change Password' && <ChangePassword />}

      </div>
    </div>
  );
}

export default ProfilePage;