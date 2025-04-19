import React from 'react';
import { Order } from '../../types';
import { ChevronRight, Clock, CheckCircle, Printer, Truck } from 'lucide-react';

interface RecentOrdersCardProps {
  orders: Order[];
}

const RecentOrdersCard: React.FC<RecentOrdersCardProps> = ({ orders }) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-amber-500" />;
      case 'printing':
        return <Printer size={16} className="text-blue-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'delivered':
        return <Truck size={16} className="text-teal-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Recent Orders</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          View All <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{order.clientName}</p>
                <p className="text-sm text-gray-500">{order.documentType} • {order.format}</p>
              </div>
              <div className="flex items-center">
                {getStatusIcon(order.status)}
                <span className="ml-1.5 text-sm capitalize">{order.status}</span>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Received: {new Date(order.receivedAt).toLocaleDateString()}</span>
              <span>{order.pages} pages</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrdersCard;