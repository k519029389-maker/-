import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  X, Search, Plus, ChevronRight, FileText, Play, Music, 
  BookOpen, Folder, Layout, Sparkles, Send, 
  Filter, FileType2, Presentation, FileEdit, Clock,
  ChevronDown, Cloud, HardDrive, List, Calendar as CalendarIcon,
  ChevronLeft, Image as ImageIcon, FileQuestion, Zap,
  Wand2, Upload, BrainCircuit, MessageSquare, CheckCircle2,
  ChevronUp, FolderPlus, MoreVertical, ChevronRight as ChevronRightIcon,
  Home, User, MonitorPlay
} from 'lucide-react';
import { MaterialItem, TeachingFolder, MaterialCategory } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartTeaching?: (title: string, materials: MaterialItem[]) => void;
}

// Netdisk style item structure
interface ExplorerItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  fileType?: MaterialCategory;
  size?: string;
  date: string;
  children?: ExplorerItem[];
}

// Define the ViewState interface to track navigation within the materials drawer
interface ViewState {
  title: string;
  type: 'files' | 'lessons' | 'ai-gen';
  id?: string;
}

const initialPublicMaterials: ExplorerItem[] = [
  {
    id: 'p1', name: '2024秋季教研素材', type: 'folder', date: '2024-11-10',
    children: [
      { id: 'p1-1', name: '数学组集体备课', type: 'folder', date: '2024-11-09', children: [
        { id: 'p1-1-1', name: '公开课课件-函数进阶.pptx', type: 'file', fileType: 'PPT', size: '12.4 MB', date: '2024-11-08' },
        { id: 'p1-1-2', name: '数学教案模板.docx', type: 'file', fileType: 'Word', size: '450 KB', date: '2024-11-07' },
      ]},
      { id: 'p1-2', name: '语文组课外阅读', type: 'folder', date: '2024-11-09', children: [] },
    ]
  },
  {
    id: 'p2', name: '官方高清素材库', type: 'folder', date: '2024-11-05',
    children: [
      { id: 'p2-1', name: '教学背景图.zip', type: 'file', fileType: 'Other', size: '156 MB', date: '2024-11-04' },
      { id: 'p2-2', name: '标准发音音频包', type: 'folder', date: '2024-11-03', children: [] },
    ]
  },
  { id: 'p3', name: '全校统一练习卷模板.pdf', type: 'file', fileType: 'TestPaper', size: '2.1 MB', date: '2024-11-01' },
];

const initialMineMaterials: ExplorerItem[] = [
  {
    id: 'm-f1', name: '我的私藏课件', type: 'folder', date: '2024-11-12',
    children: [
      { id: 'm-f1-1', name: '趣味数学竞赛题目.pptx', type: 'file', fileType: 'PPT', size: '8.2 MB', date: '2024-11-12' },
    ]
  },
  {
    id: 'm-f2', name: '教学总结存档', type: 'folder', date: '2024-11-11',
    children: [
      { id: 'm-f2-1', name: '2024上学期工作总结.docx', type: 'file', fileType: 'Word', size: '2.4 MB', date: '2024-11-10' },
    ]
  },
  { id: 'm-file1', name: '个人备课手册.pdf', type: 'file', fileType: 'TestPaper', size: '15.2 MB', date: '2024-11-10' },
];

const disciplines = [
  { id: 'd1', name: '数学', icon: 'H' },
  { id: 'd2', name: '语文', icon: '语' },
  { id: 'd3', name: '英语', icon: '英' },
  { id: 'd4', name: '物理', icon: '物' },
];

const grades = ['全部年级', '小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级'];

const scheduleMock = [
  { id: 'l1', time: '09:00', title: '奥数金牌辅导: 巧解方程', grade: '五年级', subject: '数学', materialCount: 6 },
  { id: 'l2', time: '10:30', title: '初中几何进阶: 三角形全等', grade: '初二', subject: '数学', materialCount: 3 },
  { id: 'l3', time: '14:00', title: '小学数感培养: 乘法分配律', grade: '三年级', subject: '数学', materialCount: 2 },
];

const courses: Record<string, TeachingFolder[]> = {
  'd1': [
    { id: 'c1', name: '奥数金牌辅导小班课', count: 24, type: 'course' },
    { id: 'c2', name: '初中数学几何进阶', count: 18, type: 'course' },
    { id: 'c3', name: '小学数感培养', count: 32, type: 'course' },
  ]
};

const mineCourses: Record<string, TeachingFolder[]> = {
  'd1': [
    { id: 'mc1', name: '我的奥数特训班', count: 12, type: 'course' },
    { id: 'mc2', name: '个性化数学提优课', count: 8, type: 'course' },
  ],
  'd2': [
    { id: 'mc3', name: '语文作文精讲', count: 15, type: 'course' },
  ]
};

const lessons: Record<string, TeachingFolder[]> = {
  'c1': [
    { id: 'l1', name: '第1课：巧解一元一次方程', count: 12, type: 'lesson' },
    { id: 'l2', name: '第2课：几何图形的平移', count: 4, type: 'lesson' },
    { id: 'l3', name: '第3课：数列找规律进阶', count: 6, type: 'lesson' },
  ],
  'mc1': [
    { id: 'l1', name: '第一阶段：基础方程', count: 6, type: 'lesson' },
    { id: 'l2', name: '第二阶段：应用题详解', count: 6, type: 'lesson' },
  ]
};

const lessonMaterials: Record<string, MaterialItem[]> = {
  'l1': [
    { id: 'm1', title: '巧解方程-课堂演示课件.pptx', date: '2024-11-01', size: '4.2 MB', type: 'PPT' },
    { id: 'm2', title: '一元一次方程-教师教案.docx', date: '2024-11-01', size: '1.1 MB', type: 'Word' },
    { id: 'm3', title: '单元阶段性检测A卷.pdf', date: '2024-11-05', size: '2.4 MB', type: 'TestPaper' },
    { id: 'm4', title: '每日一练：方程应用题.pdf', date: '2024-11-02', size: '850 KB', type: 'Homework' },
    { id: 'v1', title: '方程解法核心逻辑串讲', source: '名师精品课', date: '2024-10-20', type: 'Video', duration: '15:40' },
    { id: 'a1', title: '重点难点语音讲解 - 01', date: '2024-10-21', type: 'Audio', duration: '03:12' },
  ],
  'l2': [
    { id: 'm5', title: '几何平移概念讲解.pptx', date: '2024-11-02', size: '3.8 MB', type: 'PPT' },
    { id: 'm6', title: '平移课后巩固练习.pdf', date: '2024-11-02', size: '1.2 MB', type: 'Homework' },
  ],
  'l3': [
    { id: 'm7', title: '数列找规律进阶讲义.docx', date: '2024-11-03', size: '2.1 MB', type: 'Word' },
    { id: 'm8', title: '找规律综合测试卷.pdf', date: '2024-11-03', size: '1.9 MB', type: 'TestPaper' },
  ]
};

const MaterialsDrawer: React.FC<Props> = ({ isOpen, onClose, onStartTeaching }) => {
  const [activeTab, setActiveTab] = useState<'lesson' | 'space' | 'mine'>('space');
  const [spaceCategory, setSpaceCategory] = useState<'public' | 'courses'>('public');
  const [mineCategory, setMineCategory] = useState<'personal' | 'courses'>('personal');
  const [selectedDiscipline, setSelectedDiscipline] = useState(disciplines[0].id);
  const [selectedGrade, setSelectedGrade] = useState('全部年级');
  const [selectedDay, setSelectedDay] = useState(9);
  const [selectedAiTool, setSelectedAiTool] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(scheduleMock[0].id);
  
  // States for Public Materials
  const [publicFiles, setPublicFiles] = useState<ExplorerItem[]>(initialPublicMaterials);
  const [publicNavPath, setPublicNavPath] = useState<ExplorerItem[]>([]);

  // States for My Materials
  const [mineFiles, setMineFiles] = useState<ExplorerItem[]>(initialMineMaterials);
  const [mineNavPath, setMineNavPath] = useState<ExplorerItem[]>([]);

  // Stack of views.
  const [viewStack, setViewStack] = useState<ViewState[]>([]);

  const isSubPanel = viewStack.length > 0;
  const currentView = isSubPanel ? viewStack[viewStack.length - 1] : null;

  const pushView = (view: ViewState) => setViewStack([...viewStack, view]);
  const popView = () => setViewStack(viewStack.slice(0, -1));
  const resetStack = () => setViewStack([]);

  const handleTabChange = (tab: 'lesson' | 'space' | 'mine') => {
    setActiveTab(tab);
    resetStack();
    if (tab === 'space') setSpaceCategory('public');
    if (tab === 'mine') {
      setMineCategory('personal');
      setMineNavPath([]);
    }
  };

  const handleSpaceCategoryChange = (cat: 'public' | 'courses') => {
    setSpaceCategory(cat);
    resetStack();
    if (cat === 'public') setPublicNavPath([]);
  };

  const handleMineCategoryChange = (cat: 'personal' | 'courses') => {
    setMineCategory(cat);
    resetStack();
    if (cat === 'personal') setMineNavPath([]);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const getTypeStyle = (type: MaterialCategory | 'folder') => {
    if (type === 'folder') return { bg: 'bg-blue-50', text: 'text-blue-500', icon: <Folder size={20} /> };
    switch (type) {
      case 'PPT': return { bg: 'bg-orange-50', text: 'text-orange-500', icon: <Presentation size={20} /> };
      case 'Word': return { bg: 'bg-blue-50', text: 'text-blue-500', icon: <FileText size={20} /> };
      case 'TestPaper': return { bg: 'bg-purple-50', text: 'text-purple-500', icon: <FileType2 size={20} /> };
      case 'Homework': return { bg: 'bg-green-50', text: 'text-green-500', icon: <FileEdit size={20} /> };
      case 'Video': return { bg: 'bg-indigo-50', text: 'text-indigo-500', icon: <Play size={20} /> };
      case 'Audio': return { bg: 'bg-teal-50', text: 'text-teal-500', icon: <Music size={20} /> };
      case 'Image': return { bg: 'bg-pink-50', text: 'text-pink-500', icon: <ImageIcon size={20} /> };
      case 'Other': return { bg: 'bg-slate-50', text: 'text-slate-500', icon: <FileQuestion size={20} /> };
      default: return { bg: 'bg-slate-50', text: 'text-slate-500', icon: <FileText size={20} /> };
    }
  };

  // Helper to find folder in tree
  const findInTree = (nodes: ExplorerItem[], targetId: string): ExplorerItem | null => {
    for (const node of nodes) {
      if (node.id === targetId) return node;
      if (node.children) {
        const found = findInTree(node.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  // Memoized contents for current folder
  const currentPublicFiles = useMemo(() => {
    if (publicNavPath.length === 0) return publicFiles;
    const currentFolder = findInTree(publicFiles, publicNavPath[publicNavPath.length - 1].id);
    return currentFolder?.children || [];
  }, [publicNavPath, publicFiles]);

  const currentMineFiles = useMemo(() => {
    if (mineNavPath.length === 0) return mineFiles;
    const currentFolder = findInTree(mineFiles, mineNavPath[mineNavPath.length - 1].id);
    return currentFolder?.children || [];
  }, [mineNavPath, mineFiles]);

  const navigateToFolder = (item: ExplorerItem, isMine: boolean) => {
    if (isMine) setMineNavPath([...mineNavPath, item]);
    else setPublicNavPath([...publicNavPath, item]);
  };

  const jumpToBreadcrumb = (index: number, isMine: boolean) => {
    if (isMine) {
      if (index === -1) setMineNavPath([]);
      else setMineNavPath(mineNavPath.slice(0, index + 1));
    } else {
      if (index === -1) setPublicNavPath([]);
      else setPublicNavPath(publicNavPath.slice(0, index + 1));
    }
  };

  const handleCreateFolder = () => {
    const folderName = window.prompt('请输入文件夹名称', '新建文件夹');
    if (!folderName) return;

    const newFolder: ExplorerItem = {
      id: `new-${Date.now()}`,
      name: folderName,
      type: 'folder',
      date: new Date().toISOString().split('T')[0],
      children: []
    };

    const isMine = activeTab === 'mine' && mineCategory === 'personal';
    const navPath = isMine ? mineNavPath : publicNavPath;

    const updateTree = (nodes: ExplorerItem[]): ExplorerItem[] => {
      if (navPath.length === 0) return [...nodes, newFolder];
      const currentFolderId = navPath[navPath.length - 1].id;
      return nodes.map(node => {
        if (node.id === currentFolderId) return { ...node, children: [...(node.children || []), newFolder] };
        if (node.children) return { ...node, children: updateTree(node.children) };
        return node;
      });
    };

    if (activeTab === 'mine') setMineFiles(prev => updateTree(prev));
    else setPublicFiles(prev => updateTree(prev));
    showNotification(`已创建文件夹: ${folderName}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      
      {notification && (
        <div className="fixed top-20 right-8 z-[60] bg-slate-900 text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-right fade-in duration-300">
          <CheckCircle2 size={16} className="text-green-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      <div className={`relative w-[600px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {isSubPanel ? (
              <button onClick={popView} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                <ChevronLeft size={20} />
              </button>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
                <BookOpen size={20} />
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-slate-800 leading-tight">
                {isSubPanel ? currentView?.title : "教学资料"}
              </h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                {isSubPanel ? (currentView?.type === 'files' ? 'Resources List' : (currentView?.type === 'ai-gen' ? 'AI Assistant' : 'Catalogue')) : 'Materials Library'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        {!isSubPanel && (
          <div className="px-4 pt-4 bg-white z-10 border-b border-slate-50">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 flex items-center gap-4 p-1 bg-slate-100 rounded-xl">
                {(['lesson', 'space', 'mine'] as const).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {tab === 'lesson' ? '课时资料' : tab === 'space' ? '空间资料' : '我的资料'}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'space' && (
              <div className="flex items-center gap-6 pb-2 text-sm font-medium">
                <button 
                  onClick={() => handleSpaceCategoryChange('public')}
                  className={`flex items-center gap-1.5 pb-2 transition-all relative ${spaceCategory === 'public' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Cloud size={16} /> 公共资料
                  {spaceCategory === 'public' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>}
                </button>
                <button 
                  onClick={() => handleSpaceCategoryChange('courses')}
                  className={`flex items-center gap-1.5 pb-2 transition-all relative ${spaceCategory === 'courses' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Layout size={16} /> 课程资料
                  {spaceCategory === 'courses' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>}
                </button>
              </div>
            )}

            {activeTab === 'mine' && (
              <div className="flex items-center gap-6 pb-2 text-sm font-medium">
                <button 
                  onClick={() => handleMineCategoryChange('personal')}
                  className={`flex items-center gap-1.5 pb-2 transition-all relative ${mineCategory === 'personal' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <User size={16} /> 个人资料
                  {mineCategory === 'personal' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>}
                </button>
                <button 
                  onClick={() => handleMineCategoryChange('courses')}
                  className={`flex items-center gap-1.5 pb-2 transition-all relative ${mineCategory === 'courses' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Layout size={16} /> 我的课程资料
                  {mineCategory === 'courses' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex-1 flex overflow-hidden relative">
          {!isSubPanel && (
            ((activeTab === 'space' && spaceCategory === 'courses') || 
             (activeTab === 'mine' && mineCategory === 'courses'))
          ) && (
            <div className="w-20 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-4 gap-4 overflow-y-auto no-scrollbar text-center">
              {disciplines.map(d => (
                <button 
                  key={d.id}
                  onClick={() => { setSelectedDiscipline(d.id); resetStack(); }}
                  className="flex flex-col items-center gap-1 group w-full px-2"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all shadow-sm ${selectedDiscipline === d.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>
                    <span className="text-sm font-bold">{d.icon}</span>
                  </div>
                  <span className={`text-[11px] font-medium ${selectedDiscipline === d.id ? 'text-blue-600' : 'text-slate-500'}`}>{d.name}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 flex flex-col min-w-0">
            {/* Context Toolbar */}
            <div className="p-4 border-b border-slate-50 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input type="text" placeholder="搜索资源..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-200 transition-all shadow-inner" />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                </div>
                {currentView?.type !== 'ai-gen' && (
                  <div className="flex gap-2">
                    {!isSubPanel && (
                      ((activeTab === 'space' && spaceCategory === 'public') || (activeTab === 'mine' && mineCategory === 'personal'))
                    ) && (
                      <button 
                        onClick={handleCreateFolder}
                        className="flex items-center gap-1.5 px-3 py-2 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap"
                        title="新建文件夹"
                      >
                        <FolderPlus size={16} /> 新建
                      </button>
                    )}
                    <button className="flex items-center gap-1.5 px-3 py-2 text-blue-600 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors whitespace-nowrap">
                      <Plus size={16} /> 上传
                    </button>
                    <button onClick={() => pushView({ title: 'AI 辅助生成', type: 'ai-gen' })} className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-500/20">
                      <Zap size={16} fill="currentColor" /> AI 辅助
                    </button>
                  </div>
                )}
              </div>

              {/* Breadcrumbs */}
              {!isSubPanel && (
                ((activeTab === 'space' && spaceCategory === 'public') || (activeTab === 'mine' && mineCategory === 'personal'))
              ) && (
                <div className="flex items-center gap-1 text-[11px] overflow-hidden whitespace-nowrap">
                  <button onClick={() => jumpToBreadcrumb(-1, activeTab === 'mine')} className="p-1 text-slate-400 hover:text-blue-600 flex items-center gap-1">
                    {activeTab === 'mine' ? <User size={14} /> : <Home size={14} />} 
                    {activeTab === 'mine' ? '我的资料' : '全部资料'}
                  </button>
                  {(activeTab === 'mine' ? mineNavPath : publicNavPath).map((folder, idx) => (
                    <React.Fragment key={folder.id}>
                      <ChevronRightIcon size={12} className="text-slate-300" />
                      <button onClick={() => jumpToBreadcrumb(idx, activeTab === 'mine')} className={`px-1 py-0.5 rounded truncate max-w-[100px] ${idx === (activeTab === 'mine' ? mineNavPath : publicNavPath).length - 1 ? 'text-slate-800 font-bold' : 'text-slate-400 hover:text-blue-600'}`}>
                        {folder.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-4 pb-20">
              {isSubPanel && (
                <div className="space-y-3 h-full">
                   {currentView?.type === 'ai-gen' ? (
                     <div className="flex flex-col h-full space-y-6 pt-2">
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { id: 'gen-word', name: '教案生成', icon: <FileText size={24} />, color: 'text-blue-600', activeBorder: 'border-blue-500', activeBg: 'bg-blue-50/50' },
                            { id: 'gen-ppt', name: 'PPT 课件生成', icon: <Presentation size={24} />, color: 'text-orange-600', activeBorder: 'border-orange-500', activeBg: 'bg-orange-50/50' },
                            { id: 'gen-hw', name: '课后作业生成', icon: <FileEdit size={24} />, color: 'text-green-600', activeBorder: 'border-green-500', activeBg: 'bg-green-50/50' },
                            { id: 'gen-test', name: '试卷生成', icon: <FileType2 size={24} />, color: 'text-purple-600', activeBorder: 'border-purple-500', activeBg: 'bg-purple-50/50' },
                          ].map(tool => (
                            <button key={tool.id} onClick={() => setSelectedAiTool(tool.id)} className={`flex flex-col items-center gap-3 p-5 bg-white border ${selectedAiTool === tool.id ? `${tool.activeBorder} ${tool.activeBg} shadow-sm ring-1 ring-offset-0 ${tool.activeBorder.replace('border', 'ring')}` : 'border-slate-100'} rounded-2xl transition-all`}>
                               <div className={`${selectedAiTool === tool.id ? tool.color : 'text-slate-400'}`}>{tool.icon}</div>
                               <span className={`text-sm font-bold ${selectedAiTool === tool.id ? 'text-slate-800' : 'text-slate-500'}`}>{tool.name}</span>
                            </button>
                          ))}
                        </div>
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
                           <textarea placeholder="请输入生成要求..." className="w-full h-40 bg-white border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:border-blue-500 transition-all resize-none shadow-sm"></textarea>
                           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold">开始生成</button>
                        </div>
                     </div>
                   ) : (
                     <>
                      {currentView?.type === 'lessons' && (
                        <div className="grid grid-cols-2 gap-3">
                            {(lessons[currentView?.id || ''] || []).map(lesson => (
                              <div 
                                  key={lesson.id}
                                  onClick={() => pushView({ title: lesson.name, type: 'files', id: lesson.id })}
                                  className="group p-4 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer hover:bg-white hover:border-blue-200 hover:shadow-md transition-all"
                                >
                                  <div className="w-10 h-10 mb-3 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                                    <Folder size={20} className="fill-current" />
                                  </div>
                                  <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{lesson.name}</h4>
                                  <p className="text-[10px] text-slate-400">{lesson.count} 份资料</p>
                              </div>
                            ))}
                        </div>
                      )}
                      {currentView?.type === 'files' && (
                        <div className="space-y-3">
                            {(lessonMaterials[currentView?.id || ''] || []).map(material => {
                              const style = getTypeStyle(material.type);
                              return (
                                <div key={material.id} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 shadow-sm transition-all group">
                                  <div className={`w-10 h-10 ${style.bg} ${style.text} rounded-xl flex items-center justify-center flex-shrink-0`}>{style.icon}</div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate">{material.title}</p>
                                    <p className="text-[10px] text-slate-400">{material.size} • {material.date}</p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => showNotification('已推送')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Plus size={18} /></button>
                                    <button onClick={() => showNotification('已发送')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><MessageSquare size={16} /></button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                     </>
                   )}
                </div>
              )}

              {!isSubPanel && (
                <>
                  {/* EXPLORER VIEW (Shared for Public & Mine Personal) */}
                  {((activeTab === 'space' && spaceCategory === 'public') || (activeTab === 'mine' && mineCategory === 'personal')) && (
                    <div className="flex flex-col gap-2">
                       {(activeTab === 'mine' ? currentMineFiles : currentPublicFiles).length === 0 && (
                         <div className="py-32 flex flex-col items-center justify-center opacity-30">
                            <FolderPlus size={48} className="mb-2" />
                            <p className="text-sm">暂无内容</p>
                            <button onClick={handleCreateFolder} className="mt-4 text-xs text-blue-600 font-bold hover:underline">新建文件夹</button>
                         </div>
                       )}
                       {(activeTab === 'mine' ? currentMineFiles : currentPublicFiles).map(item => {
                         const style = getTypeStyle(item.type === 'folder' ? 'folder' : item.fileType || 'Other');
                         return (
                           <div 
                              key={item.id} 
                              onClick={() => item.type === 'folder' ? navigateToFolder(item, activeTab === 'mine') : null}
                              className={`flex items-center gap-4 p-3.5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group ${item.type === 'folder' ? 'cursor-pointer' : ''}`}
                           >
                              <div className={`w-11 h-11 ${style.bg} ${style.text} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                {item.type === 'folder' ? <Folder size={24} className="fill-current" /> : style.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-bold truncate transition-colors ${item.type === 'folder' ? 'text-slate-800 group-hover:text-blue-600' : 'text-slate-700'}`}>
                                  {item.name}
                                </h4>
                                <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                                  <span>{item.date}</span>
                                  {item.size && <span>{item.size}</span>}
                                  {item.type === 'folder' && <span>{item.children?.length || 0} 项内容</span>}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {item.type === 'file' ? (
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={(e) => {e.stopPropagation(); showNotification('已推送');}} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Plus size={18} /></button>
                                    <button onClick={(e) => {e.stopPropagation(); showNotification('已发送');}} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><MessageSquare size={16} /></button>
                                  </div>
                                ) : (
                                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                )}
                              </div>
                           </div>
                         );
                       })}
                    </div>
                  )}

                  {/* Lesson Materials (Accordion) */}
                  {activeTab === 'lesson' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 text-center">
                        {[7, 8, 9, 10, 11, 12, 13].map(d => (
                          <button key={d} onClick={() => setSelectedDay(d)} className={`flex flex-col items-center min-w-[50px] p-2 rounded-xl border ${selectedDay === d ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                            <span className="text-[10px] opacity-80">{d === 9 ? '今天' : `周${['日','一','二','三','四','五','六'][d%7]}`}</span>
                            <span className="text-sm font-bold">{d}</span>
                          </button>
                        ))}
                      </div>
                      {scheduleMock.map(lesson => (
                        <div key={lesson.id} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${expandedLessonId === lesson.id ? 'border-blue-400 shadow-xl shadow-blue-500/10' : 'border-slate-100'}`}>
                          <div 
                            onClick={() => setExpandedLessonId(expandedLessonId === lesson.id ? null : lesson.id)} 
                            className={`p-4 cursor-pointer flex items-center justify-between transition-colors ${expandedLessonId === lesson.id ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold ${expandedLessonId === lesson.id ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                <Clock size={16} /><span className="text-[10px]">{lesson.time}</span>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold">{lesson.title}</h4>
                                <span className="text-[10px] text-slate-400 font-medium uppercase">{lesson.subject} • {lesson.grade}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                               {expandedLessonId === lesson.id && (
                                 <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onStartTeaching?.(lesson.title, lessonMaterials['l1']);
                                  }}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all animate-in fade-in slide-in-from-right-2"
                                 >
                                   <MonitorPlay size={14} /> 开始上课
                                 </button>
                               )}
                               {expandedLessonId === lesson.id ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-slate-300" />}
                            </div>
                          </div>
                          {expandedLessonId === lesson.id && (
                            <div className="p-3 bg-white border-t border-slate-100 space-y-2 animate-in slide-in-from-top-2 duration-300">
                              {lessonMaterials['l1'].map(m => (
                                <div key={m.id} className="flex items-center gap-3 p-3 bg-white border border-slate-50 rounded-xl hover:border-blue-100 group/file transition-all">
                                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">{getTypeStyle(m.type).icon}</div>
                                  <div className="flex-1 truncate text-xs font-bold text-slate-700">{m.title}</div>
                                  <div className="flex items-center gap-1 opacity-0 group-hover/file:opacity-100 transition-opacity">
                                    <button onClick={(e) => {e.stopPropagation(); showNotification('已推送');}} className="text-blue-600 p-1 hover:bg-blue-50 rounded"><Plus size={16} /></button>
                                    <button onClick={(e) => {e.stopPropagation(); showNotification('已发送');}} className="text-emerald-600 p-1 hover:bg-emerald-50 rounded"><MessageSquare size={14} /></button>
                                  </div>
                                </div>
                              ))}
                              <button className="w-full py-2 border border-dashed border-slate-200 rounded-xl text-[10px] text-slate-400 font-bold hover:bg-slate-50 hover:border-blue-200 hover:text-blue-500 transition-all uppercase tracking-wider">+ Add Teaching Materials</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* COURSE CATALOGUE */}
                  {((activeTab === 'space' && spaceCategory === 'courses') || (activeTab === 'mine' && mineCategory === 'courses')) && (
                    <div className="grid grid-cols-2 gap-3">
                      {((activeTab === 'mine' ? mineCourses : courses)[selectedDiscipline] || []).map(course => (
                        <div key={course.id} onClick={() => pushView({ title: course.name, type: 'lessons', id: course.id })} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group">
                          <Folder size={24} className="text-blue-500 fill-current mb-2 opacity-80 group-hover:opacity-100" />
                          <h4 className="text-sm font-bold text-slate-800 truncate">{course.name}</h4>
                          <p className="text-[10px] text-slate-400">{course.count} 个课时</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer Prompt Input */}
        {!isSubPanel && (
          <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl pl-3 pr-1.5 py-1.5 group focus-within:bg-white focus-within:ring-2 ring-blue-500/10 transition-all">
              <Sparkles className="text-blue-500 w-5 h-5 mr-2" />
              <input type="text" placeholder="有问题随时问我，比如搜索“一元二次方程”的试卷..." className="flex-1 bg-transparent border-none text-sm outline-none placeholder:text-slate-400" />
              <button className="p-2 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialsDrawer;