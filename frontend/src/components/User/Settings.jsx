// src/components/User/Settings.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';

const Settings = () => {
  const { user } = useSelector((state) => state.user);
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');

  return (
    <>
      <MetaData title="Account Settings" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="text-primary-blue" sx={{ fontSize: 32 }} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
              <p className="text-sm text-gray-600">Manage your account preferences</p>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <NotificationsIcon className="text-primary-blue" />
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h3 className="font-medium text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive order updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h3 className="font-medium text-gray-800">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Receive order updates via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <SecurityIcon className="text-primary-blue" />
              <h2 className="text-lg font-semibold text-gray-800">Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                </label>
              </div>

              <div className="py-3">
                <button className="text-primary-blue hover:text-primary-darkBlue font-medium">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <PaletteIcon className="text-primary-blue" />
              <h2 className="text-lg font-semibold text-gray-800">Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div className="py-3 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <LanguageIcon className="text-gray-600" sx={{ fontSize: 20 }} />
                  <h3 className="font-medium text-gray-800">Language</h3>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>

              <div className="py-3">
                <h3 className="font-medium text-gray-800 mb-2">Theme</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTheme('Light')}
                    className={`px-6 py-2 rounded-md border-2 transition-all ${
                      theme === 'Light'
                        ? 'border-primary-blue bg-primary-blue text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary-blue'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme('Dark')}
                    className={`px-6 py-2 rounded-md border-2 transition-all ${
                      theme === 'Dark'
                        ? 'border-primary-blue bg-primary-blue text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary-blue'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme('Auto')}
                    className={`px-6 py-2 rounded-md border-2 transition-all ${
                      theme === 'Auto'
                        ? 'border-primary-blue bg-primary-blue text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary-blue'
                    }`}
                  >
                    Auto
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue">
              Save Changes
            </button>
          </div>

        </div>
      </main>
    </>
  );
};

export default Settings;