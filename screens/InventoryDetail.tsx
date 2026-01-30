
import React from 'react';

interface InventoryDetailProps {
  itemId: string | null;
  onBack: () => void;
}

const InventoryDetail: React.FC<InventoryDetailProps> = ({ itemId, onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 ios-blur border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-10">Inventory Detail</h2>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="p-4">
          <div 
            className="w-full aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-sm bg-cover mb-[-40px] relative z-0"
            style={{ backgroundImage: `url('https://picsum.photos/seed/detail/600')` }}
          />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-t-[40px] pt-8 px-6 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-b border-gray-50 dark:border-gray-800">
          <div className="text-center pb-6">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">SKU: SK-8842-BN</span>
            <h1 className="text-4xl font-black mb-2">142 Units</h1>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold">
              <span className="material-symbols-outlined text-[16px]">sync</span>
              Current Stock • Last updated 2 mins ago
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Stock Movement History</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase">View Only</span>
          </div>

          <div className="space-y-4">
            {[
              { type: 'add', units: '+25 Units', label: 'Restock from Warehouse', time: 'Today, 14:30', color: 'bg-green-100 text-green-600', icon: 'add_circle' },
              { type: 'remove', units: '-2 Units', label: 'Sale via POS System #04', time: 'Today, 12:15', color: 'bg-red-100 text-red-600', icon: 'remove_circle' },
              { type: 'remove', units: '-1 Unit', label: 'Sale via POS System #02', time: 'Today, 09:45', color: 'bg-red-100 text-red-600', icon: 'remove_circle' },
              { type: 'edit', units: '+12 Units', label: 'Manual Adjustment', time: 'Oct 23, 17:05', color: 'bg-primary/10 text-primary', icon: 'edit_square' },
              { type: 'return', units: '+1 Unit', label: 'Customer Return', time: 'Oct 23, 11:20', color: 'bg-blue-100 text-blue-600', icon: 'keyboard_return' }
            ].map((entry, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${entry.color}`}>
                  <span className="material-symbols-outlined">{entry.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{entry.units}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">{entry.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{entry.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InventoryDetail;
