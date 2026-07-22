import React, { useState } from 'react';
import { SidebarNavigationSection } from '../../components/SidebarNavigationSection';
import TaskFilterSection from './TaskFilterSection';
import TaskManagementSection from './TaskManagementSection';
import AddTaskModal from './AddITaskModals';
import TaskSetupTab from './TaskSetupTab';           // Integrated Basis Image component
import ReviewSubmissionsTab from './ReviewSubmissionsTab'; // Integrated Review Submissions component
import { useAuth } from '../../hooks/useAuth';
import type { Task } from '../../types/task';
import { ListTree, Upload, CheckCircle } from 'lucide-react';

const MOCK_GYM_TASKS: Task[] = [
  {
    _id: '1',
    title: 'Sanitize Powerlifting Benches and Barbells',
    description: 'Wipe down all benches, racks, and knurling with disinfectant spray after peak hours.',
    area: 'Powerlifting Area',
    priority: 'High',
    frequency: 'Daily',
    dayType: 'Monday',
    startTime: '08:00',
    endTime: '09:00',
    isBreak: false,
    isArchived: false,
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'Inspect CrossFit Rig Bolts and Pull-up Bars',
    description: 'Check structural stability and tightness of bolts across the main rig framework.',
    area: 'CrossFit Area',
    priority: 'Medium',
    frequency: 'Weekly',
    dayType: 'Tuesday',
    startTime: '09:00',
    endTime: '10:30',
    isBreak: false,
    isArchived: false,
    createdAt: '2026-05-02T00:00:00.000Z',
    updatedAt: '2026-05-02T00:00:00.000Z',
  },
];

export const TaskManagementPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_GYM_TASKS);
  const [loading] = useState(false);
  const { role } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'tasks' | 'uploadBasis' | 'reviewSubmission'>('tasks');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All Areas');

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedTaskForQR, setSelectedTaskForQR] = useState<Task | null>(null);
  
  // Shared state for basis images across tabs if needed
  const [basisImages, setBasisImages] = useState<Record<string, any>>({});

  const checklistItems = [
    { id: 1, text: 'Check cable machine tension and alignment' },
    { id: 2, text: 'Inspect weight stack pins for damage' },
    { id: 3, text: 'Clean and sanitize equipment surfaces' },
    { id: 4, text: 'Check floor matting for wear and tear' },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesFrequency = frequencyFilter === 'All' ? true : task.frequency === frequencyFilter;
    const matchesArea = areaFilter === 'All Areas' ? true : task.area === areaFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFrequency && matchesArea && matchesSearch;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTaskForQR(task);
    setIsQRModalOpen(true);
  };

  const handleDownloadQR = () => {
    if (!selectedTaskForQR) return;
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><rect width="24" height="24" fill="#fff"/><text x="2" y="12" font-size="3" fill="#000">QR: ${selectedTaskForQR.area}</text></svg>`;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QR-${selectedTaskForQR.area.replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <SidebarNavigationSection userRole={(role ?? 'custodian') as 'admin' | 'custodian'} />
      <main className="flex-1 w-full overflow-hidden">
        <div className="p-8 max-w-[1600px] mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage master configurations, reference images, and submission reviews.</p>
            </div>

            <div className="flex bg-gray-200/70 p-1.5 rounded-2xl gap-1">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'tasks' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ListTree size={18} />
                <span>Master Tasks</span>
              </button>
              
              <button
                onClick={() => setActiveTab('uploadBasis')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'uploadBasis' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Upload size={18} />
                <span>Upload Basis Image</span>
              </button>

              <button
                onClick={() => setActiveTab('reviewSubmission')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'reviewSubmission' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CheckCircle size={18} />
                <span>Review Submission</span>
              </button>
            </div>
          </div>

          {/* TAB CONTENT 1: MASTER TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-8">
              <TaskFilterSection 
                onAddTask={() => setIsModalOpen(true)}
                showAddButton={true}
                hideStatus={true}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                frequencyFilter={frequencyFilter}
                setFrequencyFilter={setFrequencyFilter}
                areaFilter={areaFilter}
                setAreaFilter={setAreaFilter}
                statusFilter="" 
                setStatusFilter={() => {}}
              />

              <div 
                onClick={(e) => {
                  const rowElement = (e.target as HTMLElement).closest('tr, [class*="task"], [class*="flex"]');
                  if (rowElement) {
                    const matchedTask = filteredTasks.find(t => 
                      rowElement.textContent?.includes(t.title) || rowElement.textContent?.includes(t.area)
                    );
                    if (matchedTask) {
                      handleTaskClick(matchedTask);
                    }
                  }
                }}
                className="cursor-pointer [&_*]:cursor-pointer"
              >
                <TaskManagementSection 
                  tasks={filteredTasks} 
                  onArchive={(id) => setTasks(prev => prev.filter(t => t._id !== id))} 
                  loading={loading} 
                  onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }} 
                />
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: UPLOAD BASIS IMAGE PAGE */}
          {activeTab === 'uploadBasis' && (
            <TaskSetupTab />
          )}

          {/* TAB CONTENT 3: REVIEW SUBMISSION PAGE */}
          {activeTab === 'reviewSubmission' && (
            <ReviewSubmissionsTab basisImages={basisImages} />
          )}
        </div>

        <AddTaskModal 
          isOpen={isModalOpen} 
          onClose={() => { setEditingTask(null); setIsModalOpen(false); }} 
          onCreate={async (newTaskData) => {
            if (editingTask) {
              setTasks(prev => prev.map(t => t._id === editingTask._id ? { ...t, ...newTaskData } as Task : t));
            } else {
              const created: Task = {
                _id: Date.now().toString(),
                title: newTaskData.title || 'New Task',
                description: newTaskData.description || '',
                area: newTaskData.area || 'General',
                priority: newTaskData.priority || 'Medium',
                frequency: newTaskData.frequency || 'Daily',
                dayType: newTaskData.dayType || 'Monday',
                startTime: newTaskData.startTime || '08:00',
                endTime: newTaskData.endTime || '09:00',
                isBreak: false,
                isArchived: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              setTasks(prev => [created, ...prev]);
            }
            setIsModalOpen(false);
          }}
          onSuccess={() => {}}
          initialData={editingTask}
        />

        {isQRModalOpen && selectedTaskForQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-xl transform transition-all max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTaskForQR.title}</h3>
                  <p className="text-sm text-indigo-600 font-medium">Location: {selectedTaskForQR.area}</p>
                </div>
                <button 
                  onClick={() => setIsQRModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold px-2"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Task Checklist Details</h4>
                <div className="space-y-2">
                  {checklistItems.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center space-x-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                      <span className="text-sm font-medium text-gray-800">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-3 py-2 border-t pt-4">
                <div className="w-32 h-32 border-4 border-gray-900 rounded-xl flex items-center justify-center bg-white p-2 shadow-inner">
                  <div className="text-center space-y-1">
                    <div className="grid grid-cols-4 gap-1 w-16 h-16 mx-auto bg-gray-900 p-1 rounded">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-900'} />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-gray-500">{selectedTaskForQR.area}</span>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500">
                  Scan on-site at <span className="font-semibold text-gray-700">{selectedTaskForQR.area}</span> for verification.
                </p>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQRModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleDownloadQR}
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Download QR</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default TaskManagementPage;