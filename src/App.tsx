import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // Imported standard router features
import { LoadingPage } from './pages/Loading'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { AssetRegistryPage } from './pages/AssetRegistry/AssetRegistryPage' // Imported your new Asset Registry view
import { TaskMonitor } from './pages/TaskMonitor/TaskMonitor' // Imported Task Monitor layout
import ProtectedRoute from './components/ProtectedRoute' 
import { TaskManagementPage } from './pages/TaskMonitor/TaskManagementPage'

function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        localStorage.setItem('token', 'fake-developer-bypass-token');
        sessionStorage.setItem('token', 'fake-developer-bypass-token');
        localStorage.setItem('role', 'admin'); 
        const fakeUser = { id: 1, name: "Dev Admin", role: "admin", email: "admin@dev.com" };
        localStorage.setItem('user', JSON.stringify(fakeUser));
        sessionStorage.setItem('user', JSON.stringify(fakeUser));
        sessionStorage.setItem('appLoaded', 'true');
      } catch (error) {
        console.error("Initialization error", error);
      } finally {
        setIsPageLoading(false);
      }
    };
    initApp();
  }, []);

  if (isPageLoading) return <LoadingPage />;

return (
    <BrowserRouter>
      <div className="w-full h-screen bg-[#f4f5f6]">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Asset Routes */}
          <Route path="/assets" element={<ProtectedRoute allowedRoles={['admin', 'custodian']}><AssetRegistryPage /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute allowedRoles={['admin', 'custodian']}><AssetRegistryPage /></ProtectedRoute>} />

          {/* Task Monitor Route */}
          <Route 
            path="/live-task-monitor" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'custodian']}>
                <TaskMonitor/>
              </ProtectedRoute>
            } 
          />

          {/* NEW: Task Management Route */}
          <Route 
            path="/tasks/manage" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TaskManagementPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;