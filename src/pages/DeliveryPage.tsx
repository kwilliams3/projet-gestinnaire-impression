import React, { useState, lazy, Suspense } from 'react';
import { mockOrders } from '../data/mockData';
import { Truck, MapPin, Calendar, CheckCircle, Package } from 'lucide-react';

// Chargement lazy avec Suspense pour la carte
const CityMap = lazy(() => import('../components/CityMap'));

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
    inTransit: 2,
    delivered: deliveryOrders.filter(order => order.status === 'delivered').length
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Livraisons</h1>
          <p className="text-gray-500">Suivi et gestion des livraisons clients</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors flex items-center gap-1.5">
          <Calendar size={18} />
          Planifier des Livraisons
        </button>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Package, value: deliveryStats.pending, label: "En Attente", color: "blue" },
          { icon: Truck, value: deliveryStats.inTransit, label: "En Transit", color: "amber" },
          { icon: CheckCircle, value: deliveryStats.delivered, label: "Livrés", color: "green" }
        ].map((stat, index) => (
          <div key={index} className={`bg-white p-4 rounded-lg shadow border-l-4 border-${stat.color}-500 hover:shadow-md transition-shadow`}>
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full bg-${stat.color}-50`}>
                <stat.icon size={20} className={`text-${stat.color}-500`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Contenu principal */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Onglets */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {['list', 'map'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab(tab as 'list' | 'map')}
              >
                {tab === 'list' ? 'Liste des Livraisons' : 'Vue Carte'}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Contenu des onglets */}
        <div className="p-0">
          {activeTab === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-3">N° Commande</th>
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Document</th>
                    <th className="px-6 py-3">Statut</th>
                    <th className="px-6 py-3">Adresse</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium">#{order.id}</td>
                      <td className="px-6 py-4">{order.clientName}</td>
                      <td className="px-6 py-4">{order.documentType}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status === 'delivered' ? 'Livré' : 'Prêt'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-gray-400" />
                          {order.deliveryAddress || 'Non spécifiée'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {order.completedAt ? new Date(order.completedAt).toLocaleDateString('fr-FR') : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className={`px-3 py-1 rounded text-sm ${
                          order.status !== 'delivered'
                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}>
                          {order.status !== 'delivered' ? 'Marquer Livré' : 'Détails'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4">
              <div className="rounded-lg overflow-hidden border border-gray-200 h-[500px] relative">
                <Suspense fallback={
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <p>Chargement de la carte de Douala...</p>
                  </div>
                }>
                  <CityMap city="Douala" />
                </Suspense>
              </div>
              <div className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                <MapPin size={16} className="text-blue-500" />
                <span>Visualisation des points de livraison dans la région de Douala</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;