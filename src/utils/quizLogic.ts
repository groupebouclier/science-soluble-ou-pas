import { EXERCISE_SETS, QuizQuestion, SortingItem } from '../data/melangesData';

export interface AnswerRecord {
  value: number | string;
  isCorrect: boolean;
}

export type AnswersState = (AnswerRecord | null)[][];

export interface ExerciseStat {
  answered: number;
  correct: number;
  total: number;
  isComplete: boolean;
  isPerfect: boolean;
}

export interface GlobalQuizStats {
  totalAnswered: number;
  totalCorrect: number;
  totalQuestions: number;
  progressPercent: number;
  perExercise: ExerciseStat[];
  earnedStars: number;
}

export function createInitialAnswers(): AnswersState {
  return EXERCISE_SETS.map((ex) => ex.questions.map(() => null));
}

export function evaluateQuestionAnswer(
  question: QuizQuestion,
  submittedValue: number | string
): AnswerRecord | null {
  if (question.type === 'choice') {
    if (typeof submittedValue !== 'number') return null;
    if (submittedValue < 0 || submittedValue >= question.options.length) return null;
    return {
      value: submittedValue,
      isCorrect: submittedValue === question.answerIndex,
    };
  }

  if (typeof submittedValue !== 'string' || submittedValue.trim() === '') {
    return null;
  }

  return {
    value: submittedValue,
    isCorrect: submittedValue === question.answer,
  };
}

export function computeQuizStats(answers: AnswersState): GlobalQuizStats {
  let totalAnswered = 0;
  let totalCorrect = 0;
  let totalQuestions = 0;

  const perExercise: ExerciseStat[] = EXERCISE_SETS.map((ex, exIdx) => {
    const exAnswers = answers[exIdx] ?? [];
    let answered = 0;
    let correct = 0;
    const total = ex.questions.length;

    exAnswers.forEach((ans) => {
      if (ans !== null) {
        answered += 1;
        if (ans.isCorrect) correct += 1;
      }
    });

    totalAnswered += answered;
    totalCorrect += correct;
    totalQuestions += total;

    return {
      answered,
      correct,
      total,
      isComplete: answered === total,
      isPerfect: answered === total && correct === total,
    };
  });

  const progressPercent =
    totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  let earnedStars = 0;
  if (totalCorrect >= 22) earnedStars = 3;
  else if (totalCorrect >= 14) earnedStars = 2;
  else if (totalCorrect >= 5) earnedStars = 1;

  return {
    totalAnswered,
    totalCorrect,
    totalQuestions,
    progressPercent,
    perExercise,
    earnedStars,
  };
}

export function getSummaryEncouragement(stats: GlobalQuizStats): string {
  if (stats.totalAnswered === 0) {
    return 'Réponds aux 25 questions réparties dans les 5 exercices pour gagner tes 3 étoiles de jeune scientifique !';
  }
  if (stats.totalAnswered < stats.totalQuestions) {
    return `Tu as déjà répondu à ${stats.totalAnswered} question(s) sur ${stats.totalQuestions} (${stats.totalCorrect} bonne(s) réponse(s)). Continue comme ça !`;
  }
  if (stats.totalCorrect === stats.totalQuestions) {
    return 'Score parfait 25 / 25 ! Tu maîtrises toute la leçon de CM1 sur les mélanges !';
  }
  if (stats.totalCorrect >= 18) {
    return `Très beau travail ! Tu as obtenu ${stats.totalCorrect} / ${stats.totalQuestions}. Relis les quelques explications pour viser le sans-faute.`;
  }
  return `Bravo d’avoir tout terminé (${stats.totalCorrect} / ${stats.totalQuestions}) ! N’hésite pas à refaire un tour au Labo des Mélanges puis à réessayer.`;
}

export function evaluateSortingChoice(
  item: SortingItem,
  chosenCategory: 'homogene' | 'heterogene'
): boolean {
  return item.category === chosenCategory;
}
