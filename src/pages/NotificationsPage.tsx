import React from 'react';
import NotificationsList from '../components/notifications/NotificationsList';
import { mockNotifications } from '../data/mockData';
import { Bell, CheckCircle } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-500">Restez informé des alertes système et des nouvelles activités</p>
        </div>
        <button className="px-4 py-2 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center">
          <CheckCircle size={18} className="mr-1.5" />
          Marquer tout comme lu
        </button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Bell size={18} className="text-blue-500" />
          <span>Vous avez {unreadCount} notifications non lues</span>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <button className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full font-medium text-sm hover:bg-blue-100">
            Tout
          </button>
          <button className="px-4 py-1 text-gray-600 rounded-full font-medium text-sm hover:bg-gray-100">
            Non lues
          </button>
          <button className="px-4 py-1 text-gray-600 rounded-full font-medium text-sm hover:bg-gray-100">
            Système
          </button>
          <button className="px-4 py-1 text-gray-600 rounded-full font-medium text-sm hover:bg-gray-100">
            Emplois
          </button>
        </div>
        
        <NotificationsList notifications={mockNotifications} />
      </div>
    </div>
  );
};

export default NotificationsPage;