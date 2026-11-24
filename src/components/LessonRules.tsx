import React from 'react';
import { GLOSSARY_TERMS } from '../data/melangesData';
import { GlossaryWord, HelpBubble } from './HelpBubble';

export const LessonRules: React.FC = () => {
  return (
    <section
      id="cours"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8"
      aria-labelledby="cours-title"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-wide text-sky-700">
          Partie 1 · La leçon du cahier
        </p>
        <h2
          id="cours-title"
          className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          style={{ textWrap: 'balance' }}
        >
          Les 4 règles à retenir facilement
        </h2>
        <p className="mt-2 text-base text-slate-600">
          Clique sur les mots colorés avec un point d’interrogation pour ouvrir leur{' '}
          <strong className="font-semibold text-slate-800">bulle d’aide</strong>.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Règle 1 : Eau + Sirop */}
        <article className="flex flex-col justify-between rounded-2xl border border-slate-200 border-t-4 border-t-emerald-500 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
              <span>01 · Deux liquides</span>
              <span className="text-emerald-700">Exemple : eau + sirop</span>
            </div>

            <div className="mt-4 flex items-start gap-4">
              <div className="shrink-0 rounded-xl border border-slate-100 bg-slate-50 p-2">
                <svg viewBox="0 0 60 72" width="52" height="62" aria-hidden="true">
                  <rect x="12" y="24" width="36" height="40" rx="3" fill="#fb7185" opacity="0.88" />
                  <path
                    d="M9 10 L12 10 L12 62 Q12 65 15 65 L45 65 Q48 65 48 62 L48 10 L51 10"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-base leading-relaxed text-slate-800">
                Quand on mélange deux liquides (eau + sirop), on dit que le mélange est{' '}
                <GlossaryWord term={GLOSSARY_TERMS.homogene} /> si on ne voit plus qu’un seul
                liquide. On dit qu’ils sont <GlossaryWord term={GLOSSARY_TERMS.miscibles} />.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span>Mélange homogène · Liquides miscibles</span>
            <HelpBubble
              variant="inline"
              align="right"
              label="Astuce"
              title="Retenir « miscibles »"
              content="« Miscibles » ressemble à « mélanger ». Deux liquides miscibles aiment se mélanger !"
              example="L’eau et le sirop de fraise, ou l’eau et le jus de pomme."
            />
          </div>
        </article>

        {/* Règle 2 : Eau + Huile */}
        <article className="flex flex-col justify-between rounded-2xl border border-slate-200 border-t-4 border-t-amber-500 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
              <span>02 · Deux liquides</span>
              <span className="text-amber-700">Exemple : eau + huile</span>
            </div>

            <div className="mt-4 flex items-start gap-4">
              <div className="shrink-0 rounded-xl border border-slate-100 bg-slate-50 p-2">
                <svg viewBox="0 0 60 72" width="52" height="62" aria-hidden="true">
                  <rect x="12" y="24" width="36" height="16" fill="#facc15" />
                  <rect x="12" y="40" width="36" height="24" rx="2" fill="#38bdf8" />
                  <path
                    d="M9 10 L12 10 L12 62 Q12 65 15 65 L45 65 Q48 65 48 62 L48 10 L51 10"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-base leading-relaxed text-slate-800">
                Quand on mélange deux liquides (eau + huile), on dit que le mélange est{' '}
                <GlossaryWord term={GLOSSARY_TERMS.heterogene} /> si on voit encore les deux
                couches. On dit qu’ils sont <GlossaryWord term={GLOSSARY_TERMS.nonMiscibles} />.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span>Mélange hétérogène · Liquides non miscibles</span>
            <HelpBubble
              variant="inline"
              align="right"
              label="Astuce"
              title="Pourquoi deux étages ?"
              content="L’huile et l’eau refusent de se mélanger : on ajoute « non » devant miscibles."
              example="Dans la vinaigrette, l’huile remonte toujours au-dessus."
            />
          </div>
        </article>

        {/* Règle 3 : Eau + Sel */}
        <article className="flex flex-col justify-between rounded-2xl border border-slate-200 border-t-4 border-t-indigo-500 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
              <span>03 · Un solide et un liquide</span>
              <span className="text-indigo-700">Exemple : eau + sel</span>
            </div>

            <div className="mt-4 flex items-start gap-4">
              <div className="shrink-0 rounded-xl border border-slate-100 bg-slate-50 p-2">
                <svg viewBox="0 0 60 72" width="52" height="62" aria-hidden="true">
                  <rect x="12" y="24" width="36" height="40" rx="3" fill="#bae6fd" opacity="0.85" />
                  <path
                    d="M9 10 L12 10 L12 62 Q12 65 15 65 L45 65 Q48 65 48 62 L48 10 L51 10"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-base leading-relaxed text-slate-800">
                Quand on mélange un solide et un liquide (eau + sel), on ne voit plus le sel dans
                l’eau : le mélange est <GlossaryWord term={GLOSSARY_TERMS.homogene} /> et on dit que
                le sel est <GlossaryWord term={GLOSSARY_TERMS.soluble} /> dans l’eau.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span>Mélange homogène · Solide soluble</span>
            <HelpBubble
              variant="inline"
              align="right"
              label="Astuce"
              title="Soluble ou miscible ?"
              content="Pour un SOLIDE (sel, sucre) dans un liquide, on dit toujours « soluble ». Pour deux LIQUIDES, on dit « miscibles »."
              example="Le sucre fond dans le thé chaud : le sucre est soluble."
            />
          </div>
        </article>

        {/* Règle 4 : Eau + Riz */}
        <article className="flex flex-col justify-between rounded-2xl border border-slate-200 border-t-4 border-t-rose-500 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
              <span>04 · Un liquide et un solide</span>
              <span className="text-rose-700">Exemple : eau + riz</span>
            </div>

            <div className="mt-4 flex items-start gap-4">
              <div className="shrink-0 rounded-xl border border-slate-100 bg-slate-50 p-2">
                <svg viewBox="0 0 60 72" width="52" height="62" aria-hidden="true">
                  <rect x="12" y="24" width="36" height="40" rx="3" fill="#bae6fd" opacity="0.85" />
                  <ellipse cx="22" cy="59" rx="4" ry="2" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" />
                  <ellipse cx="31" cy="60" rx="4" ry="2" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" />
                  <ellipse cx="39" cy="58" rx="4" ry="2" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" />
                  <path
                    d="M9 10 L12 10 L12 62 Q12 65 15 65 L45 65 Q48 65 48 62 L48 10 L51 10"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-base leading-relaxed text-slate-800">
                Quand on mélange un liquide et un solide (eau + riz), on voit toujours les grains de
                riz : le mélange est <GlossaryWord term={GLOSSARY_TERMS.heterogene} /> et le riz{' '}
                <GlossaryWord term={GLOSSARY_TERMS.nonSoluble} /> dans l’eau.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span>Mélange hétérogène · Solide non soluble</span>
            <HelpBubble
              variant="inline"
              align="right"
              label="Astuce"
              title="Des grains toujours visibles"
              content="Le riz, le sable ou les cailloux ne disparaissent pas dans l’eau : ils restent au fond du verre."
              example="À la plage, le sable reste au fond du seau d’eau."
            />
          </div>
        </article>
      </div>
    </section>
  );
};
