import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { SORTING_GAME_ITEMS, SortingItem } from '../data/melangesData';
import { evaluateSortingChoice } from '../utils/quizLogic';
import { HelpBubble } from './HelpBubble';

const SortingBeakerPreview: React.FC<{ visualType: SortingItem['visualType'] }> = ({
  visualType,
}) => {
  return (
    <svg viewBox="0 0 110 125" className="h-28 w-24" role="img" aria-label="Illustration du mélange">
      {visualType === 'sirop' && (
        <rect x="24" y="42" width="62" height="68" rx="4" fill="#4ade80" opacity="0.82" />
      )}
      {visualType === 'huile' && (
        <>
          <rect x="24" y="42" width="62" height="24" rx="2" fill="#facc15" />
          <rect x="24" y="66" width="62" height="44" rx="3" fill="#38bdf8" />
        </>
      )}
      {visualType === 'sel' && (
        <rect x="24" y="42" width="62" height="68" rx="4" fill="#bae6fd" opacity="0.85" />
      )}
      {visualType === 'vinaigre' && (
        <rect x="24" y="42" width="62" height="68" rx="4" fill="#e0f2fe" opacity="0.9" />
      )}
      {visualType === 'riz' && (
        <>
          <rect x="24" y="42" width="62" height="68" rx="4" fill="#bae6fd" opacity="0.85" />
          <g fill="#fef3c7" stroke="#d97706" strokeWidth="1">
            <ellipse cx="38" cy="102" rx="6" ry="3" transform="rotate(-10 38 102)" />
            <ellipse cx="54" cy="103" rx="6" ry="3" transform="rotate(14 54 103)" />
            <ellipse cx="70" cy="101" rx="6" ry="3" transform="rotate(-8 70 101)" />
            <ellipse cx="46" cy="96" rx="5.5" ry="2.8" transform="rotate(20 46 96)" />
          </g>
        </>
      )}
      {visualType === 'sable' && (
        <>
          <rect x="24" y="42" width="62" height="68" rx="4" fill="#bae6fd" opacity="0.85" />
          <path d="M24 98 Q55 88 86 98 L86 110 L24 110 Z" fill="#f59e0b" opacity="0.85" />
        </>
      )}
      <path
        d="M19 20 L24 20 L24 106 Q24 111 29 111 L81 111 Q86 111 86 106 L86 20 L91 20"
        fill="none"
        stroke="#334155"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const SortingGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastResult, setLastResult] = useState<{
    chosen: 'homogene' | 'heterogene';
    isCorrect: boolean;
  } | null>(null);
  const [finished, setFinished] = useState(false);

  const currentItem = SORTING_GAME_ITEMS[currentIndex];

  const handlePick = (choice: 'homogene' | 'heterogene') => {
    if (lastResult !== null || finished) return;
    const isCorrect = evaluateSortingChoice(currentItem, choice);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setLastResult({ chosen: choice, isCorrect });
  };

  const handleNext = () => {
    if (currentIndex + 1 >= SORTING_GAME_ITEMS.length) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setLastResult(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setLastResult(null);
    setFinished(false);
  };

  return (
    <section
      id="jeu-tri"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-8 sm:px-6 lg:px-8"
      aria-labelledby="sorting-game-title"
    >
      <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-indigo-700">
              Mini-jeu rapide · Observation visuelle
            </p>
            <h2
              id="sorting-game-title"
              className="mt-1 font-display text-2xl font-extrabold text-slate-900"
            >
              Le Grand Tri du Labo
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tabular-nums text-slate-700">
              Score du jeu : {score} / {SORTING_GAME_ITEMS.length}
            </span>
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Rejouer</span>
            </button>
          </div>
        </div>

        {finished ? (
          <div className="animate-fade-slide py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Trophy className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-extrabold text-slate-900">
              Défi terminé : {score} / {SORTING_GAME_ITEMS.length} !
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              {score === SORTING_GAME_ITEMS.length
                ? 'Incroyable ! Tu as classé tous les mélanges sans aucune erreur !'
                : 'Bien joué ! Tu sais déjà reconnaître les mélanges homogènes et hétérogènes.'}
            </p>
            <button
              type="button"
              onClick={handleRestart}
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Recommencer le tri</span>
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
            {/* Illustration du mélange */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-5 md:col-span-4">
              <span className="text-xs font-semibold text-slate-500 tabular-nums">
                Mélange {currentIndex + 1} sur {SORTING_GAME_ITEMS.length}
              </span>
              <div className="my-3 animate-gentle-float">
                <SortingBeakerPreview visualType={currentItem.visualType} />
              </div>
              <h3 className="font-display text-base font-extrabold text-slate-900 text-center">
                {currentItem.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 text-center">{currentItem.ingredients}</p>
            </div>

            {/* Choix Homogène / Hétérogène */}
            <div className="flex flex-col gap-4 md:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-base font-bold text-slate-900">
                  Dans quelle boîte ranges-tu ce verre ?
                </p>
                <HelpBubble
                  variant="inline"
                  align="right"
                  label="Besoin d'un indice ?"
                  title={`Indice pour ${currentItem.title}`}
                  content={currentItem.helpHint}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={lastResult !== null}
                  onClick={() => handlePick('homogene')}
                  className={`min-h-[60px] rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                    lastResult && currentItem.category === 'homogene'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                      : lastResult && lastResult.chosen === 'homogene' && !lastResult.isCorrect
                        ? 'border-rose-500 bg-rose-50 text-rose-950'
                        : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-emerald-500 hover:bg-emerald-50/60'
                  }`}
                >
                  <span className="block font-display text-base font-extrabold">
                    Mélange homogène
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-600">
                    On ne voit qu’un seul liquide
                  </span>
                </button>

                <button
                  type="button"
                  disabled={lastResult !== null}
                  onClick={() => handlePick('heterogene')}
                  className={`min-h-[60px] rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                    lastResult && currentItem.category === 'heterogene'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                      : lastResult && lastResult.chosen === 'heterogene' && !lastResult.isCorrect
                        ? 'border-rose-500 bg-rose-50 text-rose-950'
                        : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-amber-500 hover:bg-amber-50/60'
                  }`}
                >
                  <span className="block font-display text-base font-extrabold">
                    Mélange hétérogène
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-600">
                    On voit encore plusieurs choses
                  </span>
                </button>
              </div>

              {lastResult && (
                <div
                  className={`animate-fade-slide flex flex-col justify-between gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center ${
                    lastResult.isCorrect
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                      : 'border-amber-200 bg-amber-50 text-amber-950'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {lastResult.isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" aria-hidden="true" />
                    )}
                    <p className="text-sm leading-relaxed">
                      <strong>{lastResult.isCorrect ? 'Bravo ! ' : 'Pas tout à fait ! '}</strong>
                      {currentItem.explanation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 whitespace-nowrap"
                  >
                    <span>
                      {currentIndex + 1 >= SORTING_GAME_ITEMS.length ? 'Voir mon score' : 'Mélange suivant'}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
