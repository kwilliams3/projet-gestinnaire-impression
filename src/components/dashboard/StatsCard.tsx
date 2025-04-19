import React from 'react';
import { 
  FileText, 
  Printer, 
  PackageCheck, 
  Truck, 
  Clock 
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  type: 'documents' | 'printing' | 'ready' | 'delivered' | 'pending';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, type, trend }) => {
  const getIcon = () => {
    switch (type) {
      case 'documents':
        return <FileText size={24} className="text-blue-500" />;
      case 'printing':
        return <Printer size={24} className="text-indigo-500" />;
      case 'ready':
        return <PackageCheck size={24} className="text-green-500" />;
      case 'delivered':
        return <Truck size={24} className="text-teal-500" />;
      case 'pending':
        return <Clock size={24} className="text-amber-500" />;
      default:
        return <FileText size={24} className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'documents':
        return 'bg-blue-50';
      case 'printing':
        return 'bg-indigo-50';
      case 'ready':
        return 'bg-green-50';
      case 'delivered':
        return 'bg-teal-50';
      case 'pending':
        return 'bg-amber-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">
                {trend.isPositive ? '↑' : '↓'}
              </span>
              <span>{trend.value}% from last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${getBgColor()}`}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;