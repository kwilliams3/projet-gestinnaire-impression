import React from 'react';
import { Order } from '../../types';
import { Truck, MapPin } from 'lucide-react';

interface DeliveryStatusCardProps {
  orders: Order[];
}

const DeliveryStatusCard: React.FC<DeliveryStatusCardProps> = ({ orders }) => {
  // Filter orders that are completed (ready for delivery) or being delivered
  const deliveryOrders = orders.filter(
    (order) => order.status === 'completed' || order.status === 'delivered'
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Delivery Status</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Map</button>
      </div>

      {deliveryOrders.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No deliveries scheduled
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {deliveryOrders.map((order) => (
            <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex justify-between">
                <div className="flex items-start">
                  <Truck size={20} className="text-blue-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">{order.clientName}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{order.deliveryAddress || 'No address provided'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`
                    px-2.5 py-1 rounded-full text-xs font-medium 
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                  `}>
                    {order.status === 'delivered' ? 'Delivered' : 'Ready for Delivery'}
                  </span>
                </div>
              </div>
              {order.status !== 'delivered' && (
                <div className="mt-3 flex justify-end space-x-2">
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-md">
                    Schedule
                  </button>
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs rounded-md">
                    Mark Delivered
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryStatusCard;