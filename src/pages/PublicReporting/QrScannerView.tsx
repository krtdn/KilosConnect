import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, AlertTriangle, Camera, RefreshCw } from 'lucide-react';

interface QRScannerViewProps {
  onBack: () => void;
  onSkipToManual: () => void;
  onScanSuccess: (detectedId: string) => void;
}

export default function QRScannerView({ onBack, onSkipToManual, onScanSuccess }: QRScannerViewProps) {
  const [cameraPermission, setCameraPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } }
      });
      
      streamRef.current = stream;
      setCameraPermission('granted');
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraPermission('denied');
      setCameraError(err.message || "Could not access camera. Please allow permissions or enter manually.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="bg-[#1C2541]/50 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-5 text-center animate-fade-in w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition">
          <ArrowLeft size={14} /> Back
        </button>
        <h2 className="text-sm font-bold text-white tracking-wide uppercase">QR Scanner</h2>
        <div className="w-10" />
      </div>

      <div className="relative aspect-square w-full max-w-[280px] mx-auto bg-black rounded-xl overflow-hidden border border-slate-700 shadow-inner flex flex-col items-center justify-center">
        {cameraPermission === 'prompt' && !cameraError && (
          <div className="p-4 space-y-3">
            <Camera size={36} className="mx-auto text-slate-500 animate-pulse" />
            <p className="text-xs text-slate-400">Awaiting camera permission...</p>
          </div>
        )}

        {cameraPermission === 'denied' && (
          <div className="p-4 space-y-2 text-rose-400">
            <AlertTriangle size={28} className="mx-auto" />
            <p className="text-xs font-semibold">Camera Access Denied</p>
            <p className="text-[11px] text-slate-400 leading-normal">Please adjust browser configuration settings to access camera feeds.</p>
          </div>
        )}

        {cameraPermission === 'granted' && (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-8 border-2 border-emerald-500/40 rounded-lg pointer-events-none box-border">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400 -mt-[2px] -ml-[2px]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400 -mt-[2px] -mr-[2px]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400 -mb-[2px] -ml-[2px]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400 -mb-[2px] -mr-[2px]" />
              <div className="w-full h-[1.5px] bg-emerald-400 absolute top-1/2 left-0 shadow-[0_0_8px_#34d399] animate-[bounce_2s_infinite]" />
            </div>
          </>
        )}
      </div>

      <div className="space-y-3 pt-1">
        <p className="text-xs text-slate-400 leading-normal px-2">
          Align the machine code label inside the frame window to instantly identify asset variables.
        </p>
        
        <div className="flex gap-2">
          <button onClick={onSkipToManual} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition">
            Type Manually Instead
          </button>
          {cameraPermission === 'denied' && (
            <button onClick={startCamera} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition">
              <RefreshCw size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}