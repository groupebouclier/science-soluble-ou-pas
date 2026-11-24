import React, { useEffect, useState } from 'react';
import { CheckCircle2, Eye, Play, RotateCcw, Sparkles } from 'lucide-react';
import { LAB_MIXTURES, MixtureId } from '../data/melangesData';
import { HelpBubble } from './HelpBubble';

type LabPhase = 'initial' | 'mixing' | 'mixed';

export const InteractiveLab: React.FC = () => {
  const [selectedId, setSelectedId] = useState<MixtureId>('sirop');
  const [phase, setPhase] = useState<LabPhase>('initial');

  const currentMixture = LAB_MIXTURES.find((m) => m.id === selectedId) ?? LAB_MIXTURES[0];

  useEffect(() => {
    if (phase !== 'mixing') return;
    const timer = window.setTimeout(() => {
      setPhase('mixed');
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleSelectMixture = (id: MixtureId) => {
    setSelectedId(id);
    setPhase('initial');
  };

  const handleMix = () => {
    setPhase('mixing');
  };

  const handleReset = () => {
    setPhase('initial');
  };

  return (
    <section
      id="atelier"
      className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:px-6 lg:px-8"
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-1 items-stretch gap-8 rounded-3xl border border-sky-200/80 bg-white p-6 shadow-sm lg:grid-cols-12 lg:p-10">
        {/* Colonne gauche : Accueil simple et clair pour CM1 */}
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-sky-700">
              Sciences CM1 · Leçon interactive · 4 expériences &amp; 25 défis
            </p>
            <h1
              id="hero-title"
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              Découvre les secrets <span className="text-sky-600">des mélanges</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Que se passe-t-il quand on mélange de l’eau avec du sirop, de l’huile, du sel ou du
              riz ? Teste les expériences dans le verre ci-contre, clique sur les{' '}
              <strong className="font-semibold text-slate-800">bulles d’aide</strong> pour
              comprendre facilement, puis joue aux quiz !
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-emerald-700">Mélange homogène</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  On ne voit plus qu’un seul liquide avec nos yeux.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-amber-700">Mélange hétérogène</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  On voit encore les morceaux ou deux étages séparés.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#exercices"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Jouer aux quiz (25 questions)</span>
            </a>
            <a
              href="#cours"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:border-sky-500 hover:bg-sky-50 whitespace-nowrap"
            >
              Lire les 4 règles
            </a>
          </div>
        </div>

        {/* Colonne droite : Mini-Laboratoire interactif du CM1 */}
        <div
          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/90 p-5 sm:p-6 lg:col-span-6"
          aria-label="Atelier interactif des mélanges"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Atelier : Teste les 4 mélanges
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                {currentMixture.ingredientsLabel}
              </span>
            </div>

            {/* Sélecteur des 4 expériences */}
            <div
              className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
              role="tablist"
              aria-label="Choisir un mélange à tester"
            >
              {LAB_MIXTURES.map((mix) => {
                const isSelected = mix.id === selectedId;
                return (
                  <button
                    key={mix.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectMixture(mix.id)}
                    className={`min-h-[42px] rounded-xl border px-3 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                      isSelected
                        ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    {mix.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zone visuelle du bécher + explication */}
          <div className="my-5 grid grid-cols-1 items-center gap-5 sm:grid-cols-12">
            {/* Bécher animé SVG */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-5">
              <div className="relative h-44 w-36" data-testid={`beaker-${selectedId}-${phase}`}>
                <svg
                  viewBox="0 0 140 165"
                  className="h-full w-full"
                  role="img"
                  aria-label={`Expérience ${currentMixture.name}, état : ${
                    phase === 'initial'
                      ? 'avant de mélanger'
                      : phase === 'mixing'
                        ? 'mélange en cours'
                        : currentMixture.typeLabel
                  }`}
                >
                  {/* Cuillère qui remue quand phase === 'mixing' */}
                  {phase === 'mixing' && (
                    <g className="animate-stir" style={{ transformOrigin: '70px 30px' }}>
                      <rect x="67" y="10" width="6" height="105" rx="3" fill="#94a3b8" />
                      <ellipse cx="70" cy="116" rx="10" ry="5" fill="#cbd5e1" />
                    </g>
                  )}

                  {/* Contenu selon le mélange et la phase */}
                  {selectedId === 'sirop' && (
                    <>
                      {/* Eau claire en haut avant mélange, devient rose homogène après */}
                      <rect
                        x="32"
                        y="56"
                        width="76"
                        height="86"
                        rx="6"
                        fill={phase === 'initial' ? '#bae6fd' : '#fb7185'}
                        opacity={phase === 'initial' ? 0.75 : 0.88}
                        className="transition-colors duration-700"
                      />
                      {/* Sirop au fond avant de mélanger */}
                      {phase === 'initial' && (
                        <rect
                          x="32"
                          y="114"
                          width="76"
                          height="28"
                          rx="4"
                          fill="#e11d48"
                          opacity="0.9"
                        />
                      )}
                      {phase === 'mixing' && (
                        <>
                          <circle cx="52" cy="95" r="8" fill="#e11d48" opacity="0.55" />
                          <circle cx="84" cy="82" r="10" fill="#fda4af" opacity="0.7" />
                        </>
                      )}
                    </>
                  )}

                  {selectedId === 'huile' && (
                    <>
                      {/* Eau bleue */}
                      <rect
                        x="32"
                        y={phase === 'mixing' ? 56 : 86}
                        width="76"
                        height={phase === 'mixing' ? 86 : 56}
                        rx="5"
                        fill="#38bdf8"
                        opacity="0.88"
                      />
                      {/* Huile jaune au-dessus (avant et après, toujours séparée !) */}
                      {phase !== 'mixing' ? (
                        <>
                          <rect x="32" y="56" width="76" height="30" rx="3" fill="#facc15" />
                          <line
                            x1="32"
                            y1="86"
                            x2="108"
                            y2="86"
                            stroke="#0284c7"
                            strokeWidth="2"
                          />
                        </>
                      ) : (
                        <>
                          <circle cx="52" cy="76" r="7" fill="#facc15" />
                          <circle cx="78" cy="100" r="8" fill="#facc15" />
                          <circle cx="62" cy="118" r="6" fill="#facc15" />
                          <circle cx="88" cy="74" r="5" fill="#facc15" />
                        </>
                      )}
                    </>
                  )}

                  {selectedId === 'sel' && (
                    <>
                      <rect
                        x="32"
                        y="56"
                        width="76"
                        height="86"
                        rx="6"
                        fill="#bae6fd"
                        opacity="0.82"
                      />
                      {/* Grains de sel visibles au début, tourbillonnent puis disparaissent ! */}
                      {phase === 'initial' && (
                        <g fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8">
                          <circle cx="48" cy="134" r="3" />
                          <circle cx="57" cy="136" r="2.8" />
                          <circle cx="66" cy="133" r="3.2" />
                          <circle cx="75" cy="136" r="2.8" />
                          <circle cx="84" cy="134" r="3" />
                          <circle cx="92" cy="136" r="2.6" />
                          <circle cx="61" cy="128" r="2.5" />
                          <circle cx="79" cy="129" r="2.5" />
                        </g>
                      )}
                      {phase === 'mixing' && (
                        <g fill="#ffffff" opacity="0.75">
                          <circle cx="50" cy="100" r="2.2" />
                          <circle cx="70" cy="86" r="2" />
                          <circle cx="86" cy="110" r="2.2" />
                          <circle cx="60" cy="118" r="1.8" />
                        </g>
                      )}
                    </>
                  )}

                  {selectedId === 'riz' && (
                    <>
                      <rect
                        x="32"
                        y="56"
                        width="76"
                        height="86"
                        rx="6"
                        fill="#bae6fd"
                        opacity="0.82"
                      />
                      {/* Grains de riz toujours visibles */}
                      {phase === 'mixing' ? (
                        <g fill="#fef3c7" stroke="#d97706" strokeWidth="1">
                          <ellipse cx="52" cy="96" rx="6" ry="3" transform="rotate(-25 52 96)" />
                          <ellipse cx="76" cy="82" rx="6" ry="3" transform="rotate(30 76 82)" />
                          <ellipse cx="86" cy="114" rx="6" ry="3" transform="rotate(-10 86 114)" />
                          <ellipse cx="58" cy="122" rx="6" ry="3" transform="rotate(18 58 122)" />
                        </g>
                      ) : (
                        <g fill="#fef3c7" stroke="#d97706" strokeWidth="1">
                          <ellipse cx="46" cy="135" rx="6.5" ry="3.2" transform="rotate(-8 46 135)" />
                          <ellipse cx="60" cy="136" r="3" rx="6.5" ry="3.2" transform="rotate(12 60 136)" />
                          <ellipse cx="74" cy="135" rx="6.5" ry="3.2" transform="rotate(-14 74 135)" />
                          <ellipse cx="89" cy="136" rx="6.5" ry="3.2" transform="rotate(8 89 136)" />
                          <ellipse cx="53" cy="129" rx="6" ry="3" transform="rotate(20 53 129)" />
                          <ellipse cx="81" cy="129" rx="6" ry="3" transform="rotate(-18 81 129)" />
                        </g>
                      )}
                    </>
                  )}

                  {/* Parois du bécher */}
                  <path
                    d="M26 30 L32 30 L32 138 Q32 144 38 144 L102 144 Q108 144 108 138 L108 30 L114 30"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Graduations */}
                  <line x1="39" y1="70" x2="50" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                  <line x1="39" y1="95" x2="55" y2="95" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                  <line x1="39" y1="120" x2="50" y2="120" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                </svg>
              </div>

              <span className="mt-2 text-xs font-semibold text-slate-600">
                {phase === 'initial' && 'Avant de mélanger'}
                {phase === 'mixing' && 'On remue doucement…'}
                {phase === 'mixed' && 'Après avoir mélangé'}
              </span>
            </div>

            {/* Observation & Bulle d'aide */}
            <div className="flex flex-col justify-between gap-3 sm:col-span-7">
              {phase === 'mixed' ? (
                <div
                  className={`animate-fade-slide rounded-2xl border p-4 ${
                    currentMixture.isHomogeneous
                      ? 'border-emerald-200 bg-emerald-50/90 text-emerald-950'
                      : 'border-amber-200 bg-amber-50/90 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {currentMixture.isHomogeneous ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                    )}
                    <span className="font-display text-sm font-extrabold">
                      {currentMixture.typeLabel} · {currentMixture.propertyLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{currentMixture.simpleSummary}</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="font-display text-sm font-bold text-slate-900">
                    {phase === 'mixing'
                      ? 'Regarde bien ce qui se passe dans le verre…'
                      : `Prêt à tester : ${currentMixture.name} ?`}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {phase === 'mixing'
                      ? 'Observe si les ingrédients se cachent ensemble ou s’ils restent séparés.'
                      : 'Clique sur le bouton bleu ci-dessous pour mélanger et voir le résultat.'}
                  </p>
                </div>
              )}

              <div>
                <HelpBubble
                  placement="top"
                  label="Bulle d'aide CM1"
                  title={currentMixture.name}
                  content={currentMixture.helpBubbleText}
                />
              </div>
            </div>
          </div>

          {/* Boutons d'action du labo */}
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={handleMix}
              disabled={phase === 'mixing'}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sky-700 disabled:opacity-60 whitespace-nowrap"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              <span>{phase === 'mixed' ? 'Mélanger encore' : currentMixture.actionWord}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Remettre à zéro</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
