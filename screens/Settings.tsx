
import React from 'react';
import Layout from '../components/Layout';
import { Screen } from '../types';
import { useToast } from '../components/Toast';

interface SettingsProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate, onLogout }) => {
  const { showToast, confirm } = useToast();
  return (
    <Layout activeScreen={Screen.SETTINGS} onNavigate={onNavigate} title="Profile & Settings">
      <div className="px-6 py-8">
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div
              className="w-28 h-28 rounded-full border-4 border-white shadow-xl bg-cover"
              style={{ backgroundImage: `url('https://picsum.photos/seed/admin/400')` }}
            />
            <button className="absolute bottom-0 right-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            </button>
          </div>
          <h2 className="text-2xl font-black mt-4">Alex Thompson</h2>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">Store #1234 - Downtown Branch</p>
        </div>

        <section className="mb-10">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Personal Information</h3>
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-6 shadow-sm">
            {[
              { label: 'Full Name', value: 'Alex Thompson' },
              { label: 'Email Address', value: 'alex.thompson@storeadmin.com' },
              { label: 'Phone Number', value: '+1 (555) 0123-4567' }
            ].map((field) => (
              <div key={field.label} className="flex justify-between items-end border-b border-gray-50 dark:border-gray-700 pb-2">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{field.label}</p>
                  <p className="font-bold">{field.value}</p>
                </div>
                <span
                  className="material-symbols-outlined text-primary text-[20px] cursor-pointer"
                  onClick={() => showToast('Profile editing is restricted in this demo.', 'info')}
                >edit</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Security</h3>
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-6">
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Current Password</label>
              <div className="relative">
                <input
                  type="password"
                  value="12345678"
                  readOnly
                  className="w-full h-12 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-4"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">visibility_off</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl px-4"
              />
            </div>
            <button
              onClick={() => showToast('Password updated successfully!', 'success')}
              className="w-full h-12 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              Update Password
            </button>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Notification Settings</h3>
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-6 shadow-sm">
            {[
              { label: 'Push Notifications', desc: 'Alerts for store activity', active: true },
              { label: 'Order Updates', desc: 'Real-time order tracking', active: true },
              { label: 'Daily Reports', desc: 'Summary of yesterday\'s sales', active: false }
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-base leading-tight">{item.label}</p>
                  <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                </div>
                <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 cursor-pointer ${item.active ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${item.active ? 'translate-x-6' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={() => confirm({
            title: 'Sign Out',
            message: 'Are you sure you want to end your session?',
            onConfirm: onLogout
          })}
          className="w-full h-14 border-2 border-red-500 text-red-500 font-black rounded-2xl flex items-center justify-center gap-2 mb-8 active:bg-red-50 transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout from App
        </button>

        <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest pb-12">
          App Version 2.4.1 (Build 882)
        </p>
      </div>
    </Layout>
  );
};

export default Settings;
