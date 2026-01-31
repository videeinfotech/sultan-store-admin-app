
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.tsx';
import { Screen } from '../types.ts';
import { storeAdminApi, formatPrice } from '../api.ts';
import { RevenueAreaChart, OrderVolumeBarChart } from '../components/Charts.tsx';

interface OverviewProps {
  onNavigate: (screen: Screen) => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('today');
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await storeAdminApi.getDashboard(`?period=${period}`);
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch store dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [period]);

  const stats = data?.stats || {
    total_revenue: 0,
    revenue_change: 0,
    total_orders: 0,
    orders_change: 0,
    total_inventory: 0,
    avg_order_value: 0
  };

  const periods = [
    { label: 'Today', value: 'today', icon: 'today' },
    { label: 'Last 7 Days', value: 'last_7_days', icon: 'calendar_view_week' },
    { label: 'Last 30 Days', value: 'last_30_days', icon: 'calendar_month' },
    { label: 'This Month', value: 'this_month', icon: 'event_repeat' }
  ];

  const kpis = [
    { title: "Revenue", value: formatPrice(stats.total_revenue), change: stats.revenue_change >= 0 ? `+${stats.revenue_change}%` : `${stats.revenue_change}%`, icon: "payments", color: stats.revenue_change >= 0 ? "text-primary" : "text-red-500" },
    { title: "Total Orders", value: stats.total_orders.toString(), change: stats.orders_change >= 0 ? `+${stats.orders_change}%` : `${stats.orders_change}%`, icon: "shopping_bag", color: stats.orders_change >= 0 ? "text-primary" : "text-red-500" },
    { title: "Inventory", value: stats.total_inventory.toLocaleString(), alert: null, icon: "inventory_2", color: "text-orange-500" },
    { title: "Avg Order", value: formatPrice(stats.avg_order_value), icon: "trending_up", color: "text-green-500" }
  ];

  if (loading && !data) {
    return (
      <Layout activeScreen={Screen.OVERVIEW} onNavigate={onNavigate} title="Loading...">
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      activeScreen={Screen.OVERVIEW}
      onNavigate={onNavigate}
      title={data?.user?.store?.name || "Store Admin"}
      rightAction={
        <button
          onClick={() => setShowCalendar(true)}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-100 flex items-center justify-center active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
        </button>
      }
    >
      <div className="px-4">
        {/* Current Period Display */}
        <div className="pt-4 flex items-center justify-between">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">
            Viewing: <span className="text-primary">{periods.find(p => p.value === period)?.label}</span>
          </p>
          <div className={`px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 ${stats.revenue_change >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            <span className="material-symbols-outlined text-[12px]">{stats.revenue_change >= 0 ? 'trending_up' : 'trending_down'}</span> {Math.abs(stats.revenue_change)}%
          </div>
        </div>

        {/* Date Filter Quick Access */}
        <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
          {periods.slice(0, 2).map((item) => (
            <button
              key={item.value}
              onClick={() => setPeriod(item.value)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${period === item.value ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
                }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setShowCalendar(true)}
            className="px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center gap-2"
          >
            More <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          {kpis.map((kpi) => (
            <div key={kpi.title} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-2">
                <span className={`material-symbols-outlined ${kpi.color}`}>{kpi.icon}</span>
                {kpi.change && <span className={`text-[10px] font-bold ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{kpi.change}</span>}
              </div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">{kpi.title}</p>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Sales Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-4 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Sales Performance</h3>
          </div>
          <div className="mb-4">
            <p className="text-xs text-gray-400 font-medium">Total for {periods.find(p => p.value === period)?.label}</p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{formatPrice(stats.total_revenue)}</p>
          </div>
          <RevenueAreaChart data={data?.sales_trend} />
        </div>

        {/* Order Volume Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Order Volume</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Live Updates</span>
          </div>
          <OrderVolumeBarChart data={data?.order_volume} />
        </div>

        <div className="text-center pb-12">
          <p className="text-xs text-gray-400 font-medium italic">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Calendar Selection Sheet */}
      {showCalendar && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[100] animate-in fade-in duration-300" onClick={() => setShowCalendar(false)} />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white dark:bg-gray-900 rounded-t-[32px] z-[101] p-8 pb-12 animate-in slide-in-from-bottom duration-500 shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-8" />
            <h3 className="text-xl font-black mb-6">Select Reporting Period</h3>
            <div className="space-y-3">
              {periods.map((p) => (
                <button
                  key={p.value}
                  onClick={() => { setPeriod(p.value); setShowCalendar(false); }}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all active:scale-[0.98] ${period === p.value
                      ? 'bg-primary/5 border-primary text-primary'
                      : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined">{p.icon}</span>
                    <span className="font-bold">{p.label}</span>
                  </div>
                  {period === p.value && <span className="material-symbols-outlined">check_circle</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Overview;
