import React, { useState } from 'react';
import { mockStaff } from '../data/mockData';
import { 
  Settings, 
  Users, 
  Home, 
  UserPlus, 
  Edit, 
  Trash2, 
  Lock, 
  User, 
  FileText, 
  Layout, 
  PanelTop,  // Remplace Header
  Image, 
  Palette,
  Search,
  ChevronDown
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'landing' | 'account'>('team');
  
  // Landing Page Settings
  const [landingSettings, setLandingSettings] = useState({
    defaultPage: '/dashboard',
    header: {
      title: 'My Application',
      logo: '',
      showSearch: true,
      backgroundColor: '#ffffff',
      textColor: '#374151'
    },
    footer: {
      text: '© 2023 My Application. All rights reserved.',
      showFooter: true,
      backgroundColor: '#f9fafb',
      textColor: '#6b7280',
      links: [
        { text: 'Privacy Policy', url: '/privacy' },
        { text: 'Terms of Service', url: '/terms' }
      ]
    }
  });

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleLandingSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setLandingSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleHeaderSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLandingSettings(prev => ({
      ...prev,
      header: {
        ...prev.header,
        [name]: value
      }
    }));
  };

  const handleFooterSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLandingSettings(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        [name]: value
      }
    }));
  };

  const handleAccountSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFooterLink = () => {
    setLandingSettings(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: [...prev.footer.links, { text: '', url: '' }]
      }
    }));
  };

  const updateFooterLink = (index: number, field: 'text' | 'url', value: string) => {
    const updatedLinks = [...landingSettings.footer.links];
    updatedLinks[index][field] = value;
    
    setLandingSettings(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: updatedLinks
      }
    }));
  };

  const removeFooterLink = (index: number) => {
    const updatedLinks = landingSettings.footer.links.filter((_, i) => i !== index);
    
    setLandingSettings(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: updatedLinks
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Application Settings</h1>
        <p className="text-gray-500 mt-1">Customize your application appearance and manage your account</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800">Settings Menu</h3>
            </div>
            <div className="space-y-1 p-2">
              <button 
                onClick={() => setActiveTab('team')}
                className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-colors ${activeTab === 'team' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Users size={18} className="mr-3 flex-shrink-0" />
                <span>Team Management</span>
              </button>
              <button 
                onClick={() => setActiveTab('landing')}
                className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-colors ${activeTab === 'landing' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Layout size={18} className="mr-3 flex-shrink-0" />
                <span>Landing Page</span>
              </button>
              <button 
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-colors ${activeTab === 'account' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <User size={18} className="mr-3 flex-shrink-0" />
                <span>My Account</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="lg:col-span-5">
          {activeTab === 'team' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Users className="mr-2" size={20} />
                  Team Management
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Manage your team members and their access permissions.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs uppercase bg-gray-50 text-gray-500">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Phone</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStaff.map((member) => (
                        <tr key={member.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{member.name}</td>
                          <td className="px-6 py-4 capitalize">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              member.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : member.role === 'operator'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {member.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">{member.email}</td>
                          <td className="px-6 py-4">{member.phone || '-'}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end space-x-3">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'landing' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Layout className="mr-2" size={20} />
                  Landing Page Customization
                </h2>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Default Page Section */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Home className="mr-2" size={18} />
                    Default Page Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="defaultPage" className="block text-sm font-medium text-gray-700 mb-1">
                        Landing Page
                      </label>
                      <div className="relative">
                        <select
                          id="defaultPage"
                          name="defaultPage"
                          value={landingSettings.defaultPage}
                          onChange={handleLandingSettingChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none"
                        >
                          <option value="/dashboard">Dashboard</option>
                          <option value="/reports">Reports</option>
                          <option value="/calendar">Calendar</option>
                          <option value="/settings">Settings</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Header Configuration */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <PanelTop className="mr-2" size={18} />
                    Header Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="headerTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Header Title
                      </label>
                      <input
                        type="text"
                        id="headerTitle"
                        name="title"
                        value={landingSettings.header.title}
                        onChange={handleHeaderSettingChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="headerLogo" className="block text-sm font-medium text-gray-700 mb-1">
                        Logo URL
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          id="headerLogo"
                          name="logo"
                          value={landingSettings.header.logo}
                          onChange={handleHeaderSettingChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-l-md"
                          placeholder="https://example.com/logo.png"
                        />
                        <button className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100">
                          <Image size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Header Colors
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label htmlFor="headerBgColor" className="block text-xs text-gray-500 mb-1">
                            Background
                          </label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              id="headerBgColor"
                              name="backgroundColor"
                              value={landingSettings.header.backgroundColor}
                              onChange={handleHeaderSettingChange}
                              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {landingSettings.header.backgroundColor}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <label htmlFor="headerTextColor" className="block text-xs text-gray-500 mb-1">
                            Text
                          </label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              id="headerTextColor"
                              name="textColor"
                              value={landingSettings.header.textColor}
                              onChange={handleHeaderSettingChange}
                              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {landingSettings.header.textColor}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="showSearch"
                        name="showSearch"
                        type="checkbox"
                        checked={landingSettings.header.showSearch}
                        onChange={(e) => handleHeaderSettingChange({
                          ...e,
                          target: {
                            ...e.target,
                            name: 'showSearch',
                            checked: e.target.checked
                          }
                        } as any)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="showSearch" className="ml-2 block text-sm text-gray-700">
                        Show Search Bar
                      </label>
                    </div>
                  </div>
                </div>

                {/* Footer Configuration */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <FileText className="mr-2" size={18} />
                    Footer Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="showFooter"
                        name="showFooter"
                        type="checkbox"
                        checked={landingSettings.footer.showFooter}
                        onChange={(e) => handleFooterSettingChange({
                          ...e,
                          target: {
                            ...e.target,
                            name: 'showFooter',
                            checked: e.target.checked
                          }
                        } as any)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="showFooter" className="ml-2 block text-sm text-gray-700">
                        Show Footer
                      </label>
                    </div>
                    
                    <div>
                      <label htmlFor="footerText" className="block text-sm font-medium text-gray-700 mb-1">
                        Footer Text
                      </label>
                      <input
                        type="text"
                        id="footerText"
                        name="text"
                        value={landingSettings.footer.text}
                        onChange={handleFooterSettingChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Footer Colors
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label htmlFor="footerBgColor" className="block text-xs text-gray-500 mb-1">
                            Background
                          </label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              id="footerBgColor"
                              name="backgroundColor"
                              value={landingSettings.footer.backgroundColor}
                              onChange={handleFooterSettingChange}
                              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {landingSettings.footer.backgroundColor}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <label htmlFor="footerTextColor" className="block text-xs text-gray-500 mb-1">
                            Text
                          </label>
                          <div className="flex items-center">
                            <input
                              type="color"
                              id="footerTextColor"
                              name="textColor"
                              value={landingSettings.footer.textColor}
                              onChange={handleFooterSettingChange}
                              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {landingSettings.footer.textColor}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Footer Links
                      </label>
                      <div className="space-y-3">
                        {landingSettings.footer.links.map((link, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="text"
                              value={link.text}
                              onChange={(e) => updateFooterLink(index, 'text', e.target.value)}
                              placeholder="Link Text"
                              className="flex-1 block shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                            />
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => updateFooterLink(index, 'url', e.target.value)}
                              placeholder="URL"
                              className="flex-1 block shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                            />
                            <button
                              onClick={() => removeFooterLink(index)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addFooterLink}
                          className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          + Add Link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Landing Page Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <User className="mr-2" size={20} />
                  Account Settings
                </h2>
              </div>
              
              <div className="p-6 space-y-8">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <User className="mr-2" size={18} />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={accountSettings.firstName}
                        onChange={handleAccountSettingChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={accountSettings.lastName}
                        onChange={handleAccountSettingChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={accountSettings.email}
                        onChange={handleAccountSettingChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Lock className="mr-2" size={18} />
                    Change Password
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={accountSettings.currentPassword}
                          onChange={handleAccountSettingChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                        <Lock size={16} className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={accountSettings.newPassword}
                          onChange={handleAccountSettingChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                        <Lock size={16} className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={accountSettings.confirmPassword}
                          onChange={handleAccountSettingChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                        <Lock size={16} className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Account Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;