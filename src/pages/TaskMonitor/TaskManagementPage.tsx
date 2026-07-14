import React, { useState } from 'react';
import { SidebarNavigationSection } from '../../components/SidebarNavigationSection';
import TaskFilterSection from './TaskFilterSection';
import TaskManagementSection from './TaskManagementSection';
import AddTaskModal from './AddITaskModals';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTask';
import type { Task } from '../../types/task';

export const TaskManagementPage: React.FC = () => {
  const { tasks, loading, handleCreate, handleUpdate, handleArchive } = useTasks();
  const { role } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All Areas');

  const filteredTasks = tasks.filter(task => {
    const matchesFrequency = frequencyFilter === 'All' ? true : task.frequency === frequencyFilter;
    const matchesArea = areaFilter === 'All Areas' ? true : task.area === areaFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFrequency && matchesArea && matchesSearch;
  });

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

          <TaskManagementSection 
            tasks={filteredTasks} 
            onArchive={handleArchive} 
            loading={loading} 
            onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }} 
          />
        </div>
        <AddTaskModal 
          isOpen={isModalOpen} 
          onClose={() => { setEditingTask(null); setIsModalOpen(false); }} 
          onCreate={editingTask ? (d) => handleUpdate(editingTask._id, d) : handleCreate}
          onSuccess={() => {}}
          initialData={editingTask}
        />
      </main>
    </div>
  );
};