'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="
        fixed inset-0 z-200
        bg-[#0b0b12]/60 backdrop-blur-sm
        flex items-end justify-center
      "
    >
      {/* Sheet */}
      <div
        className="
          w-full max-w-[720px]
          h-[90vh]
          flex flex-col

          bg-[#111018]
          border border-[#c17aff33]
          rounded-t-2xl

          shadow-[0_-10px_40px_rgba(0,0,0,0.4)]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          
          {/* Drag handle (subtle) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1 rounded-full bg-[#c17aff]/30" />

          <span className="text-sm text-zinc-400">Details</span>

          {/* Close */}
          <button
            onClick={onClose}
            className="
              text-zinc-400 hover:text-white
              transition
              text-sm
            "
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div
          className="
            flex-1 overflow-y-auto px-6 pb-10 pt-4

            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="relative w-full">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .modal-enter {
            border-radius: 16px !important;
            max-height: 85vh !important;
          }
        }
      `}</style>
    </div>
  );
}