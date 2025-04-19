import React, { useState } from 'react';
import { PrintJob } from '../../types';
import { Clock, CheckCircle, Printer, Truck, MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';

interface PrintQueueTableProps {
  jobs: PrintJob[];
}

const PrintQueueTable: React.FC<PrintQueueTableProps> = ({ jobs }) => {
  const [sortField, setSortField] = useState<keyof PrintJob>('receivedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: keyof PrintJob) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortField === 'pages') {
      return sortDirection === 'asc' 
        ? a.pages - b.pages
        : b.pages - a.pages;
    }
    
    if (sortField === 'receivedAt') {
      return sortDirection === 'asc'
        ? new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
        : new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime();
    }
    
    // Default string comparison for other fields
    const aValue = a[sortField]?.toString() || '';
    const bValue = b[sortField]?.toString() || '';
    
    return sortDirection === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const getStatusIcon = (status: PrintJob['status']) => {
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

  const getPriorityBadge = (priority: PrintJob['priority']) => {
    switch (priority) {
      case 'high':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">High</span>;
      case 'medium':
        return <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">Medium</span>;
      case 'low':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Low</span>;
      default:
        return null;
    }
  };

  const SortIndicator = ({ field }: { field: keyof PrintJob }) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp size={16} className="ml-1" />
      : <ChevronDown size={16} className="ml-1" />;
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('clientName')}
              >
                Client
                <SortIndicator field="clientName" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('documentType')}
              >
                Document
                <SortIndicator field="documentType" />
              </button>
            </th>
            <th className="px-6 py-3">Format</th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('pages')}
              >
                Pages
                <SortIndicator field="pages" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('status')}
              >
                Status
                <SortIndicator field="status" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('priority')}
              >
                Priority
                <SortIndicator field="priority" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('receivedAt')}
              >
                Received
                <SortIndicator field="receivedAt" />
              </button>
            </th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map((job) => (
            <tr key={job.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{job.clientName}</td>
              <td className="px-6 py-4">{job.documentType}</td>
              <td className="px-6 py-4">{job.format}</td>
              <td className="px-6 py-4">{job.pages}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {getStatusIcon(job.status)}
                  <span className="ml-1.5 capitalize">{job.status}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                {getPriorityBadge(job.priority)}
              </td>
              <td className="px-6 py-4">
                {new Date(job.receivedAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintQueueTable;