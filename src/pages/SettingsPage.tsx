import React from 'react';
import { mockStaff } from '../data/mockData';
import { Settings, Users, Printer, UserPlus, Edit, Trash2 } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage your account settings and system preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium text-gray-800">Settings</h3>
            </div>
            <div className="space-y-1 p-2">
              <button className="w-full flex items-center px-4 py-2 rounded-md text-left bg-blue-50 text-blue-700">
                <Users size={18} className="mr-3" />
                Team Management
              </button>
              <button className="w-full flex items-center px-4 py-2 rounded-md text-left text-gray-700 hover:bg-gray-50">
                <Printer size={18} className="mr-3" />
                Printer Settings
              </button>
              <button className="w-full flex items-center px-4 py-2 rounded-md text-left text-gray-700 hover:bg-gray-50">
                <Settings size={18} className="mr-3" />
                System Settings
              </button>
            </div>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-800">Team Management</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center">
                <UserPlus size={18} className="mr-1.5" />
                Add Member
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Manage your team members and their access permissions.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStaff.map((member) => (
                      <tr key={member.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{member.name}</td>
                        <td className="px-6 py-4 capitalize">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : member.role === 'operator'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">{member.email}</td>
                        <td className="px-6 py-4">{member.phone || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-3">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;