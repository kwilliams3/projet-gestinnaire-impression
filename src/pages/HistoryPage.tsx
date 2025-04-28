import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Printer, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

// Données mock pour les commandes
const mockOrders = [
  {
    id: 'CMD-2025-001',
    date: '15/04/2025',
    file: 'rapport_final.pdf',
    details: '24 pages, 2 copies',
    status: 'completed',
    amount: 1850,
    client: 'Jean Dupont',
    delivery: '18/04/2025'
  },
  {
    id: 'CMD-2025-002',
    date: '12/04/2025',
    file: 'affiche_conférence.png',
    details: '1 page, 50 copies',
    status: 'production',
    amount: 7500,
    client: 'Marie Lambert',
    delivery: '20/04/2025'
  },
  {
    id: 'CMD-2025-003',
    date: '10/04/2025',
    file: 'catalogue_produits.pdf',
    details: '32 pages, 10 copies',
    status: 'pending',
    amount: 4200,
    client: 'Lucie Martin',
    delivery: '15/04/2025'
  }
];

const statusMap = {
  completed: { text: 'Terminé', color: 'bg-green-100 text-green-800', icon: <CheckCircle size={16} /> },
  production: { text: 'En production', color: 'bg-blue-100 text-blue-800', icon: <Printer size={16} /> },
  pending: { text: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={16} /> },
  cancelled: { text: 'Annulé', color: 'bg-red-100 text-red-800', icon: <XCircle size={16} /> }
};

const OrderHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.file.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-'));
    } else {
      return new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-'));
    }
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Historique des Commandes</h1>
        <p className="text-gray-600">Retrouvez l'ensemble des commandes passées par vos clients</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Barre de recherche et filtres */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Terminé</option>
              <option value="production">En production</option>
              <option value="pending">En attente</option>
              <option value="cancelled">Annulé</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
            </select>
          </div>
        </div>

        {/* Tableau des commandes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">Commande</th>
                <th className="px-6 py-3">Fichier</th>
                <th className="px-6 py-3">Détails</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3 text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FileText size={18} className="text-blue-500 mr-2" />
                        <span>{order.file}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{order.details}</td>
                    <td className="px-6 py-4 text-gray-600">{order.client}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusMap[order.status].color}`}>
                        {statusMap[order.status].icon}
                        <span className="ml-1.5">{statusMap[order.status].text}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">
                      {order.amount.toLocaleString('fr-FR')} fcfa
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6} className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
                      Livraison prévue: {order.delivery}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 px-4 py-3 bg-gray-50 rounded-b-lg">
          <div className="text-sm text-gray-500">
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">{sortedOrders.length}</span> sur{' '}
            <span className="font-medium">{sortedOrders.length}</span> commandes
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;