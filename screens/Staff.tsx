
import React from 'react';
import Layout from '../components/Layout';
import { Screen, StaffMember } from '../types';

interface StaffProps {
  onNavigate: (screen: Screen) => void;
}

const Staff: React.FC<StaffProps> = ({ onNavigate }) => {
  const staff: StaffMember[] = [
    { id: '1', name: 'Jane Cooper', role: 'Store Manager', access: 'FULL ADMIN', status: 'ACTIVE', avatar: 'https://picsum.photos/seed/jc/200' },
    { id: '2', name: 'Robert Fox', role: 'Sr. Cashier', access: 'POS ACCESS', status: 'ACTIVE', avatar: 'https://picsum.photos/seed/rf/200' },
    { id: '3', name: 'Cody Fisher', role: 'Floor Staff', access: 'LIMITED', status: 'INACTIVE', avatar: 'https://picsum.photos/seed/cf/200' },
    { id: '4', name: 'Esther Howard', role: 'Inventory Lead', access: 'FULL ADMIN', status: 'ACTIVE', avatar: 'https://picsum.photos/seed/eh/200' },
    { id: '5', name: 'Wade Warren', role: 'Security', access: 'BASIC', status: 'ACTIVE', avatar: 'https://picsum.photos/seed/ww/200' },
  ];

  return (
    <Layout 
      activeScreen={Screen.SETTINGS} 
      onNavigate={onNavigate} 
      title="Staff Directory"
      showBack
      onBack={() => onNavigate(Screen.OVERVIEW)}
      rightAction={<span className="material-symbols-outlined">search</span>}
    >
      <div className="p-4">
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Staff</p>
            <p className="text-3xl font-black text-primary">24</p>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Now</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-black">18</p>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search by name or role" 
            className="w-full h-12 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl pl-12 pr-4"
          />
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {['All Staff', 'Managers', 'Cashiers', 'Support'].map((f, i) => (
            <button key={f} className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border ${i === 0 ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
              {f}
            </button>
          ))}
        </div>

        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Team Members</h3>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden divide-y divide-gray-50 dark:divide-gray-700 shadow-sm">
          {staff.map((m) => (
            <div key={m.id} className="p-4 flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-full bg-gray-100 bg-cover shrink-0 border-2 border-white shadow-sm"
                style={{ backgroundImage: `url('${m.avatar}')` }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg leading-tight">{m.name}</p>
                <p className="text-xs text-gray-400 font-bold flex items-center gap-1 uppercase">
                  {m.role} • <span className="text-primary">{m.access}</span>
                </p>
              </div>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${m.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
