import React, { useState } from 'react';
import ZoneSelection from './ZoneSelection';
import QRScanner from './QRScanner';
import TaskChecklist from './TaskChecklist';
import PhotoEvidence from './PhotoEvidence';
// FIXED: Using named import syntax to match the component's export profile
import { SummarySubmission } from './SummarySubmission';

export interface Zone {
  id: string;
  name: string;
  code: string;
}

interface MaintenanceWizardProps {
  onExitFlow: () => void;
}

const MaintenanceWizard: React.FC<MaintenanceWizardProps> = ({ onExitFlow }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [qrVerified, setQrVerified] = useState<boolean>(false);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  const [totalTasksCount, setTotalTasksCount] = useState<number>(0);
  const [photoCaptured, setPhotoCaptured] = useState<boolean>(false);

  const handleSelectZone = (zone: Zone) => {
    setSelectedZone(zone);
    setStep(2); 
  };

  const handleQRVerifySuccess = () => {
    setQrVerified(true);
    setStep(3); 
  };

  const handleChecklistComplete = (completed: number, total: number) => {
    setCompletedTasksCount(completed);
    setTotalTasksCount(total);
    setStep(4); 
  };

  const handlePhotoCapturedSuccess = () => {
    setPhotoCaptured(true);
    setStep(5); 
  };

  const handleSubmitVerification = async () => {
    alert('Verification submitted successfully!');
    resetWizard();
  };

  const resetWizard = () => {
    setStep(1);
    setSelectedZone(null);
    setQrVerified(false);
    setCompletedTasksCount(0);
    setPhotoCaptured(false);
    onExitFlow(); // Returns screen scope execution back to the index dashboard view layout
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans antialiased text-gray-800">
      <header className="bg-emerald-800 text-white shadow-sm h-14 flex items-center justify-between px-4 sticky top-0 z-50">
        <div>
          <h1 className="text-lg font-bold tracking-tight">KilosConnect</h1>
          <p className="text-xs text-emerald-200 -mt-1">Custodian Portal</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        {step === 1 && <ZoneSelection onSelectZone={handleSelectZone} />}
        {step === 2 && selectedZone && (
          <QRScanner zone={selectedZone} onVerifySuccess={handleQRVerifySuccess} onCancel={resetWizard} />
        )}
        {step === 3 && selectedZone && (
          <TaskChecklist zone={selectedZone} onComplete={handleChecklistComplete} />
        )}
        {step === 4 && selectedZone && (
          <PhotoEvidence zone={selectedZone} onCaptureSuccess={handlePhotoCapturedSuccess} />
        )}
        {step === 5 && selectedZone && (
          <SummarySubmission 
            zoneName={selectedZone.name}
            qrVerified={qrVerified}
            completedTasks={`${completedTasksCount}/${totalTasksCount}`}
            photoVerified={photoCaptured}
            onSubmit={handleSubmitVerification}
            onCancel={resetWizard}
          />
        )}
      </main>
    </div>
  );
};

export default MaintenanceWizard;