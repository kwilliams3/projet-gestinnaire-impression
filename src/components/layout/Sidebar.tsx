import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Printer, 
  Users, 
  Truck, 
  Bell, 
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  LogOut,
  Package,
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  count?: number;
  subItems?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const navItems: NavItem[] = [
    { 
      label: 'Dashboard', 
      path: '/', 
      icon: <LayoutDashboard className="text-indigo-400" size={20} /> 
    },
    { 
      label: 'File d\'impression', 
      path: '/queue', 
      icon: <Printer className="text-blue-400" size={20} />, 
      count: 5 
    },
    { 
      label: 'Commandes', 
      path: '/orders', 
      icon: <Package className="text-cyan-400" size={20} />,
      subItems: [
        { 
          label: 'Nouvelles', 
          path: '/orders/new', 
          icon: <FileText className="text-cyan-300" size={16} /> 
        },
        { 
          label: 'En traitement', 
          path: '/orders/processing', 
          icon: <Clock className="text-amber-300" size={16} /> 
        },
        { 
          label: 'Terminées', 
          path: '/orders/completed', 
          icon: <CheckCircle className="text-emerald-400" size={16} /> 
        },
      ]
    },
    { 
      label: 'Clients', 
      path: '/clients', 
      icon: <Users className="text-purple-400" size={20} /> 
    },
    { 
      label: 'Livraison', 
      path: '/delivery', 
      icon: <Truck className="text-amber-400" size={20} /> 
    },
    { 
      label: 'Notifications', 
      path: '/notifications', 
      icon: <Bell className="text-pink-400" size={20} />, 
      count: 3 
    },
    { 
      label: 'Paramètres', 
      path: '/settings', 
      icon: <Settings className="text-gray-300" size={20} /> 
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleItemExpand = (path: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const isItemActive = (path: string) => {
    return location.pathname === path || 
           (navItems.find(item => item.subItems?.some(sub => sub.path === location.pathname))?.path === path);
  };

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-gray-800 text-indigo-400 shadow-lg hover:bg-gray-700 transition-all duration-300"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-20"
          onClick={toggleSidebar}
        />
      )}

      <aside 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed top-0 left-0 z-20 h-full w-64 bg-gray-900 border-r border-gray-800 shadow-2xl transition-transform duration-300 ease-in-out ${className}`}
      >
        <div className="p-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Printer className="mr-2 text-indigo-400" size={24} />
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              PrintMaster Pro
            </span>
          </h2>
        </div>

        <nav className="mt-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <div className="flex flex-col">
                  <Link
                    to={item.path}
                    className={`
                      flex items-center justify-between w-full px-4 py-2.5 text-gray-300
                      hover:bg-gray-800 hover:text-white rounded-lg transition-all
                      duration-200 ${isItemActive(item.path) ? 'bg-gray-800 text-white' : ''}
                    `}
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        toggleItemExpand(item.path);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center min-w-0">
                      <span className={`flex-shrink-0 w-5 ${isItemActive(item.path) ? 'text-white' : ''}`}>
                        {item.icon}
                      </span>
                      <span className="ml-3 truncate">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      {item.count && (
                        <span className="bg-indigo-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                          {item.count}
                        </span>
                      )}
                      {item.subItems && (
                        expandedItems[item.path] ? 
                        <ChevronUp className="text-gray-400 flex-shrink-0" size={16} /> : 
                        <ChevronDown className="text-gray-400 flex-shrink-0" size={16} />
                      )}
                    </div>
                  </Link>

                  {item.subItems && expandedItems[item.path] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`
                            flex items-center w-full pl-3 pr-2 py-2 text-sm text-gray-400
                            hover:bg-gray-800 hover:text-white rounded-lg transition-colors
                            duration-200 ${location.pathname === subItem.path ? 'bg-gray-800 text-white' : ''}
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="flex-shrink-0 w-5 flex justify-center mr-2.5">
                            {subItem.icon}
                          </span>
                          <span className="truncate flex-1">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-5 border-t border-gray-800 space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-lg">
              AU
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@printmaster.com</p>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-800">
            <button className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors text-sm">
              <HelpCircle className="mr-2" size={16} />
              Aide
            </button>
            <button className="flex items-center text-gray-400 hover:text-pink-400 transition-colors text-sm">
              <LogOut className="mr-2" size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;