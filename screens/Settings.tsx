
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Screen } from '../types';
import { useToast } from '../components/Toast';
import { storeAdminApi } from '../api';

interface SettingsProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate, onLogout }) => {
  const { showToast, confirm } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Notification settings state
  const [notifications, setNotifications] = useState({
    push_notifications: true,
    order_updates: true,
    daily_reports: false
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await storeAdminApi.getUser();
      if (res.success) {
        setUser(res.data.user);
        setNotifications(res.data.user.notification_settings || {
          push_notifications: true,
          order_updates: true,
          daily_reports: false
        });
      }
    } catch (err) {
      console.error('Failed to fetch user data', err);
      showToast('Failed to load user data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditField = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSaveField = async (field: string) => {
    try {
      const data: any = {};
      if (field === 'name') data.name = editValue;
      if (field === 'email') data.email = editValue;
      if (field === 'phone') data.phone = editValue;

      const res = await storeAdminApi.updateProfile(data);
      if (res.success) {
        setUser(res.data);
        setEditingField(null);
        showToast('Profile updated successfully!', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update profile', 'error');
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Please fill all password fields', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }

    try {
      const res = await storeAdminApi.updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      });

      if (res.success) {
        showToast('Password updated successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update password', 'error');
    }
  };

  const handleToggleNotification = async (key: string) => {
    const newSettings = {
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications]
    };

    try {
      const res = await storeAdminApi.updateNotificationSettings(newSettings);
      if (res.success) {
        setNotifications(newSettings);
        showToast('Notification settings updated!', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update settings', 'error');
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setLoading(true);
      const res = await storeAdminApi.updateAvatar(formData);
      if (res.success) {
        setUser({ ...user, avatar: res.data.avatar });
        showToast('Profile photo updated successfully!', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update profile photo', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout activeScreen={Screen.SETTINGS} onNavigate={onNavigate} title="Loading...">
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeScreen={Screen.SETTINGS} onNavigate={onNavigate} title="Profile & Settings">
      <div className="px-6 py-8">
        <div className="flex flex-col items-center mb-10">
          <div className="relative cursor-pointer group" onClick={() => document.getElementById('avatar-upload')?.click()}>
            <div
              className="w-28 h-28 rounded-full border-4 border-white shadow-xl bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url('${user?.avatar || 'https://picsum.photos/seed/admin/400'}')` }}
            />
            <div className="absolute bottom-0 right-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <h2 className="text-2xl font-black mt-4">{user?.name || 'Store Admin'}</h2>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">
            {user?.store?.name || 'Store'} - {user?.role || 'Admin'}
          </p>
        </div>

        <section className="mb-10">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Personal Information</h3>
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-6 shadow-sm">
            {[
              { label: 'Full Name', value: user?.name || '', field: 'name' },
              { label: 'Email Address', value: user?.email || '', field: 'email' },
              { label: 'Phone Number', value: user?.phone || '', field: 'phone' }
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-end border-b border-gray-50 dark:border-gray-700 pb-2">
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{item.label}</p>
                  {editingField === item.field ? (
                    <div className="flex flex-col gap-2 pt-1">
                      <input
                        type={item.field === 'email' ? 'email' : 'text'}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-primary rounded-xl focus:outline-none focus:ring-0 text-sm font-bold"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveField(item.field)}
                          className="flex-1 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingField(null)}
                          className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-xl text-xs font-black uppercase tracking-widest"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="font-bold">{item.value}</p>
                  )}
                </div>
                {editingField !== item.field && (
                  <span
                    className="material-symbols-outlined text-primary text-[20px] cursor-pointer"
                    onClick={() => handleEditField(item.field, item.value)}
                  >edit</span>
                )}
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
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 pr-12"
                />
                <span
                  className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? 'visibility' : 'visibility_off'}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 8 characters)"
                  className="w-full h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 pr-12"
                />
                <span
                  className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? 'visibility' : 'visibility_off'}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl px-4"
              />
            </div>
            <button
              onClick={handleUpdatePassword}
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
              { key: 'push_notifications', label: 'Push Notifications', desc: 'Alerts for store activity' },
              { key: 'order_updates', label: 'Order Updates', desc: 'Real-time order tracking' },
              { key: 'daily_reports', label: 'Daily Reports', desc: 'Summary of yesterday\'s sales' }
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-base leading-tight">{item.label}</p>
                  <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                </div>
                <div
                  onClick={() => handleToggleNotification(item.key)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 cursor-pointer ${notifications[item.key as keyof typeof notifications] ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : ''}`} />
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
