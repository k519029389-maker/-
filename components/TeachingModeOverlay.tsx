import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, PenTool, MousePointer2, 
  Eraser, Maximize2, Minimize2, Play, Pause, 
  Volume2, Settings, Users, Clock, LayoutGrid,
  FileText, Presentation, PlayCircle, Music, Image as ImageIcon
} from 'lucide-react';
import { MaterialItem, MaterialCategory } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  materials: MaterialItem[];
}

const TeachingModeOverlay: React.FC<Props> = ({ isOpen, onClose, lessonTitle, materials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTool, setActiveTool] = useState<'pointer' | 'pen' | 'eraser'>('pointer');
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isOpen) {
      interval = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    } else {
      setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentMaterial = materials[currentIndex];
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderContent = () => {
    if (!currentMaterial) return null;

    switch (currentMaterial.type) {
      case 'PPT':
      case 'Image':
        return (
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="w-[90%] aspect-video bg-white shadow-2xl rounded-lg flex items-center justify-center overflow-hidden">
               <div className="text-slate-800 text-4xl font-bold opacity-20 select-none">
                 {currentMaterial.title} 内容预览
               </div>
               {/* 这里将来会渲染实际的 PPT Canvas 或图片 */}
            </div>
          </div>
        );
      case 'Video':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[85%] aspect-video bg-black rounded-xl overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                 <PlayCircle size={80} className="text-white opacity-40 group-hover:opacity-80 transition-opacity cursor-pointer" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-1 bg-white/30 rounded-full mb-4">
                  <div className="h-full bg-blue-500 w-1/3"></div>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <Play size={20} fill="currentColor" />
                    <span className="text-sm">05:20 / {currentMaterial.duration || '15:40'}</span>
                  </div>
                  <Volume2 size={20} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center text-white gap-6">
            <div className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center">
               <FileText size={64} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold">{currentMaterial.title}</h3>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all">
              立即打开文档
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="w-[1px] h-6 bg-white/10"></div>
          <div>
            <h1 className="text-white font-bold">{lessonTitle}</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">In Progress • Teaching Mode</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={16} />
            <span className="text-sm font-mono">{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Users size={16} />
            <span className="text-sm font-medium">12 位学生已上线</span>
          </div>
          <button onClick={onClose} className="px-4 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all">
            结束教学
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Resources Explorer */}
        <div className="w-64 bg-slate-900/30 border-r border-white/5 flex flex-col p-4 gap-3 overflow-y-auto no-scrollbar">
           <h4 className="text-[10px] font-bold text-slate-500 uppercase px-2 mb-2">课件清单 ({materials.length})</h4>
           {materials.map((m, idx) => (
             <button 
               key={m.id}
               onClick={() => setCurrentIndex(idx)}
               className={`flex items-center gap-3 p-3 rounded-xl transition-all border ${currentIndex === idx ? 'bg-blue-600/10 border-blue-500 text-white' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
             >
               <div className={`p-2 rounded-lg ${currentIndex === idx ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                 {m.type === 'PPT' && <Presentation size={16} />}
                 {m.type === 'Video' && <PlayCircle size={16} />}
                 {m.type === 'Audio' && <Music size={16} />}
                 {m.type === 'Image' && <ImageIcon size={16} />}
                 {(m.type === 'Word' || m.type === 'TestPaper' || m.type === 'Homework') && <FileText size={16} />}
               </div>
               <span className="text-xs font-medium truncate flex-1 text-left">{m.title}</span>
             </button>
           ))}
        </div>

        {/* Workspace */}
        <div className="flex-1 relative flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
           {renderContent()}

           {/* Floating Toolbar */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-slate-800/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
                <button 
                  onClick={() => setActiveTool('pointer')}
                  className={`p-3 rounded-xl transition-all ${activeTool === 'pointer' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
                >
                  <MousePointer2 size={20} />
                </button>
                <button 
                  onClick={() => setActiveTool('pen')}
                  className={`p-3 rounded-xl transition-all ${activeTool === 'pen' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
                >
                  <PenTool size={20} />
                </button>
                <button 
                  onClick={() => setActiveTool('eraser')}
                  className={`p-3 rounded-xl transition-all ${activeTool === 'eraser' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
                >
                  <Eraser size={20} />
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="p-3 text-slate-400 hover:bg-white/5 disabled:opacity-20 rounded-xl"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="px-3 text-sm font-bold text-white min-w-[60px] text-center">
                  {currentIndex + 1} / {materials.length}
                </div>
                <button 
                  disabled={currentIndex === materials.length - 1}
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="p-3 text-slate-400 hover:bg-white/5 disabled:opacity-20 rounded-xl"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

              <button className="p-3 text-slate-400 hover:bg-white/5 rounded-xl">
                <Maximize2 size={20} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const ArrowLeft = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

export default TeachingModeOverlay;
