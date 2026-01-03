'use client';

import { useState, FormEvent, JSX } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

/** ---------- Types ---------- */

type Intent = 'website' | 'hiring';

type WebsiteType =
  | 'Portfolio'
  | 'Business Website'
  | 'Landing Page'
  | 'Redesign / Fix'
  | 'Not Sure';

interface FormState {
  name: string;
  intent: Intent | null;
  websiteType: WebsiteType | null;
}

/** ---------- Component ---------- */

export default function WhatsAppFAB(): JSX.Element {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const [formState, setFormState] = useState<FormState>({
    name: '',
    intent: null,
    websiteType: null,
  });

  const toggleChat = (): void => {
    setIsChatOpen((prev) => !prev);
  };

  /** ---------- Message Builder (Strategy Pattern) ---------- */
  const buildMessage = (state: FormState): string => {
    const greeting = 'Hi 👋\n\n';
    const nameLine = state.name ? `My name is ${state.name}.\n` : '';

    if (state.intent === 'website') {
      return (
        greeting +
        nameLine +
        `I’m interested in getting a website made.\n` +
        (state.websiteType ? `Website type: ${state.websiteType}\n` : '') +
        `\nI checked your portfolio and would like to discuss further.`
      );
    }

    return (
      greeting +
      nameLine +
      `I came across your portfolio and I’m interested in hiring you.`
    );
  };

  /** ---------- Submit ---------- */
  const handleWhatsAppSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!formState.intent) {
      alert('Please select what you are looking for.');
      return;
    }

    const message = buildMessage(formState);
    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/919397082746?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Reset state
    setIsChatOpen(false);
    setFormState({ name: '', intent: null, websiteType: null });
  };

  /** ---------- UI ---------- */
  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Open WhatsApp chat"
      >
        <FaWhatsapp size={24} />
      </button>

{isChatOpen && (
  <div className="
    fixed bottom-20 right-6 w-80 max-w-[90vw]
    bg-white
    border border-gray-200
    rounded-xl
    shadow-2xl
    z-50
    p-5
  ">
    {/* Header */}
    <div className="flex justify-between items-center mb-5">
      <h3 className="text-base font-semibold tracking-wide text-gray-900">
        Contact Me
      </h3>
      <button
        onClick={toggleChat}
        className="text-gray-400 hover:text-gray-700 text-xl leading-none"
        aria-label="Close"
      >
        &times;
      </button>
    </div>

    <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">
          Your Name <span className="normal-case">(optional)</span>
        </label>
        <input
          type="text"
          value={formState.name}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="John Doe"
          className="
            w-full
            rounded-md
            border border-gray-300
            px-3 py-2
            text-sm text-gray-900
            focus:border-green-500
            focus:ring-1 focus:ring-green-500
            outline-none
          "
        />
      </div>

      {/* Intent */}
      <div>
        <p className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
          What are you looking for?
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                intent: 'website',
                websiteType: null,
              }))
            }
            className={`
              py-2 text-sm rounded-md border transition-all
              ${
                formState.intent === 'website'
                  ? 'bg-green-500 text-black border-green-500'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-green-400'
              }
            `}
          >
            Need a Website
          </button>

          <button
            type="button"
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                intent: 'hiring',
                websiteType: null,
              }))
            }
            className={`
              py-2 text-sm rounded-md border transition-all
              ${
                formState.intent === 'hiring'
                  ? 'bg-green-500 text-black border-green-500'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-green-400'
              }
            `}
          >
            Hiring
          </button>
        </div>
      </div>

      {/* Website Type */}
      {formState.intent === 'website' && (
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">
            Website Type
          </label>
          <select
            value={formState.websiteType ?? ''}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                websiteType: e.target.value as WebsiteType,
              }))
            }
            className="
              w-full
              rounded-md
              border border-gray-300
              px-3 py-2
              text-sm text-gray-900
              focus:border-green-500
              focus:ring-1 focus:ring-green-500
              outline-none
              bg-white
            "
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
        </div>
      )}

      {/* CTA */}
      <button
        type="submit"
        disabled={!formState.intent}
        className="
          w-full
          bg-green-500
          text-black
          py-2.5
          rounded-md
          text-sm
          font-semibold
          transition-all
          hover:bg-green-600
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        Send Message
      </button>
    </form>
  </div>
)}

    </>
  );
}
