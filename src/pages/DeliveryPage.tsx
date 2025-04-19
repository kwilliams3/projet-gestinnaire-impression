import React, { useState } from 'react';
import { mockOrders } from '../data/mockData';
import { Truck, MapPin, Calendar, CheckCircle, Package } from 'lucide-react';

interface DeliveryStatus {
  pending: number;
  inTransit: number;
  delivered: number;
}

const DeliveryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');
  
  const deliveryOrders = mockOrders.filter(
    order => order.status === 'completed' || order.status === 'delivered'
  );
  
  const deliveryStats: DeliveryStatus = {
    pending: deliveryOrders.filter(order => order.status === 'completed').length,
    inTransit: 2, // Mock data
    delivered: deliveryOrders.filter(order => order.status === 'delivered').length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Delivery Management</h1>
          <p className="text-gray-500">Track and manage deliveries to clients</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center">
          <Calendar size={18} className="mr-1.5" />
          Schedule Deliveries
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
          <div className="p-3 rounded-full bg-blue-50 mr-4">
            <Package size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Delivery</p>
            <p className="text-2xl font-bold">{deliveryStats.pending}</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
          <div className="p-3 rounded-full bg-amber-50 mr-4">
            <Truck size={24} className="text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">In Transit</p>
            <p className="text-2xl font-bold">{deliveryStats.inTransit}</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
          <div className="p-3 rounded-full bg-green-50 mr-4">
            <CheckCircle size={24} className="text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivered Today</p>
            <p className="text-2xl font-bold">{deliveryStats.delivered}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === 'list' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('list')}
            >
              Delivery List
            </button>
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === 'map' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('map')}
            >
              Map View
            </button>
          </div>
        </div>
        
        {activeTab === 'list' ? (
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Document</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Completed Date</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryOrders.map((order) => (
                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">{order.clientName}</td>
                      <td className="px-6 py-4">{order.documentType}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status === 'delivered' ? 'Delivered' : 'Ready for Delivery'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MapPin size={16} className="text-gray-400 mr-1" />
                          {order.deliveryAddress || 'No address provided'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {order.completedAt ? new Date(order.completedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {order.status !== 'delivered' ? (
                          <button className="text-blue-600 hover:underline">
                            Mark Delivered
                          </button>
                        ) : (
                          <button className="text-gray-600 hover:underline">
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Map view would display here with delivery locations</p>
                <p className="text-gray-400 text-sm">This is a placeholder for the map interface</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPage;