import React, { useState } from 'react';
import { SidebarNavigationSection } from '../../components/SidebarNavigationSection';
import TaskFilterSection from './TaskFilterSection';
import TaskManagementSection from './TaskManagementSection';
import AddTaskModal from './AddITaskModals';
import { useAuth } from '../../hooks/useAuth';
import type { Task } from '../../types/task';

// --- MOCK DATA FOR GYM TASKS MATCHING YOUR TASK INTERFACE ---
const MOCK_GYM_TASKS: Task[] = [
  {
    _id: '1',
    title: 'Sanitize Powerlifting Benches and Barbells',
    description: 'Wipe down all benches, racks, and knurling with disinfectant spray after peak hours.',
    area: 'Powerlifting Zone',
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
    area: 'CrossFit Zone',
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
  {
    _id: '3',
    title: 'Deep Clean Rubber Flooring in Open WOD Area',
    description: 'Scrub rubber tiles using industrial floor cleaner to remove chalk buildup and sweat marks.',
    area: 'Open WOD Area',
    priority: 'High',
    frequency: 'Weekly',
    dayType: 'Wednesday',
    startTime: '13:00',
    endTime: '15:00',
    isBreak: false,
    isArchived: false,
    createdAt: '2026-05-03T00:00:00.000Z',
    updatedAt: '2026-05-03T00:00:00.000Z',
  },
  {
    _id: '4',
    title: 'Calibrate and Clean Treadmill Displays',
    description: 'Wipe console screens with safe microfiber cloths and check emergency stop magnetic keys.',
    area: 'Cardio Deck',
    priority: 'Low',
    frequency: 'Daily',
    dayType: 'Thursday',
    startTime: '07:00',
    endTime: '08:00',
    isBreak: false,
    isArchived: false,
    createdAt: '2026-05-04T00:00:00.000Z',
    updatedAt: '2026-05-04T00:00:00.000Z',
  },
];

export const TaskManagementPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_GYM_TASKS);
  const [loading] = useState(false);
  const { role } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All Areas');

  // --- QR CODE & CHECKLIST MODAL STATES ---
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedTaskForQR, setSelectedTaskForQR] = useState<Task | null>(null);
  
  // Checklist items list without checkboxes
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

  // Handler when clicking any task item in the list
  const handleTaskClick = (task: Task) => {
    setSelectedTaskForQR(task);
    setIsQRModalOpen(true);
  };

  // Handler to download the mock QR code image for the location area
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Tasks</h1>
          
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

          {/* Interactive clickable wrapper for the existing task section */}
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

        {/* Add/Edit Task Modal */}
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

        {/* --- TASK CHECKLIST DETAILS & QR CODE MODAL WITH DOWNLOAD BUTTON --- */}
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

              {/* Task Checklist Details Section (Text list only, no checkboxes) */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Task Checklist Details</h4>
                <div className="space-y-2">
                  {checklistItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center space-x-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                      <span className="text-sm font-medium text-gray-800">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code Section */}
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

              {/* Action Buttons */}
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
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