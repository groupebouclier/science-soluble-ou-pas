import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { GLOSSARY_TERMS, SEPARATION_TECHNIQUES, SeparationTechnique } from '../data/melangesData';
import { HelpBubble } from './HelpBubble';

const SeparationDiagramSvg: React.FC<{
  id: SeparationTechnique['id'];
  isAnimated: boolean;
}> = ({ id, isAnimated }) => {
  if (id === 'evaporation') {
    return (
      <svg viewBox="0 0 180 115" className="h-28 w-full" role="img" aria-label="Schéma de l'évaporation">
        {/* Soleil / source de chaleur */}
        <circle cx="145" cy="24" r="13" fill="#fde047" stroke="#eab308" strokeWidth="2" />
        <line x1="145" y1="5" x2="145" y2="9" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
        <line x1="164" y1="24" x2="160" y2="24" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
        <line x1="126" y1="24" x2="130" y2="24" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
        <line x1="158" y1="11" x2="155" y2="14" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />

        {/* Vapeur qui monte quand animé */}
        {isAnimated && (
          <g className="animate-steam" stroke="#0284c7" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M68 50 Q62 40 68 30" />
            <path d="M88 46 Q94 36 88 26" />
            <path d="M108 50 Q102 40 108 30" />
          </g>
        )}

        {/* Eau qui baisse quand évaporée */}
        <rect
          x="52"
          y={isAnimated ? 88 : 62}
          width="72"
          height={isAnimated ? 10 : 36}
          rx="3"
          fill="#bae6fd"
          className="transition-all duration-700"
        />

        {/* Cristaux de sel au fond */}
        <g fill="#ffffff" stroke="#94a3b8" strokeWidth="1">
          <rect x="60" y="91" width="6" height="6" rx="1" />
          <rect x="72" y="92" width="5" height="5" rx="1" />
          <rect x="84" y="91" width="6" height="6" rx="1" />
          <rect x="97" y="92" width="5" height="5" rx="1" />
          <rect x="108" y="91" width="6" height="6" rx="1" />
        </g>

        {/* Récipient */}
        <path
          d="M46 46 L52 46 L52 96 Q52 100 56 100 L120 100 Q124 100 124 96 L124 46 L130 46"
          fill="none"
          stroke="#334155"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="88" y="112" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
          {isAnimated ? 'Sel sec récupéré' : 'Eau salée'}
        </text>
      </svg>
    );
  }

  if (id === 'tamisage') {
    return (
      <svg viewBox="0 0 180 115" className="h-28 w-full" role="img" aria-label="Schéma du tamisage">
        {/* Tamis / Passoire */}
        <path d="M44 36 L136 36 L126 56 L54 56 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
        <line x1="54" y1="56" x2="126" y2="56" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" />

        {/* Gros coquillages bloqués en haut */}
        <circle cx="72" cy="46" r="5.5" fill="#fb7185" />
        <circle cx="92" cy="45" r="6" fill="#f59e0b" />
        <circle cx="110" cy="46" r="5" fill="#fb7185" />

        {/* Sable qui tombe à travers les trous quand animé */}
        {isAnimated && (
          <g fill="#d97706" className="animate-drip">
            <circle cx="70" cy="64" r="2" />
            <circle cx="84" cy="68" r="2" />
            <circle cx="96" cy="63" r="2" />
            <circle cx="108" cy="69" r="2" />
          </g>
        )}

        {/* Tas de sable en bas */}
        <path
          d={isAnimated ? 'M54 98 Q90 76 126 98 Z' : 'M72 98 Q90 92 108 98 Z'}
          fill="#fcd34d"
          stroke="#d97706"
          strokeWidth="1.5"
          className="transition-all duration-700"
        />

        <text x="90" y="112" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
          {isAnimated ? 'Gros en haut · Sable en bas' : 'Mélange sur la grille'}
        </text>
      </svg>
    );
  }

  if (id === 'filtration') {
    return (
      <svg viewBox="0 0 180 115" className="h-28 w-full" role="img" aria-label="Schéma de la filtration">
        {/* Entonnoir + papier filtre */}
        <polygon points="55,18 125,18 96,56 84,56" fill="#fef3c7" stroke="#64748b" strokeWidth="2.5" />
        {/* Terre bloquée dans le filtre */}
        <path d="M74 34 L106 34 L95 52 L85 52 Z" fill="#92400e" opacity="0.85" />

        {/* Gouttes d'eau claire qui coulent */}
        {isAnimated && (
          <g fill="#0ea5e9" className="animate-drip">
            <circle cx="90" cy="62" r="2.8" />
            <circle cx="90" cy="74" r="2.8" />
          </g>
        )}

        {/* Verre en dessous avec eau propre */}
        <rect
          x="66"
          y={isAnimated ? 74 : 90}
          width="48"
          height={isAnimated ? 24 : 8}
          rx="2"
          fill="#7dd3fc"
          className="transition-all duration-700"
        />
        <path
          d="M62 66 L66 66 L66 98 L114 98 L114 66 L118 66"
          fill="none"
          stroke="#334155"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <text x="90" y="112" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
          {isAnimated ? 'Eau claire filtrée' : 'Filtre en papier'}
        </text>
      </svg>
    );
  }

  // Décantation
  return (
    <svg viewBox="0 0 180 115" className="h-28 w-full" role="img" aria-label="Schéma de la décantation">
      {/* Eau qui s'éclaircit */}
      <rect
        x="62"
        y="32"
        width="56"
        height="66"
        rx="4"
        fill={isAnimated ? '#bae6fd' : '#a8a29e'}
        opacity="0.85"
        className="transition-colors duration-700"
      />
      {/* Dépôt lourd qui tombe au fond quand animé */}
      <rect
        x="62"
        y={isAnimated ? 82 : 92}
        width="56"
        height={isAnimated ? 16 : 6}
        rx="2"
        fill="#78350f"
        opacity="0.9"
        className="transition-all duration-700"
      />
      {/* Particules en suspension avant repos */}
      {!isAnimated && (
        <g fill="#78350f">
          <circle cx="75" cy="48" r="2.5" />
          <circle cx="96" cy="56" r="2.5" />
          <circle cx="84" cy="68" r="3" />
          <circle cx="104" cy="76" r="2.5" />
        </g>
      )}
      <path
        d="M57 22 L62 22 L62 96 Q62 100 66 100 L114 100 Q118 100 118 96 L118 22 L123 22"
        fill="none"
        stroke="#334155"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <text x="90" y="112" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
        {isAnimated ? 'Boue au fond · Eau en haut' : 'Eau boueuse agitée'}
      </text>
    </svg>
  );
};

export const SeparationSchemas: React.FC = () => {
  const [selectedVocabKey, setSelectedVocabKey] = useState<string>('homogene');
  const [animatedTechs, setAnimatedTechs] = useState<Record<string, boolean>>({});

  const activeTerm = GLOSSARY_TERMS[selectedVocabKey] ?? GLOSSARY_TERMS.homogene;

  const toggleTechAnimation = (id: string) => {
    setAnimatedTechs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="schema"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8"
      aria-labelledby="schema-title"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-wide text-indigo-700">
          Partie 2 · Carte mentale &amp; Séparation
        </p>
        <h2
          id="schema-title"
          className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          style={{ textWrap: 'balance' }}
        >
          Le schéma de la leçon et les 4 techniques animées
        </h2>
        <p className="mt-2 text-base text-slate-600">
          Explore la carte mentale en cliquant sur les mots, puis lance les animations pour voir
          comment on sépare un mélange.
        </p>
      </div>

      {/* Carte mentale interactive */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center">
          <div className="rounded-2xl bg-sky-600 px-6 py-3 font-display text-lg font-extrabold tracking-wide text-white shadow-sm">
            UN MÉLANGE
          </div>
          {/* Connecteur SVG */}
          <svg
            viewBox="0 0 400 32"
            className="h-8 w-full max-w-md text-slate-300"
            aria-hidden="true"
          >
            <path
              d="M200 0 L200 14 M85 14 L315 14 M85 14 L85 32 M315 14 L315 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Branche 1 : Décrire l'aspect */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-display text-base font-bold text-slate-900">
              1. Comment est le mélange ? (Clique sur un mot)
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {Object.entries(GLOSSARY_TERMS).map(([key, term]) => {
                const isSelected = key === selectedVocabKey;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedVocabKey(key)}
                    className={`min-h-[44px] rounded-xl border px-3 py-2 text-center text-sm font-bold transition-all ${
                      isSelected
                        ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    {term.word}
                  </button>
                );
              })}
            </div>

            <div
              key={activeTerm.id}
              className="animate-fade-slide mt-4 rounded-xl border border-sky-200 bg-white p-4"
            >
              <p className="font-display text-sm font-bold text-sky-800">
                Mot choisi : « {activeTerm.word} »
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {activeTerm.simpleDefinition}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                <strong className="font-semibold text-slate-700">Exemple :</strong>{' '}
                {activeTerm.everydayExample}
              </p>
            </div>
          </div>

          {/* Branche 2 : Résumé des 4 techniques */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-display text-base font-bold text-slate-900">
              2. Comment séparer les ingrédients ?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Dans ton cahier de CM1, on retient 4 techniques très pratiques :
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SEPARATION_TECHNIQUES.map((tech, idx) => (
                <div
                  key={tech.id}
                  className="rounded-xl border border-slate-200 bg-white p-3.5"
                >
                  <p className="font-display text-sm font-bold text-indigo-900">
                    0{idx + 1}. {tech.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{tech.whenToUse}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
              <strong className="font-bold">Phrase à retenir :</strong> « Pour séparer les
              constituants d’un mélange, on peut utiliser <strong>l’évaporation</strong>,{' '}
              <strong>le tamisage</strong>, <strong>la filtration</strong> ou{' '}
              <strong>la décantation</strong>. »
            </p>
          </div>
        </div>
      </div>

      {/* 4 Mini-Schémas Animés des Techniques de Séparation */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {SEPARATION_TECHNIQUES.map((tech) => {
          const isAnimated = Boolean(animatedTechs[tech.id]);
          return (
            <article
              key={tech.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-extrabold text-slate-900">
                    {tech.title}
                  </h3>
                  <HelpBubble
                    variant="inline"
                    align="right"
                    label="Bulle d'aide"
                    title={tech.title}
                    content={tech.helpBubble}
                    example={tech.example}
                  />
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <SeparationDiagramSvg id={tech.id} isAnimated={isAnimated} />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {isAnimated ? (
                    <strong className="font-semibold text-sky-800">{tech.activeStepLabel}</strong>
                  ) : (
                    tech.simpleHow
                  )}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-500">Ex. : {tech.example}</span>
                <button
                  type="button"
                  onClick={() => toggleTechAnimation(tech.id)}
                  className={`inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap ${
                    isAnimated
                      ? 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isAnimated ? (
                    <>
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Revenir au début</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Lancer l’animation</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
