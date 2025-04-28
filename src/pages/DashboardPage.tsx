import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { 
  FaDollarSign, 
  FaPrint, 
  FaUserFriends, 
  FaFileAlt, 
  FaChartLine, 
  FaCalendarAlt, 
  FaBoxOpen,
  FaArrowUp
} from 'react-icons/fa';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardPage: React.FC = () => {
  const revenueData = {
    total: 1250000,
    change: 8.5,
    isPositive: true,
  };

  const stats = {
    impressions: { count: 324, change: 12.3, isPositive: true },
    clients: { count: 28, change: 5.2, isPositive: true },
    documents: { count: 156, change: -3.4, isPositive: false },
  };

  const revenueOverTimeData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Revenus (XAF)',
        data: [50000, 80000, 120000, 60000, 90000, 30000, 110000],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const impressionsData = {
    labels: ['Noir & Blanc', 'Couleur'],
    datasets: [
      {
        data: [1500, 800],
        backgroundColor: ['rgba(31, 41, 55, 0.9)', 'rgba(99, 102, 241, 0.9)'],
        borderColor: ['rgba(31, 41, 55, 1)', 'rgba(99, 102, 241, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#E5E7EB',
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            return `${context.parsed.y.toLocaleString()} XAF`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          callback: (value: any) => {
            return `${(value / 1000)}k`;
          }
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
  };

  const impressionsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#E5E7EB',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((context.raw / total) * 100);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    },
  };

  const orders = [
    { id: 'CMD-2023-056', client: 'Entreprise ABC', amount: 125000, status: 'Livré', date: '12/06/2023' },
    { id: 'CMD-2023-057', client: 'Université XYZ', amount: 85500, status: 'En cours', date: '10/06/2023' },
    { id: 'CMD-2023-058', client: 'Société XYZ', amount: 150000, status: 'Terminé', date: '08/06/2023' },
  ];

  const statusStyles: { [key: string]: string } = {
    'Livré': 'bg-green-100 text-green-800',
    'En cours': 'bg-yellow-100 text-yellow-800',
    'Terminé': 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
        <div className="flex items-center mt-2">
          <p className="text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-2 text-indigo-500" />
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-indigo-600 to-indigo-500 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Revenus Totaux</p>
              <p className="text-2xl font-bold mt-2">{`${revenueData.total.toLocaleString()} XAF`}</p>
              <div className={`flex items-center mt-2 ${revenueData.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                <span className="text-sm font-medium">
                  {revenueData.isPositive ? '+' : ''}{revenueData.change}%
                </span>
                <FaArrowUp className={`w-3 h-3 ml-2 ${!revenueData.isPositive && 'transform rotate-180'}`} />
                <span className="text-xs ml-1 text-indigo-100">vs semaine dernière</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <FaDollarSign className="text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Impressions Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-blue-100 text-sm font-medium">Impressions</p>
              <p className="text-2xl font-bold mt-2">{stats.impressions.count}</p>
              <div className={`flex items-center mt-2 ${stats.impressions.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                <span className="text-sm font-medium">
                  {stats.impressions.isPositive ? '+' : ''}{stats.impressions.change}%
                </span>
                <FaArrowUp className={`w-3 h-3 ml-2 ${!stats.impressions.isPositive && 'transform rotate-180'}`} />
                <span className="text-xs ml-1 text-blue-100">vs semaine dernière</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <FaPrint className="text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Clients Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-purple-600 to-purple-500 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-purple-100 text-sm font-medium">Clients Actifs</p>
              <p className="text-2xl font-bold mt-2">{stats.clients.count}</p>
              <div className={`flex items-center mt-2 ${stats.clients.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                <span className="text-sm font-medium">
                  {stats.clients.isPositive ? '+' : ''}{stats.clients.change}%
                </span>
                <FaArrowUp className={`w-3 h-3 ml-2 ${!stats.clients.isPositive && 'transform rotate-180'}`} />
                <span className="text-xs ml-1 text-purple-100">vs semaine dernière</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <FaUserFriends className="text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Documents Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-red-600 to-red-500 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-red-100 text-sm font-medium">Documents</p>
              <p className="text-2xl font-bold mt-2">{stats.documents.count}</p>
              <div className={`flex items-center mt-2 ${stats.documents.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                <span className="text-sm font-medium">
                  {stats.documents.isPositive ? '+' : ''}{stats.documents.change}%
                </span>
                <FaArrowUp className={`w-3 h-3 ml-2 ${!stats.documents.isPositive && 'transform rotate-180'}`} />
                <span className="text-xs ml-1 text-red-100">vs semaine dernière</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <FaFileAlt className="text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart - takes 2/3 space */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaChartLine className="mr-3 text-indigo-500" />
              Revenus Hebdomadaires
            </h2>
          </div>
          <div className="h-80">
            <Bar data={revenueOverTimeData} options={revenueOptions} />
          </div>
        </div>

        {/* Impressions Chart - takes 1/3 space */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaBoxOpen className="mr-3 text-indigo-500" />
              Impressions Hebdomadaires
            </h2>
          </div>
          <div className="h-80">
            <Doughnut data={impressionsData} options={impressionsOptions} />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Commandes Récentes</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            Voir tout <FaArrowUp className="ml-1 transform rotate-90" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-indigo-600">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.amount.toLocaleString()} XAF</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;