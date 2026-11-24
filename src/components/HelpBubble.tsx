import React, { useEffect, useId, useRef, useState } from 'react';
import { HelpCircle, Lightbulb, X } from 'lucide-react';
import { GlossaryTerm } from '../data/melangesData';

interface HelpBubbleProps {
  label?: string;
  title: string;
  content: string;
  example?: string;
  variant?: 'inline' | 'button';
  align?: 'left' | 'right';
  placement?: 'top' | 'bottom';
}

export const HelpBubble: React.FC<HelpBubbleProps> = ({
  label = "Bulle d'aide",
  title,
  content,
  example,
  variant = 'button',
  align = 'left',
  placement = 'bottom',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
        className={
          variant === 'inline'
            ? 'inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 transition-colors hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
            : 'inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600'
        }
      >
        <HelpCircle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
        <span className="whitespace-nowrap">{label}</span>
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="dialog"
          aria-label={`Aide : ${title}`}
          className={`animate-pop-in absolute z-30 w-72 max-w-[calc(100vw-2.5rem)] sm:w-80 rounded-2xl border border-amber-200 bg-white p-4 text-left shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
        >
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="font-display text-sm font-bold text-slate-900">{title}</span>
            </div>
            <button
              type="button"
              aria-label="Fermer la bulle d'aide"
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">{content}</p>
          {example && (
            <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
              <strong className="font-semibold text-slate-800">Exemple :</strong> {example}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

interface GlossaryWordProps {
  term: GlossaryTerm;
}

const ACCENT_STYLES: Record<GlossaryTerm['accent'], string> = {
  emerald: 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100',
  amber: 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100',
  indigo: 'bg-indigo-50 text-indigo-900 border-indigo-300 hover:bg-indigo-100',
  rose: 'bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-100',
  sky: 'bg-sky-50 text-sky-900 border-sky-300 hover:bg-sky-100',
};

export const GlossaryWord: React.FC<GlossaryWordProps> = ({ term }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span ref={containerRef} className="relative inline-block">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        title={`Cliquer pour lire la définition de ${term.word}`}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1 rounded-md border-b-2 px-1.5 py-0.5 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${ACCENT_STYLES[term.accent]}`}
      >
        <span>{term.word}</span>
        <HelpCircle className="h-3.5 w-3.5 shrink-0 opacity-75" aria-hidden="true" />
      </button>

      {isOpen && (
        <span
          id={panelId}
          role="dialog"
          aria-label={`Définition de ${term.word}`}
          className="animate-pop-in absolute left-0 top-full z-30 mt-2 block w-72 rounded-2xl border border-slate-200 bg-white p-3.5 text-left text-sm font-normal text-slate-700 shadow-lg"
        >
          <span className="mb-1 flex items-center justify-between gap-2">
            <strong className="font-display text-sm font-bold text-slate-900">
              Mot clé : {term.word}
            </strong>
            <button
              type="button"
              aria-label={`Fermer la bulle sur ${term.word}`}
              onClick={() => setIsOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </span>
          <span className="block text-xs leading-relaxed text-slate-700">
            {term.simpleDefinition}
          </span>
          <span className="mt-2 block rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600">
            <strong className="text-slate-800">Exemple :</strong> {term.everydayExample}
          </span>
        </span>
      )}
    </span>
  );
};
