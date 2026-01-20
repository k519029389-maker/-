
import React from 'react';
import { CoursePlan } from '../types';
// Added ClipboardList to the imports from lucide-react
import { Users, FileText, Layout, Video, MessageSquare, MapPin, Monitor, Calendar, Trash2, Edit2, Ban, Bookmark, ClipboardList } from 'lucide-react';

interface Props {
  plan: CoursePlan;
}

const CourseCard: React.FC<Props> = ({ plan }) => {
  const statusStyles = {
    pending: 'text-orange-500 bg-orange-50 border-orange-100',
    ongoing: 'text-blue-500 bg-blue-50 border-blue-100',
    completed: 'text-slate-400 bg-slate-50 border-slate-100',
  };

  const statusLabels = {
    pending: '待开始',
    ongoing: '进行中',
    completed: '已结束',
  };

  const accentColor = plan.status === 'pending' ? 'bg-orange-400' : plan.status === 'ongoing' ? 'bg-blue-500' : 'bg-slate-300';

  return (
    <div className="relative group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-6">
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${accentColor}`}></div>
      
      <div className="flex flex-col items-center min-w-[60px] pt-1">
        <span className="text-lg font-bold text-slate-800">{plan.time}</span>
        <div className="h-4 border-l border-slate-200 my-1"></div>
        <span className="text-xs text-slate-400">{plan.endTime}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-lg font-bold text-slate-800">{plan.title}</h3>
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${statusStyles[plan.status]}`}>
            {statusLabels[plan.status]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-xs text-slate-500">
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 flex items-center justify-center bg-slate-100 rounded text-slate-400">
               <span className="font-bold text-[8px]">H</span>
             </div>
             {plan.subject}
          </div>
          <div className="flex items-center gap-2">
             <GraduationCapIcon />
             {plan.grade}
          </div>
          <div className="flex items-center gap-2">
             <Users size={14} className="text-slate-400" />
             {plan.type}
          </div>
          <div className="flex items-center gap-2">
             <Monitor size={14} className="text-slate-400" />
             {plan.mode}
          </div>
          <div className="flex items-center gap-2 col-span-1">
             <MapPin size={14} className="text-slate-400" />
             {plan.location}
          </div>
          <div className="flex items-center gap-2">
             <Layout size={14} className="text-slate-400" />
             {plan.classroom}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <UserIcon size={14} />
            <span className="font-medium text-slate-700">{plan.teacherCount}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Users size={14} />
            <span className="font-medium text-slate-700">{plan.studentCount}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <FileText size={14} />
            <span className="font-medium text-slate-700">{plan.materialCount}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ClipboardList size={14} />
            <span className="font-medium text-slate-700">{plan.homeworkCount}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Video size={14} />
            <span className="font-medium text-slate-700">{plan.videoCount}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MessageSquare size={14} />
            <span className="font-medium text-slate-700">{plan.commentCount}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between py-1">
         <div className="flex gap-2 text-slate-300">
            <Calendar size={18} className="cursor-pointer hover:text-slate-500" />
            <Bookmark size={18} className="cursor-pointer hover:text-slate-500" />
            <Monitor size={18} className="cursor-pointer hover:text-slate-500" />
            <MessageSquare size={18} className="cursor-pointer hover:text-slate-500" />
         </div>
         <div className="flex gap-2 text-slate-300">
            <Edit2 size={18} className="cursor-pointer hover:text-slate-500" />
            <Ban size={18} className="cursor-pointer hover:text-slate-500" />
            <Trash2 size={18} className="cursor-pointer hover:text-slate-500" />
         </div>
      </div>
    </div>
  );
};

const GraduationCapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const UserIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default CourseCard;
