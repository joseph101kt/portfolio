'use client';

import { useEffect, useState, JSX } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

/* =========================================================
   Types
========================================================= */

type Intent = 'website' | 'hiring';

type WebsiteType =
  | 'Portfolio'
  | 'Business Website'
  | 'Landing Page'
  | 'Redesign / Fix'
  | 'Not Sure';

type ChatStep = 'intent' | 'websiteType' | 'name';

interface FormState {
  name: string;
  intent: Intent | null;
  websiteType: WebsiteType | null;
}

/* =========================================================
   Constants / Config
========================================================= */

const WHATSAPP_NUMBER = '919397082746';
const AUTO_OPEN_DELAY_MS = 20000;

const CHAT_STEPS: ChatStep[] = ['intent', 'websiteType', 'name'];

/* =========================================================
   Utilities (Decoupled, Testable)
========================================================= */

function sanitize(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

type GtagFn = (
  command: 'event',
  eventName: string,
  params?: Record<string, unknown>
) => void;

function track(event: string, data?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (!gtag) return;

  gtag('event', event, data);
}


function getNextStep(current: ChatStep, state: FormState): ChatStep {
  if (current === 'intent') {
    return state.intent === 'website' ? 'websiteType' : 'name';
  }

  if (current === 'websiteType') return 'name';

  return 'name';
}

function getProgress(step: ChatStep): number {
  return ((CHAT_STEPS.indexOf(step) + 1) / CHAT_STEPS.length) * 100;
}

/* =========================================================
   Message Builder (Pure Function)
========================================================= */

function buildWhatsAppMessage(state: FormState): string {
  const greeting = 'Hi 👋\n\n';
  const nameLine = state.name
    ? `My name is ${sanitize(state.name)}.\n`
    : '';

  if (state.intent === 'website') {
    return (
      greeting +
      nameLine +
      'I’m interested in getting a website made.\n' +
      (state.websiteType
        ? `Website type: ${state.websiteType}\n`
        : '') +
      '\nI checked your portfolio and would like to discuss further.'
    );
  }

  return (
    greeting +
    nameLine +
    'I came across your portfolio and I’m interested in hiring you.'
  );
}

/* =========================================================
   Component
========================================================= */

export default function WhatsAppFAB(): JSX.Element {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isAutoOpened, setIsAutoOpened] = useState<boolean>(false);
  const [chatStep, setChatStep] = useState<ChatStep>('intent');

  const [formState, setFormState] = useState<FormState>({
    name: '',
    intent: null,
    websiteType: null,
  });

  /* ---------- Auto Open ---------- */
  useEffect(() => {
    if (isAutoOpened) return;

    const timer = setTimeout(() => {
      setIsChatOpen(true);
      setIsAutoOpened(true);
      track('cta_auto_open');
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isAutoOpened]);

  /* ---------- Escape to Close ---------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setIsChatOpen(false);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* ---------- Submit ---------- */
  const handleSubmit = (): void => {
    if (!formState.intent) return;

    const message = buildWhatsAppMessage(formState);
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    track('cta_submit', { intent: formState.intent });
    window.open(url, '_blank');

    setIsChatOpen(false);
    setChatStep('intent');
    setFormState({ name: '', intent: null, websiteType: null });
  };

  const progress = getProgress(chatStep);

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => {
          if (isChatOpen){
            setIsChatOpen(false)
          }
          else{
            setIsChatOpen(true);
            track('cta_open');
          }
        }}
        aria-label="Chat on WhatsApp"
        className="
          fixed bottom-6 right-6 z-50
          p-2 rounded-full bg-green-500
          shadow-lg 
          hover:scale-105 transition
        "
      >
        <FaWhatsapp size={30} />
      </button>

      {/* Chat Window */}
      <div
        role="dialog"
        aria-modal="true"
        className={`
          fixed bottom-20 right-6 z-50
          w-80 max-w-[90vw]
          bg-white border border-gray-200
          rounded-xl shadow-2xl p-5
          transition-all duration-300
          ${
            isChatOpen
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src="/avatar.jpg"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">
              Let’s Build Your Website
            </h3>
            <p className="text-xs text-gray-900">
              Typically replies within minutes
            </p>
          </div>

          <button
            onClick={() => setIsChatOpen(false)}
            aria-label="Close"
            className="text-xl h-10 w-10 -mt-3.5 text-gray-400 hover:text-gray-600  "
          >
            ×
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 bg-gray-200 rounded mb-4">
          <div
            className="h-1 bg-green-500 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step: Intent */}
        {chatStep === 'intent' && (
          <>
            <p className="text-sm text-black mb-2">What are you looking for?</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="py-2 rounded-md border-2 text-black hover:text-green-900 hover:border-green-400"
                onClick={() => {
                  const nextState: FormState = {
                    ...formState,
                    intent: 'website',
                  };

                  setFormState(nextState);
                  setChatStep(getNextStep('intent', nextState));
                  track('cta_intent', { intent: 'website' });
                }}
              >
                Need a Website
              </button>

              <button
                className="py-2 rounded-md border-2 text-black hover:text-green-900 hover:border-green-400"
                onClick={() => {
                  const nextState: FormState = {
                    ...formState,
                    intent: 'hiring',
                  };

                  setFormState(nextState);
                  setChatStep('name');
                  track('cta_intent', { intent: 'hiring' });
                }}
              >
                Hiring
              </button>
            </div>
          </>
        )}

        {/* Step: Website Type */}
        {chatStep === 'websiteType' && (
          <>
            <p className="text-sm text-black mb-1">What type of website?</p>
            <p className="text-xs text-gray-800 mb-2">
              Don’t worry — we’ll figure it out together.
            </p>

            <select
              className="w-full border text-black rounded-md px-3 py-2 text-sm"
              value={formState.websiteType ?? ''}
              onChange={(e) => {
                const nextState: FormState = {
                  ...formState,
                  websiteType: e.target.value as WebsiteType,
                };

                setFormState(nextState);
                setChatStep('name');
              }}
            >
              <option value="" disabled>
                Select one
              </option>
              <option>Portfolio</option>
              <option>Business Website</option>
              <option>Landing Page</option>
              <option>Redesign / Fix</option>
              <option>Not Sure</option>
            </select>
          </>
        )}

        {/* Step: Name */}
        {chatStep === 'name' && (
          <>
            <input
              type="text"
              placeholder="Your name (optional)"
              className="
                w-full
                border-2 border-green-500
                rounded-md px-3 py-2 text-sm
                placeholder:text-gray-700

                focus:outline-none
                focus:ring-0
                focus:border-green-400
              "
              value={formState.name}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value,
                })
              }
            />

            <button
              onClick={handleSubmit}
              className="mt-2 w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
            >
              Send Message
            </button>
          </>
        )}
      </div>
    </>
  );
}
