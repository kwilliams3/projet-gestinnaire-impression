import React from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import PrintQueueTable from '../components/dashboard/PrintQueueTable';
import RecentOrdersCard from '../components/dashboard/RecentOrdersCard';
import DeliveryStatusCard from '../components/dashboard/DeliveryStatusCard';
import { mockStats, mockPrintJobs, mockOrders } from '../data/mockData';

const DashboardPage: React.FC = () => {
  // Get only printing or pending jobs for the queue
  const activeJobs = mockPrintJobs.filter(
    job => job.status === 'printing' || job.status === 'pending'
  );
  
  // Get most recent 4 orders
  const recentOrders = [...mockOrders].sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
  ).slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's an overview of today's print operations.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Documents Today"
          value={mockStats.totalDocumentsToday}
          type="documents"
          description="Total documents received today"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Jobs"
          value={mockStats.activeJobs}
          type="printing"
          description="Currently in production"
        />
        <StatsCard
          title="Ready for Delivery"
          value={mockStats.readyForDelivery}
          type="ready"
          description="Completed, awaiting delivery"
        />
        <StatsCard
          title="Pending Validation"
          value={mockStats.pendingValidation}
          type="pending"
          description="Awaiting client approval"
        />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Print Queue</h2>
        <PrintQueueTable jobs={activeJobs} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrdersCard orders={recentOrders} />
        <DeliveryStatusCard orders={mockOrders} />
      </div>
    </div>
  );
};

export default DashboardPage;