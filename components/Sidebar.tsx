
import React from 'react';
import { MessageSquare, LayoutGrid, Users, User, ClipboardList, CheckSquare, Calendar, GraduationCap, Settings, PlayCircle, MoreHorizontal } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <MessageSquare size={20} />, label: '消息' },
    { icon: <LayoutGrid size={20} />, label: '工作台', active: true },
    { icon: <img src="https://picsum.photos/seed/ai/40/40" className="w-6 h-6 rounded-full" />, label: 'VIVI AI' },
    { icon: <Users size={20} />, label: '通讯录' },
    { icon: <User size={20} />, label: '我的' },
  ];

  const bottomItems = [
    { icon: <GraduationCap size={20} /> },
    { icon: <CheckSquare size={20} /> },
    { icon: <Calendar size={20} /> },
    { icon: <Settings size={20} /> },
    { icon: <PlayCircle size={20} /> },
    { icon: <MoreHorizontal size={20} /> },
  ];

  return (
    <aside className="w-16 flex flex-col items-center py-4 bg-[#f0f2f5] gap-4">
      <div className="w-10 h-10 rounded-full overflow-hidden mb-2 ring-2 ring-white">
        <img src="https://picsum.photos/seed/profile/80/80" alt="Profile" />
      </div>
      
      <div className="flex flex-col gap-4 flex-1">
        {menuItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center group cursor-pointer">
            <div className={`p-2 rounded-xl transition-all ${item.active ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'}`}>
              {item.icon}
            </div>
            <span className={`text-[10px] mt-1 ${item.active ? 'text-blue-600 font-medium' : 'text-slate-500'}`}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 text-slate-400 mb-4">
        {bottomItems.map((item, idx) => (
          <div key={idx} className="cursor-pointer hover:text-slate-600 transition-colors">
            {item.icon}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
