import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  Star,
  XCircle,
} from 'lucide-react';
import { EXERCISE_SETS } from '../data/melangesData';
import {
  AnswersState,
  computeQuizStats,
  createInitialAnswers,
  evaluateQuestionAnswer,
  getSummaryEncouragement,
} from '../utils/quizLogic';
import { HelpBubble } from './HelpBubble';

export const QuizSection: React.FC = () => {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [activeQuestionPages, setActiveQuestionPages] = useState<number[]>(() =>
    EXERCISE_SETS.map(() => 0)
  );
  const [userAnswers, setUserAnswers] = useState<AnswersState>(() => createInitialAnswers());

  const stats = computeQuizStats(userAnswers);
  const currentEx = EXERCISE_SETS[activeExerciseIndex];
  const currentStat = stats.perExercise[activeExerciseIndex];
  const currentPageIdx = activeQuestionPages[activeExerciseIndex];
  const currentQuestion = currentEx.questions[currentPageIdx];
  const currentAnswer = userAnswers[activeExerciseIndex][currentPageIdx];
  const isAnswered = currentAnswer !== null;

  const handleAnswer = (submittedValue: number | string) => {
    if (isAnswered) return;
    const evaluated = evaluateQuestionAnswer(currentQuestion, submittedValue);
    if (!evaluated) return;

    setUserAnswers((prev) => {
      const next = prev.map((row) => [...row]);
      next[activeExerciseIndex][currentPageIdx] = evaluated;
      return next;
    });
  };

  const goToPage = (pageIdx: number) => {
    if (pageIdx < 0 || pageIdx >= currentEx.questions.length) return;
    setActiveQuestionPages((prev) => {
      const next = [...prev];
      next[activeExerciseIndex] = pageIdx;
      return next;
    });
  };

  const switchExercise = (exIdx: number) => {
    if (exIdx < 0 || exIdx >= EXERCISE_SETS.length) return;
    setActiveExerciseIndex(exIdx);
  };

  const resetCurrentExercise = () => {
    setUserAnswers((prev) => {
      const next = prev.map((row) => [...row]);
      next[activeExerciseIndex] = currentEx.questions.map(() => null);
      return next;
    });
    goToPage(0);
  };

  const resetAllExercises = () => {
    setUserAnswers(createInitialAnswers());
    setActiveQuestionPages(EXERCISE_SETS.map(() => 0));
    setActiveExerciseIndex(0);
  };

  const scrollToSummary = () => {
    document.getElementById('bilan-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      id="exercices"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8"
      aria-labelledby="exercices-title"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-wide text-amber-700">
          Partie 3 · Entraînement CM1
        </p>
        <h2
          id="exercices-title"
          className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          style={{ textWrap: 'balance' }}
        >
          5 exercices de 5 questions
        </h2>
        <p className="mt-2 text-base text-slate-600">
          Avance question par question. Tu peux ouvrir une bulle d’indice si tu hésites !
        </p>
      </div>

      {/* Coque principale du Quiz */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Barre de progression globale */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 px-5 py-4 text-white sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold tabular-nums text-sky-200">
              Avancement : {stats.totalAnswered} / {stats.totalQuestions} questions
            </span>
            <button
              type="button"
              onClick={resetAllExercises}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-rose-400 hover:text-white whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Tout recommencer</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1" aria-label={`${stats.earnedStars} étoiles sur 3`}>
              {[1, 2, 3].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`h-4 w-4 ${
                    starIdx <= stats.earnedStars
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-display text-lg font-extrabold tabular-nums text-amber-400">
              {stats.totalCorrect} / {stats.totalQuestions}
            </span>
          </div>
        </div>

        {/* Barre de progression colorée */}
        <div className="h-2 w-full bg-slate-200">
          <div
            className="h-full bg-sky-600 transition-all duration-300"
            style={{ width: `${stats.progressPercent}%` }}
          />
        </div>

        {/* Onglets des 5 exercices */}
        <div
          className="grid grid-cols-2 gap-2 border-b border-slate-200 bg-slate-100 p-3 sm:grid-cols-5"
          role="tablist"
          aria-label="Liste des 5 exercices"
        >
          {EXERCISE_SETS.map((ex, idx) => {
            const exStat = stats.perExercise[idx];
            const isActive = idx === activeExerciseIndex;
            const badgeText = exStat.isPerfect
              ? '5/5 ✓'
              : `${exStat.correct}/${exStat.total}`;

            return (
              <button
                key={ex.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => switchExercise(idx)}
                className={`flex min-h-[54px] flex-col items-center justify-center rounded-xl border-2 px-2 py-2 text-center transition-all ${
                  isActive
                    ? 'border-sky-600 bg-white shadow-sm'
                    : 'border-transparent bg-white/70 hover:bg-white'
                }`}
              >
                <span className="font-display text-xs font-extrabold text-slate-900 sm:text-sm whitespace-nowrap">
                  {ex.shortTitle} · <span className="tabular-nums">{badgeText}</span>
                </span>
                <span className="mt-0.5 max-w-full truncate text-[11px] font-medium text-slate-500">
                  {ex.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* En-tête de l'exercice actif */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-sky-700">{currentEx.subtitle}</p>
            <h3 className="mt-0.5 font-display text-lg font-extrabold text-slate-900 sm:text-xl">
              {currentEx.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{currentEx.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-extrabold tabular-nums text-slate-900">
              {currentStat.correct} / {currentStat.total}
            </span>
            <button
              type="button"
              onClick={resetCurrentExercise}
              className="min-h-[40px] rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-rose-400 hover:text-rose-700 whitespace-nowrap"
            >
              Refaire cet exercice
            </button>
          </div>
        </div>

        {/* Barre de pagination interne (Pages 1/5 à 5/5) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3 sm:px-6">
          <span className="text-sm font-bold tabular-nums text-sky-800">
            Page {currentPageIdx + 1} sur {currentEx.questions.length}
          </span>

          <div className="flex items-center gap-2" role="navigation" aria-label="Pages de l'exercice">
            {currentEx.questions.map((_, qIdx) => {
              const ans = userAnswers[activeExerciseIndex][qIdx];
              const isActiveDot = qIdx === currentPageIdx;

              let dotClass = 'border-slate-300 bg-slate-50 text-slate-600 hover:border-sky-500';
              if (ans !== null && ans.isCorrect) {
                dotClass = isActiveDot
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-emerald-500 bg-emerald-50 text-emerald-800';
              } else if (ans !== null && !ans.isCorrect) {
                dotClass = isActiveDot
                  ? 'border-rose-600 bg-rose-600 text-white'
                  : 'border-rose-500 bg-rose-50 text-rose-800';
              } else if (isActiveDot) {
                dotClass = 'border-sky-600 bg-sky-600 text-white';
              }

              return (
                <button
                  key={qIdx}
                  type="button"
                  aria-label={`Aller à la question ${qIdx + 1}`}
                  aria-current={isActiveDot ? 'page' : undefined}
                  onClick={() => goToPage(qIdx)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 text-sm font-extrabold tabular-nums transition-colors ${dotClass}`}
                >
                  {qIdx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question active */}
        <div className="p-5 sm:p-7">
          <article
            key={`${activeExerciseIndex}-${currentPageIdx}`}
            className={`animate-fade-slide rounded-2xl border-2 p-5 sm:p-6 ${
              isAnswered
                ? currentAnswer.isCorrect
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : 'border-rose-300 bg-rose-50/40'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Question {currentPageIdx + 1} sur 5
              </span>

              <div className="flex items-center gap-3">
                {!isAnswered && (
                  <HelpBubble
                    variant="inline"
                    align="right"
                    label="Besoin d'un indice ?"
                    title="Indice CM1"
                    content={currentQuestion.hint}
                  />
                )}
                {isAnswered && (
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-extrabold ${
                      currentAnswer.isCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {currentAnswer.isCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        <span>Validé</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" aria-hidden="true" />
                        <span>À revoir</span>
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>

            {currentQuestion.type === 'choice' ? (
              <>
                <p className="mt-4 font-display text-lg font-bold leading-snug text-slate-900">
                  {currentQuestion.prompt}
                </p>
                <div
                  className={`mt-5 grid gap-3 ${
                    currentQuestion.options.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1'
                  }`}
                >
                  {currentQuestion.options.map((optText, optIdx) => {
                    const isTwoCols = currentQuestion.options.length === 2;
                    const letter = isTwoCols
                      ? optIdx === 0
                        ? 'V'
                        : 'F'
                      : String.fromCharCode(65 + optIdx);

                    let btnClass =
                      'border-slate-200 bg-slate-50 text-slate-900 hover:border-sky-500 hover:bg-white';
                    let badgeClass = 'border-slate-300 bg-white text-slate-800';
                    let badgeLabel = letter;

                    if (isAnswered) {
                      if (optIdx === currentQuestion.answerIndex) {
                        btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        badgeClass = 'border-emerald-600 bg-emerald-600 text-white';
                        badgeLabel = '✓';
                      } else if (optIdx === currentAnswer.value && !currentAnswer.isCorrect) {
                        btnClass = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                        badgeClass = 'border-rose-600 bg-rose-600 text-white';
                        badgeLabel = '✕';
                      } else {
                        btnClass = 'border-slate-200 bg-slate-50 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleAnswer(optIdx)}
                        className={`flex min-h-[52px] w-full items-center gap-3.5 rounded-xl border-2 px-4 py-3 text-left text-base font-medium transition-all ${btnClass}`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-extrabold ${badgeClass}`}
                        >
                          {badgeLabel}
                        </span>
                        <span>{optText}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Exercice 3 : Phrase à trou interactive avec boutons-étiquettes */
              <div className="mt-4">
                <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-base font-semibold leading-loose text-slate-900 sm:text-lg">
                  <span>{currentQuestion.before}</span>
                  <span
                    className={`mx-1.5 inline-block rounded-lg border-2 px-3 py-0.5 font-extrabold ${
                      isAnswered
                        ? currentAnswer.isCorrect
                          ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
                          : 'border-rose-500 bg-rose-100 text-rose-900'
                        : 'border-dashed border-sky-400 bg-white text-sky-700'
                    }`}
                  >
                    {isAnswered ? String(currentAnswer.value) : '________'}
                  </span>
                  <span>{currentQuestion.after}</span>
                </p>

                <p className="mt-4 text-xs font-semibold text-slate-500">
                  Clique sur le bon mot pour compléter la phrase :
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {currentQuestion.choices.map((choice) => {
                    let chipStyle =
                      'border-slate-300 bg-white text-slate-800 hover:border-sky-600 hover:bg-sky-50';
                    if (isAnswered) {
                      if (choice === currentQuestion.answer) {
                        chipStyle = 'border-emerald-600 bg-emerald-100 text-emerald-950 font-bold';
                      } else if (choice === currentAnswer.value && !currentAnswer.isCorrect) {
                        chipStyle = 'border-rose-500 bg-rose-100 text-rose-950 font-bold';
                      } else {
                        chipStyle = 'border-slate-200 bg-slate-100 text-slate-400 opacity-65';
                      }
                    }

                    return (
                      <button
                        key={choice}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleAnswer(choice)}
                        className={`min-h-[44px] rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all whitespace-nowrap ${chipStyle}`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Explication immédiate après réponse */}
            {isAnswered && (
              <div
                className={`animate-fade-slide mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed ${
                  currentAnswer.isCorrect
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                    : 'border-amber-200 bg-amber-50 text-amber-950'
                }`}
              >
                {currentAnswer.isCorrect ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                ) : (
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                )}
                <p>
                  <strong>
                    {currentAnswer.isCorrect ? 'Bonne réponse ! ' : 'Explication : '}
                  </strong>
                  {currentAnswer.isCorrect
                    ? currentQuestion.feedbackOk
                    : currentQuestion.feedbackKo}
                </p>
              </div>
            )}
          </article>
        </div>

        {/* Pied de navigation pas-à-pas */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          {currentPageIdx > 0 ? (
            <button
              type="button"
              onClick={() => goToPage(currentPageIdx - 1)}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-sky-500 hover:bg-sky-50 whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Question précédente</span>
            </button>
          ) : activeExerciseIndex > 0 ? (
            <button
              type="button"
              onClick={() => switchExercise(activeExerciseIndex - 1)}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-sky-500 hover:bg-sky-50 whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Exercice précédent</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-400 opacity-60 whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Question précédente</span>
            </button>
          )}

          <span className="text-sm font-semibold tabular-nums text-slate-600">
            {currentEx.shortTitle} · Page {currentPageIdx + 1} / 5 ({currentStat.answered} répondue(s))
          </span>

          {currentPageIdx < currentEx.questions.length - 1 ? (
            <button
              type="button"
              onClick={() => goToPage(currentPageIdx + 1)}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700 whitespace-nowrap"
            >
              <span>Question suivante</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : activeExerciseIndex < EXERCISE_SETS.length - 1 ? (
            <button
              type="button"
              onClick={() => switchExercise(activeExerciseIndex + 1)}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700 whitespace-nowrap"
            >
              <span>Exercice suivant</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={scrollToSummary}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 whitespace-nowrap"
            >
              <span>Voir le bilan final</span>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Bilan global des 5 exercices */}
      <div
        id="bilan-quiz"
        className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8"
        aria-live="polite"
      >
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`h-7 w-7 transition-colors ${
                starIdx <= stats.earnedStars
                  ? 'fill-amber-400 text-amber-500'
                  : 'text-slate-300'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <h3 className="mt-3 font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
          Bilan de ton entraînement
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
          {getSummaryEncouragement(stats)}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {EXERCISE_SETS.map((ex, idx) => {
            const s = stats.perExercise[idx];
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => switchExercise(idx)}
                className={`rounded-2xl border p-3.5 text-center transition-colors ${
                  s.isPerfect
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-sky-300'
                }`}
              >
                <span className="block text-xs font-bold text-slate-500">{ex.shortTitle}</span>
                <span className="mt-1 block font-display text-lg font-extrabold tabular-nums">
                  {s.correct} / {s.total}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={resetAllExercises}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 hover:border-sky-500 hover:bg-sky-50"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>Tout recommencer à zéro</span>
        </button>
      </div>
    </section>
  );
};
