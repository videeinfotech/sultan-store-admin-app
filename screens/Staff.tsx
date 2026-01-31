
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.tsx';
import { Screen, StaffMember } from '../types.ts';
import { storeAdminApi } from '../api.ts';

interface StaffProps {
  onNavigate: (screen: Screen) => void;
}

const Staff: React.FC<StaffProps> = ({ onNavigate }) => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const res = await storeAdminApi.getStaff();
        if (res.success) {
          setStaff(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch staff directory', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

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
            <p className="text-3xl font-black text-primary">{staff.length}</p>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Now</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-black">{staff.filter(s => s.is_active).length}</p>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden divide-y divide-gray-50 dark:divide-gray-700 shadow-sm">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {staff.length === 0 ? (
                <div className="text-center p-12 text-gray-400 italic font-medium">No staff members found</div>
              ) : (
                staff.map((m) => (
                  <div key={m.id} className="p-4 flex items-center gap-4">
                    <img
                      src={m.avatar || 'https://picsum.photos/seed/jc/200'}
                      className="w-14 h-14 rounded-full bg-gray-100 shrink-0 border-2 border-white shadow-sm object-cover"
                      alt={m.name}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg leading-tight text-gray-900 dark:text-white truncate">{m.name}</p>
                      <p className="text-xs text-gray-400 font-bold flex items-center gap-1 uppercase">
                        {m.role || 'Staff'} • <span className="text-primary">{m.role === 'admin' ? 'FULL ADMIN' : 'POS ACCESS'}</span>
                      </p>
                      <p className="text-[10px] text-gray-300 font-medium truncate">{m.email}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${m.is_active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                      {m.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
