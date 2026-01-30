
import React from 'react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeScreen, 
  onNavigate, 
  title, 
  showBack, 
  onBack,
  rightAction 
}) => {
  const navItems = [
    { id: Screen.OVERVIEW, label: 'Overview', icon: 'dashboard' },
    { id: Screen.ORDERS, label: 'Orders', icon: 'list_alt' },
    { id: Screen.INVENTORY, label: 'Inventory', icon: 'inventory' },
    { id: Screen.CUSTOMERS, label: 'Customers', icon: 'groups' },
    { id: Screen.SETTINGS, label: 'Settings', icon: 'settings' }
  ];

  const hideNav = [Screen.LOGIN, Screen.ORDER_DETAIL, Screen.INVENTORY_DETAIL].includes(activeScreen);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 ios-blur border-b border-[#dbdfe6] dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between h-10">
          <div className="w-10">
            {showBack && (
              <button onClick={onBack} className="flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined text-gray-900 dark:text-white">arrow_back_ios</span>
              </button>
            )}
          </div>
          <h1 className="text-gray-900 dark:text-white text-lg font-bold truncate px-2">{title}</h1>
          <div className="w-10 flex justify-end">
            {rightAction || <div />}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className={`flex-1 overflow-y-auto no-scrollbar pb-24 ${hideNav ? 'pb-0' : ''}`}>
        {children}
      </main>

      {/* Bottom Nav */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-[#dbdfe6] dark:border-gray-800 pb-8 pt-2 px-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 min-w-[64px] transition-all ${
                  activeScreen === item.id 
                    ? 'text-primary' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <span className={`material-symbols-outlined ${activeScreen === item.id ? 'font-bold scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
