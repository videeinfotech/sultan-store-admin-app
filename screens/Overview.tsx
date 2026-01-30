
import React from 'react';
import Layout from '../components/Layout';
import { Screen } from '../types';
import { RevenueAreaChart, OrderVolumeBarChart } from '../components/Charts';

interface OverviewProps {
  onNavigate: (screen: Screen) => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const kpis = [
    { title: "Today's Revenue", value: "$1,240.00", change: "+12%", icon: "payments", color: "text-primary" },
    { title: "Today's Orders", value: "42", change: "+5%", icon: "shopping_bag", color: "text-primary" },
    { title: "Pending Orders", value: "8", change: "-2%", icon: "pending_actions", color: "text-red-500" },
    { title: "Low Stock", value: "3", alert: "Alert", icon: "inventory_2", color: "text-orange-500" }
  ];

  return (
    <Layout 
      activeScreen={Screen.OVERVIEW} 
      onNavigate={onNavigate}
      title="Downtown Branch"
      rightAction={
        <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-100 flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
        </button>
      }
    >
      <div className="px-4">
        {/* Date Filter */}
        <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
          {['Today', 'Yesterday', '7 Days', 'Monthly'].map((filter, i) => (
            <button 
              key={filter}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                i === 0 ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          {kpis.map((kpi) => (
            <div key={kpi.title} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className={`material-symbols-outlined ${kpi.color}`}>{kpi.icon}</span>
                {kpi.change && <span className="text-[10px] font-bold text-green-600">{kpi.change}</span>}
                {kpi.alert && <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full">Alert</span>}
              </div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">{kpi.title}</p>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Sales Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Sales Performance</h3>
            <div className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 12.5%
            </div>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-400 font-medium">Total for selected period</p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">$1,240.00</p>
          </div>
          <RevenueAreaChart />
        </div>

        {/* Order Volume Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Order Volume</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Live Updates</span>
          </div>
          <OrderVolumeBarChart />
        </div>

        <div className="text-center pb-12">
          <p className="text-xs text-gray-400 font-medium italic">Last updated: Today at 2:45 PM</p>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
