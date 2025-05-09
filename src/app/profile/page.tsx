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
    <div className="h-screen bg-gray-900 mt-10 mx-8">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        <div className="">
          <button onClick={() => handleMenuClick('Profile')} className={`p-2 text-white rounded-md w-full m-2 ${activeComponent === 'Profile' ? 'bg-blue-700' : 'bg-blue-400'}`}>ข้อมูลส่วนตัว</button>
        </div>
        <div className="">
          <button onClick={() => handleMenuClick('History')} className={`p-2 text-white rounded-md w-full m-2 ${activeComponent === 'History' ? 'bg-blue-700' : 'bg-blue-400'}`}>ประวัติการซื้อ</button>
        </div>
        <div className="">
          <button onClick={() => handleMenuClick('Change Password')} className={`p-2 text-white rounded-md w-full m-2 ${activeComponent === 'Change Password' ? 'bg-blue-700' : 'bg-blue-400'}`}>เปลี่ยนรหัสผ่าน</button>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex-1 flex flex-col items-center p-4">

          {activeComponent === 'Profile' && <About />}
          {activeComponent === 'History' && <div className="mb-4 w-full"><ProfileHistory /></div>}
          {activeComponent === 'Change Password' && <ChangePassword />}

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;