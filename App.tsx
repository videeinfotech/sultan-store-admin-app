
import React, { useState, useCallback, useEffect } from 'react';
import { Screen } from './types.ts';
import { storeAdminApi } from './api.ts';
import Login from './screens/Login.tsx';
import Overview from './screens/Overview.tsx';
import Orders from './screens/Orders.tsx';
import OrderDetail from './screens/OrderDetail.tsx';
import Inventory from './screens/Inventory.tsx';
import InventoryDetail from './screens/InventoryDetail.tsx';
import Customers from './screens/Customers.tsx';
import Staff from './screens/Staff.tsx';
import Settings from './screens/Settings.tsx';
import { ToastProvider } from './components/Toast.tsx';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedInventoryId, setSelectedInventoryId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('store_admin_token');
      if (token) {
        try {
          const res = await storeAdminApi.getUser();
          if (res.success) {
            setUser(res.data.user);
            setCurrentScreen(Screen.OVERVIEW);
          } else {
            localStorage.removeItem('store_admin_token');
          }
        } catch (err) {
          localStorage.removeItem('store_admin_token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const navigate = useCallback((screen: Screen, id?: string) => {
    if (id) {
      if (screen === Screen.ORDER_DETAIL) setSelectedOrderId(id);
      if (screen === Screen.INVENTORY_DETAIL) setSelectedInventoryId(id);
    }

    if (screen === Screen.LOGIN) {
      localStorage.removeItem('store_admin_token');
      setUser(null);
    }

    setCurrentScreen(screen);
  }, []);

  const handleLogin = (userData: any, token: string) => {
    localStorage.setItem('store_admin_token', token);
    setUser(userData);
    setCurrentScreen(Screen.OVERVIEW);
  };

  const renderScreen = () => {
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    switch (currentScreen) {
      case Screen.LOGIN:
        return <Login onLogin={handleLogin} />;
      case Screen.OVERVIEW:
        return <Overview onNavigate={navigate} />;
      case Screen.ORDERS:
        return <Orders onNavigate={navigate} />;
      case Screen.ORDER_DETAIL:
        return <OrderDetail orderId={selectedOrderId} onBack={() => navigate(Screen.ORDERS)} />;
      case Screen.INVENTORY:
        return <Inventory onNavigate={navigate} />;
      case Screen.INVENTORY_DETAIL:
        return <InventoryDetail itemId={selectedInventoryId} onBack={() => navigate(Screen.INVENTORY)} />;
      case Screen.CUSTOMERS:
        return <Customers onNavigate={navigate} />;
      case Screen.STAFF:
        return <Staff onNavigate={navigate} />;
      case Screen.SETTINGS:
        return <Settings onNavigate={navigate} onLogout={() => navigate(Screen.LOGIN)} />;
      default:
        return <Overview onNavigate={navigate} />;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="mx-auto max-w-[430px] min-h-screen bg-white dark:bg-background-dark shadow-2xl overflow-hidden flex flex-col relative">
          {renderScreen()}
        </div>
      </div>
    </ToastProvider>
  );
};

export default App;
