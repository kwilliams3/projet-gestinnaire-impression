import React, { useState } from 'react';
import { Bell, MessageSquare, User, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  userInitials?: string;
  unreadMessagesCount?: number;
  unreadNotificationsCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  userName = 'Admin User',
  userEmail = 'admin@example.com',
  userInitials = 'AU',
  unreadMessagesCount = 0,
  unreadNotificationsCount = 0,
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center border-b border-gray-200 w-full relative">
      {/* Message central agrandi et en gras */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenue, <span className="text-blue-600">{userName}</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-4 ml-auto">
        {/* Bouton Messages - renvoie vers le chat */}
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          onClick={() => navigate('/chat')}
        >
          <MessageSquare size={24} className="text-gray-700" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white text-sm rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
              {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Bouton Notifications - renvoie vers notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          onClick={() => navigate('/notifications')}
        >
          <Bell size={24} className="text-gray-700" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white text-sm rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
              {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
            </span>
          )}
        </button>
        
        {/* Menu Profil */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-sm text-lg">
              {userInitials}
            </div>
            <ChevronDown 
              size={20} 
              className={`text-gray-600 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-gray-200 overflow-hidden">
              <div className="p-3 border-b border-gray-200">
                <p className="font-medium text-gray-800 text-lg">{userName}</p>
                <p className="text-sm text-gray-600">{userEmail}</p>
              </div>
              <div className="py-1">
                <button 
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                  onClick={() => navigate('/profile')}
                >
                  <User size={18} className="text-gray-500" />
                  <span className="text-base">Profil</span>
                </button>
                <button 
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                  onClick={() => navigate('/settings')}
                >
                  <Settings size={18} className="text-gray-500" />
                  <span className="text-base">Paramètres</span>
                </button>
                <button 
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                  onClick={() => navigate('/help')}
                >
                  <HelpCircle size={18} className="text-gray-500" />
                  <span className="text-base">Aide</span>
                </button>
                <div className="border-t border-gray-200"></div>
                <button 
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                  onClick={() => navigate('/logout')}
                >
                  <LogOut size={18} className="text-gray-500" />
                  <span className="text-base">Déconnexion</span>
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