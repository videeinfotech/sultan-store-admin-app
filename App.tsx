
import React, { useState, useCallback } from 'react';
import { Screen } from './types.ts';
import Login from './screens/Login.tsx';
import Overview from './screens/Overview.tsx';
import Orders from './screens/Orders.tsx';
import OrderDetail from './screens/OrderDetail.tsx';
import Inventory from './screens/Inventory.tsx';
import InventoryDetail from './screens/InventoryDetail.tsx';
import Customers from './screens/Customers.tsx';
import Staff from './screens/Staff.tsx';
import Settings from './screens/Settings.tsx';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedInventoryId, setSelectedInventoryId] = useState<string | null>(null);

  const navigate = useCallback((screen: Screen, id?: string) => {
    if (id) {
      if (screen === Screen.ORDER_DETAIL) setSelectedOrderId(id);
      if (screen === Screen.INVENTORY_DETAIL) setSelectedInventoryId(id);
    }
    setCurrentScreen(screen);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LOGIN:
        return <Login onLogin={() => navigate(Screen.OVERVIEW)} />;
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="mx-auto max-w-[430px] min-h-screen bg-white dark:bg-background-dark shadow-2xl overflow-hidden flex flex-col relative">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
