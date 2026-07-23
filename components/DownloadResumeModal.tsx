'use client';

import React, { useState } from 'react';
import { X, Printer, FileText, Check, Loader2 } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  digitalPdfUrl?: string;
  lightPdfUrl?: string;
}

export function DownloadModal({
  isOpen,
  onClose,
  digitalPdfUrl = "/joseph_kakkassery_resume.pdf",
  lightPdfUrl = '/JosephK_FullStackDev_Resume_LightMode.pdf',
}: DownloadModalProps) {
  const [downloadingType, setDownloadingType] = useState<'print' | 'digital' | null>(null);

  if (!isOpen) return null;

  const triggerDownload = (fileUrl: string, fileName: string, type: 'print' | 'digital') => {
    // 1. Show immediate click feedback
    setDownloadingType(type);

    // 2. Trigger actual download after brief visual feedback
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Reset and close modal cleanly
      setTimeout(() => {
        setDownloadingType(null);
        onClose();
      }, 300);
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md no-print animate-in fade-in duration-150"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="w-[90vw] max-w-sm rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border flex flex-col gap-3.5 z-10 animate-in zoom-in-95 duration-150"
        style={{
          backgroundColor: '#0f0f1a',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
            Download Options
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Option 1: Print / Light Version PDF */}
        <button
          type="button"
          disabled={downloadingType !== null}
          onClick={() => triggerDownload(lightPdfUrl, 'JosephK_Resume_LightMode.pdf', 'print')}
          className={`
            relative flex items-start gap-3.5 p-3 rounded-xl text-left border transition-all duration-200 group
            active:scale-[0.98] cursor-pointer disabled:cursor-wait
            ${downloadingType === 'print'
              ? 'bg-violet-500/20 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
              : 'border-white/10 bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/60 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] hover:-translate-y-0.5'}
          `}
        >
          <div className="p-2.5 rounded-lg shrink-0 mt-0.5 bg-violet-500/20 text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/30 transition-all">
            {downloadingType === 'print' ? (
              <Loader2 size={18} className="animate-spin text-violet-300" />
            ) : (
              <Printer size={18} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold leading-snug text-white group-hover:text-violet-200 transition-colors">
                {downloadingType === 'print' ? 'Downloading...' : 'Download for Printing'}
              </p>
              {downloadingType === 'print' && (
                <Check size={16} className="text-violet-400 animate-in zoom-in-50" />
              )}
            </div>
            <p className="text-xs mt-0.5 leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Optimized light theme with links displayed as plain text.
            </p>
          </div>
        </button>

        {/* Option 2: Digital PDF Version */}
        <button
          type="button"
          disabled={downloadingType !== null}
          onClick={() => triggerDownload(digitalPdfUrl, 'JosephK_Resume_Digital.pdf', 'digital')}
          className={`
            relative flex items-start gap-3.5 p-3 rounded-xl text-left border transition-all duration-200 group
            active:scale-[0.98] cursor-pointer disabled:cursor-wait
            ${downloadingType === 'digital'
              ? 'bg-violet-500/20 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
              : 'border-white/10 bg-white/5 hover:bg-violet-500/10 hover:border-violet-400/60 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] hover:-translate-y-0.5'}
          `}
        >
          <div className="p-2.5 rounded-lg shrink-0 mt-0.5 bg-violet-400/20 text-violet-300 group-hover:scale-110 group-hover:bg-violet-400/30 transition-all">
            {downloadingType === 'digital' ? (
              <Loader2 size={18} className="animate-spin text-violet-300" />
            ) : (
              <FileText size={18} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold leading-snug text-white group-hover:text-violet-200 transition-colors">
                {downloadingType === 'digital' ? 'Downloading...' : 'Download Digital Document'}
              </p>
              {downloadingType === 'digital' && (
                <Check size={16} className="text-violet-400 animate-in zoom-in-50" />
              )}
            </div>
            <p className="text-xs mt-0.5 leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Styled dark theme with interactive clickable links.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}