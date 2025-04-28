import React, { useState } from 'react';
import { Bell, User, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const unreadNotifications = mockNotifications.filter(n => !n.read);

  return (
    <header className="bg-white shadow-sm py-3 px-6 flex justify-between items-center border-b border-gray-200">
      <div className="flex-1"></div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
          >
            <Bell size={20} className="text-gray-700" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                {unreadNotifications.length}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10 overflow-hidden border border-gray-200">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Notifications</h3>
                <button className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors ${notification.read ? '' : 'bg-blue-50'}`}
                  >
                    <div className="flex items-start">
                      <div 
                        className={`w-2 h-2 mt-1.5 rounded-full mr-2 flex-shrink-0 ${
                          notification.type === 'info' ? 'bg-blue-500' : 
                          notification.type === 'warning' ? 'bg-amber-500' : 
                          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleTimeString()} - {new Date(notification.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Profile */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none hover:bg-gray-100 p-2 rounded-full transition-colors duration-200 group"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              AU
            </div>
            <ChevronDown 
              size={16} 
              className={`text-gray-600 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-gray-200 overflow-hidden">
              <div className="p-3 border-b border-gray-200">
                <p className="font-medium text-gray-800">Admin User</p>
                <p className="text-sm text-gray-600">admin@printmaster.com</p>
              </div>
              <div className="py-1">
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors">
                  <User size={16} className="text-gray-500" />
                  <span>Profile</span>
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors">
                  <Settings size={16} className="text-gray-500" />
                  <span>Settings</span>
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors">
                  <HelpCircle size={16} className="text-gray-500" />
                  <span>Help</span>
                </button>
                <div className="border-t border-gray-200"></div>
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors">
                  <LogOut size={16} className="text-gray-500" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;