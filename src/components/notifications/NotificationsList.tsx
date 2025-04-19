import React from 'react';
import { Notification } from '../../types';
import { 
  AlertCircle, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Check
} from 'lucide-react';

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications }) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-amber-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{notification.message}</p>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                        <Check size={14} className="mr-1" />
                        Mark as read
                      </button>
                    )}
                    {notification.link && (
                      <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                        <ExternalLink size={14} className="mr-1" />
                        View details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;