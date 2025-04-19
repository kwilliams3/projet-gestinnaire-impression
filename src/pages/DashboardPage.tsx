import React, { useState, useEffect } from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import PrintQueueTable from '../components/dashboard/PrintQueueTable';
import RecentOrdersCard from '../components/dashboard/RecentOrdersCard';
import DeliveryStatusCard from '../components/dashboard/DeliveryStatusCard';
import { mockStats, mockPrintJobs, mockOrders } from '../data/mockData';
import { 
  Printer, Clock, CheckCircle, AlertCircle, Truck, 
  FileText, RefreshCw, Plus, BarChart2, Download,
  Zap, Circle, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Simulate data loading
    const loadData = () => {
      setIsRefreshing(true);
      setTimeout(() => {
        setActiveJobs(
          mockPrintJobs.filter(job => job.status === 'printing' || job.status === 'pending')
        );
        setRecentOrders(
          [...mockOrders]
            .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
            .slice(0, 4)
        );
        setIsRefreshing(false);
        setTime(new Date());
      }, 800);
    };

    loadData();
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    // Simulate refresh
    setIsRefreshing(true);
    setTimeout(() => {
      setTime(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Animated Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/70"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg mr-4">
                <Printer className="text-indigo-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Production Dashboard
                </h1>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Real-time monitoring of your print operations
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
            >
              <RefreshCw className={`text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} size={18} />
              <span className="text-sm font-medium text-gray-700">Refresh</span>
            </motion.button>
            <div className="flex items-center space-x-2 bg-indigo-100/80 px-4 py-2 rounded-xl">
              <Clock className="text-indigo-600" size={18} />
              <span className="text-sm font-medium text-indigo-600">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Grid with Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <StatsCard
          title="Documents Today"
          value={mockStats.totalDocumentsToday}
          icon={<FileText className="text-blue-500" size={20} />}
          description="Total received"
          trend={{ value: 12, isPositive: true }}
          color="blue"
          delay={0.3}
        />
        <StatsCard
          title="Active Jobs"
          value={mockStats.activeJobs}
          icon={<Printer className="text-amber-500" size={20} />}
          description="In production"
          trend={{ value: 3, isPositive: false }}
          color="amber"
          delay={0.4}
        />
        <StatsCard
          title="Ready for Delivery"
          value={mockStats.readyForDelivery}
          icon={<Truck className="text-emerald-500" size={20} />}
          description="Awaiting dispatch"
          trend={{ value: 5, isPositive: true }}
          color="emerald"
          delay={0.5}
        />
        <StatsCard
          title="Pending Approval"
          value={mockStats.pendingValidation}
          icon={<AlertCircle className="text-purple-500" size={20} />}
          description="Client validation"
          trend={{ value: 2, isPositive: false }}
          color="purple"
          delay={0.6}
        />
      </motion.div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Print Queue Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200/70"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center mb-3 sm:mb-0">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <Printer className="text-indigo-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Print Queue
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {activeJobs.length} Active Jobs
              </span>
              <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View all <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
          <PrintQueueTable jobs={activeJobs} />
        </motion.div>
        
        {/* Right Sidebar */}
        <div className="space-y-5">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <RecentOrdersCard orders={recentOrders} />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <DeliveryStatusCard orders={mockOrders} />
          </motion.div>
          
          {/* Quick Actions Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200/70"
          >
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Zap className="text-amber-500 mr-2" size={20} />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.button 
                whileHover={{ y: -2 }}
                className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <Plus className="text-blue-600 mb-2" size={20} />
                <span className="text-sm font-medium text-blue-700">New Job</span>
              </motion.button>
              <motion.button 
                whileHover={{ y: -2 }}
                className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
              >
                <BarChart2 className="text-purple-600 mb-2" size={20} />
                <span className="text-sm font-medium text-purple-700">Reports</span>
              </motion.button>
              <motion.button 
                whileHover={{ y: -2 }}
                className="flex flex-col items-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                <Download className="text-emerald-600 mb-2" size={20} />
                <span className="text-sm font-medium text-emerald-700">Export</span>
              </motion.button>
              <motion.button 
                whileHover={{ y: -2 }}
                className="flex flex-col items-center p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors"
              >
                <AlertCircle className="text-amber-600 mb-2" size={20} />
                <span className="text-sm font-medium text-amber-700">Alerts</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* System Status Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200/70 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Circle className="text-emerald-500 mr-2" size={12} fill="currentColor" />
            <span className="text-sm font-medium text-gray-700">
              System Status: <span className="text-emerald-600">All systems operational</span>
            </span>
          </div>
          <span className="hidden md:inline-block text-xs text-gray-500">
            Last system check: {time.toLocaleTimeString()}
          </span>
        </div>
        <div className="flex space-x-3">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-all"
          >
            Generate Report
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            New Print Job
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;