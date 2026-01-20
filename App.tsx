import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CourseCard from './components/CourseCard';
import MaterialsDrawer from './components/MaterialsDrawer';
import TeachingModeOverlay from './components/TeachingModeOverlay';
import { CoursePlan, MaterialItem } from './types';
import { 
  CloudDownload, 
  UserCheck, 
  ClipboardList, 
  Star, 
  FileBarChart, 
  MessageSquare, 
  PieChart, 
  Settings, 
  Headphones, 
  BookOpen
} from 'lucide-react';

const mockPlans: CoursePlan[] = [
  {
    id: '1',
    time: '9:00',
    endTime: '9:45',
    title: '奥数金牌辅导巧解方程小班课',
    status: 'pending',
    subject: '数学',
    grade: '小学一年级',
    type: '一对多',
    mode: '线下面授',
    location: '新加坡乌敏岛401 Havelock Rd',
    classroom: '03课堂',
    teacherCount: 2,
    studentCount: 12,
    materialCount: 31,
    homeworkCount: 4,
    videoCount: 8,
    commentCount: 2,
  },
  {
    id: '2',
    time: '9:00',
    endTime: '9:45',
    title: '奥数金牌辅导巧解方程小班课',
    status: 'ongoing',
    subject: '数学',
    grade: '小学一年级',
    type: '一对多',
    mode: '线下面授',
    location: '新加坡乌敏岛401 Havelock Rd',
    classroom: '03课堂',
    teacherCount: 2,
    studentCount: 12,
    materialCount: 31,
    homeworkCount: 4,
    videoCount: 8,
    commentCount: 2,
  },
  {
    id: '3',
    time: '9:00',
    endTime: '9:45',
    title: '奥数金牌辅导巧解方程小班课',
    status: 'completed',
    subject: '数学',
    grade: '小学一年级',
    type: '一对多',
    mode: '线下面授',
    location: '新加坡乌敏岛401 Havelock Rd',
    classroom: '03课堂',
    teacherCount: 2,
    studentCount: 12,
    materialCount: 31,
    homeworkCount: 4,
    videoCount: 8,
    commentCount: 2,
  },
];

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [teachingMode, setTeachingMode] = useState<{ isOpen: boolean, title: string, materials: MaterialItem[] }>({
    isOpen: false,
    title: '',
    materials: []
  });

  const handleStartTeaching = (title: string, materials: MaterialItem[]) => {
    setTeachingMode({
      isOpen: true,
      title,
      materials
    });
    setIsDrawerOpen(false); // Close drawer when starting class
  };

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden text-slate-700">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 bg-white m-2 rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-6">
          {/* Institution Header */}
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">学</span>
                </div>
                <h1 className="text-lg font-bold flex items-center gap-1">
                  学而思辅导机构
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </h1>
             </div>
             <div className="flex items-center gap-4 text-slate-400">
               <MessageSquare className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
               <Settings className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
               <Headphones className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
             </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center border-b border-slate-100 mb-6 pb-2 gap-8 text-sm font-medium">
            <span className="text-slate-900 border-b-2 border-slate-900 pb-2 cursor-pointer">课程管理</span>
            <span className="text-slate-500 hover:text-slate-700 cursor-pointer">商品管理</span>
            <span className="text-slate-500 hover:text-slate-700 cursor-pointer">成员管理</span>
            <span className="text-slate-500 hover:text-slate-700 cursor-pointer">财务管理</span>
            <div className="flex-1"></div>
            <div className="flex items-center gap-2 text-slate-500">
              <PieChart className="w-4 h-4" />
              <span>数据看板</span>
              <div className="flex items-center gap-2 ml-4 px-2 py-1 rounded bg-slate-50 border border-slate-100">
                <img src="https://picsum.photos/seed/teacher/32/32" className="w-5 h-5 rounded-full" />
                <span className="text-xs">李四一老师</span>
              </div>
            </div>
          </div>

          {/* Sub Nav Tabs */}
          <div className="flex gap-4 mb-8">
            <button className="px-4 py-1 rounded-md bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100">课程履约</button>
            <button className="px-4 py-1 rounded-md bg-white text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors">课程课表</button>
            <button className="px-4 py-1 rounded-md bg-white text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors">订单排课</button>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
            >
              <div className="relative">
                <CloudDownload className="w-7 h-7 text-slate-400 group-hover:text-blue-500" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium text-slate-600">资料</span>
            </button>
            
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:bg-slate-50 transition-all cursor-pointer">
              <UserCheck className="w-7 h-7 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">考勤</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:bg-slate-50 transition-all cursor-pointer">
              <ClipboardList className="w-7 h-7 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">作业</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:bg-slate-50 transition-all cursor-pointer">
              <div className="relative">
                <Star className="w-7 h-7 text-slate-400" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium text-slate-600">评价与风采</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:bg-slate-50 transition-all cursor-pointer">
              <FileBarChart className="w-7 h-7 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">总结</span>
            </div>
          </div>

          {/* List Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-xs">
              <input 
                type="text" 
                placeholder="搜索标题" 
                className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <svg className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-4">
              {['负责人', '类型', '状态', '来源'].map(label => (
                <div key={label} className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                  {label}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ))}
            </div>
            <div className="flex-1"></div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-md shadow-blue-500/20">
              <span className="text-lg">+</span>
              创建计划
            </button>
          </div>

          {/* Course List */}
          <div className="space-y-4">
            {mockPlans.map(plan => (
              <CourseCard key={plan.id} plan={plan} />
            ))}
            <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-blue-600 font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
              <span className="text-xl">+</span>
              创建计划
            </button>
          </div>
        </div>
      </main>

      <MaterialsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onStartTeaching={handleStartTeaching}
      />

      <TeachingModeOverlay 
        isOpen={teachingMode.isOpen} 
        onClose={() => setTeachingMode(prev => ({ ...prev, isOpen: false }))}
        lessonTitle={teachingMode.title}
        materials={teachingMode.materials}
      />
    </div>
  );
};

export default App;
