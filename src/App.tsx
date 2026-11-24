import React from 'react';
import { FlaskConical } from 'lucide-react';
import { InteractiveLab } from './components/InteractiveLab';
import { LessonRules } from './components/LessonRules';
import { SeparationSchemas } from './components/SeparationSchemas';
import { SortingGame } from './components/SortingGame';
import { QuizSection } from './components/QuizSection';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Top Bar Contract : 3 zones exactement */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:gap-8 sm:px-6 lg:px-8">
            {/* Zone 1 : Wordmark sur une ligne */}
            <a
              href="#atelier"
              className="flex shrink-0 items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-600 text-white">
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>LaboSciences</span>
            </a>

            {/* Zone 2 : Liens de navigation concis sur une ligne */}
            <nav
              aria-label="Navigation principale"
              className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex"
            >
              <a
                href="#atelier"
                className="whitespace-nowrap shrink-0 transition-colors hover:text-sky-700"
              >
                Atelier
              </a>
              <a
                href="#cours"
                className="whitespace-nowrap shrink-0 transition-colors hover:text-sky-700"
              >
                La leçon
              </a>
              <a
                href="#schema"
                className="whitespace-nowrap shrink-0 transition-colors hover:text-sky-700"
              >
                Schémas
              </a>
              <a
                href="#jeu-tri"
                className="whitespace-nowrap shrink-0 transition-colors hover:text-sky-700"
              >
                Grand Tri
              </a>
            </nav>

            {/* Zone 3 : 1 bouton d'action principal */}
            <div className="shrink-0">
              <a
                href="#exercices"
                className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-sky-700 whitespace-nowrap shrink-0 sm:text-sm"
              >
                Aller aux quiz
              </a>
            </div>
          </div>
        </header>

        <main>
          <InteractiveLab />
          <LessonRules />
          <SeparationSchemas />
          <SortingGame />
          <QuizSection />
        </main>

        <footer className="mt-10 border-t border-slate-200 bg-white py-6 text-sm text-slate-500">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <strong className="font-display font-bold text-slate-800">
              LaboSciences · Sciences CM1
            </strong>
            <span>Les mélanges, schémas animés, bulles d’aide et jeux de quiz.</span>
          </div>
        </footer>
      </div>
  );
}
