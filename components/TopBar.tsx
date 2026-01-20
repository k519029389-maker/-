
import React from 'react';
import { Search, Plus, LayoutGrid, Settings, Headphones, User, X } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100 bg-white">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        
        <div className="flex items-center h-8 bg-slate-50 rounded-lg px-2 border border-slate-200 group-within:ring-2 ring-blue-500/20 transition-all">
          <div className="flex items-center px-2 py-0.5 bg-white rounded shadow-sm text-xs font-medium text-slate-700 gap-1.5 border border-slate-100">
            <User size={12} className="text-blue-500" />
            我的
          </div>
          <div className="flex items-center px-2 py-0.5 ml-1 text-xs font-medium text-slate-500 gap-1.5">
            <GraduationCap size={12} className="text-purple-500" />
            教育
          </div>
          <div className="w-[1px] h-4 bg-slate-300 mx-2"></div>
          <Search size={14} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="搜索" 
            className="bg-transparent border-none text-sm outline-none w-64 placeholder:text-slate-400" 
          />
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700">
            <Plus size={14} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 text-slate-400">
        <LayoutGrid size={18} className="cursor-pointer hover:text-slate-600" />
        <Settings size={18} className="cursor-pointer hover:text-slate-600" />
        <Headphones size={18} className="cursor-pointer hover:text-slate-600" />
      </div>
    </div>
  );
};

const GraduationCap = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default TopBar;
