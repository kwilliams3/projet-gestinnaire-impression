import React from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaDollarSign, FaPrint, FaUserFriends, FaFileAlt, FaChartBar } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage: React.FC = () => {
  const revenueData = {
    total: 1250000,
    change: 8.5,
    isPositive: true,
  };

  const stats = {
    impressions: 324,
    clients: 28,
    documents: 156,
  };

  const dailyImpressionsData = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Impressions Noir sur Blanc',
        data: [120, 150, 100, 200, 170, 80, 60],
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'Impressions Couleur',
        data: [80, 120, 150, 90, 100, 130, 110],
        backgroundColor: 'rgba(255, 165, 0, 0.6)',
        borderColor: 'rgba(255, 165, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Impressions Quotidiennes de la Semaine',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre d\'Impressions',
        },
      },
    },
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord Administrateur</h1>
        <p className="text-gray-500">Vue d'ensemble des activités d'impression</p>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg text-white transition-transform duration-200 hover:scale-105">
          <div className="flex items-center">
            <FaDollarSign className="text-4xl mr-2" />
            <h2 className="text-lg font-semibold">Revenus Totaux</h2>
          </div>
          <p className="text-2xl font-bold">{`${revenueData.total.toLocaleString()} XAF`}</p>
          <p className={`text-sm ${revenueData.isPositive ? 'text-green-200' : 'text-red-200'}`}>
            Changement: {revenueData.change}%
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white transition-transform duration-200 hover:scale-105">
          <div className="flex items-center">
            <FaPrint className="text-4xl mr-2" />
            <h2 className="text-lg font-semibold">Impressions</h2>
          </div>
          <p className="text-2xl font-bold">{stats.impressions}</p>
          <p className="text-sm">Total cette semaine</p>
        </div>
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-lg shadow-lg text-white transition-transform duration-200 hover:scale-105">
          <div className="flex items-center">
            <FaUserFriends className="text-4xl mr-2" />
            <h2 className="text-lg font-semibold">Clients Actifs</h2>
          </div>
          <p className="text-2xl font-bold">{stats.clients}</p>
          <p className="text-sm">Clients ayant commandé</p>
        </div>
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg text-white transition-transform duration-200 hover:scale-105">
          <div className="flex items-center">
            <FaFileAlt className="text-4xl mr-2" />
            <h2 className="text-lg font-semibold">Documents Traités</h2>
          </div>
          <p className="text-2xl font-bold">{stats.documents}</p>
          <p className="text-sm">Documents imprimés</p>
        </div>
      </div>

      {/* Section Statistiques Impressions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des impressions quotidiennes */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Activité Récente</h2>
          <Bar data={dailyImpressionsData} options={options} />
        </div>

        {/* Statistiques des Impressions par Type */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaChartBar className="mr-2" />
            Statistiques des Impressions
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg shadow">
              <span className="text-green-800">Impressions Noir sur Blanc</span>
              <span className="font-bold text-green-800">1,500</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-orange-100 rounded-lg shadow">
              <span className="text-orange-800">Impressions Couleur</span>
              <span className="font-bold text-orange-800">800</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg shadow">
              <span className="text-blue-800">Total Impressions</span>
              <span className="font-bold text-blue-800">2,300</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des commandes récentes simplifié */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Commandes Récentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Commande</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant (XAF)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CMD-2023-056</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Entreprise ABC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">125,000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Livré
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CMD-2023-057</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Université XYZ</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85,500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    En cours
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CMD-2023-058</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Société XYZ</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">150,000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Terminé
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;