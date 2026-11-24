import test from 'node:test';
import assert from 'node:assert/strict';
import { EXERCISE_SETS, SORTING_GAME_ITEMS } from '../data/melangesData';
import {
  computeQuizStats,
  createInitialAnswers,
  evaluateQuestionAnswer,
  evaluateSortingChoice,
  getSummaryEncouragement,
} from './quizLogic';

test('createInitialAnswers creates 5 exercises of 5 null answers (25 total)', () => {
  const answers = createInitialAnswers();
  assert.equal(answers.length, 5);
  answers.forEach((ex) => assert.equal(ex.length, 5));
  const stats = computeQuizStats(answers);
  assert.equal(stats.totalQuestions, 25);
  assert.equal(stats.totalAnswered, 0);
  assert.equal(stats.totalCorrect, 0);
  assert.equal(stats.earnedStars, 0);
});

test('evaluateQuestionAnswer handles choice and cloze questions accurately', () => {
  const choiceQ = EXERCISE_SETS[0].questions[0];
  const okChoice = evaluateQuestionAnswer(choiceQ, 0);
  assert.deepEqual(okChoice, { value: 0, isCorrect: true });

  const badChoice = evaluateQuestionAnswer(choiceQ, 1);
  assert.deepEqual(badChoice, { value: 1, isCorrect: false });

  const outOfBounds = evaluateQuestionAnswer(choiceQ, 99);
  assert.equal(outOfBounds, null);

  const clozeQ = EXERCISE_SETS[2].questions[0];
  const okCloze = evaluateQuestionAnswer(clozeQ, 'homogène');
  assert.deepEqual(okCloze, { value: 'homogène', isCorrect: true });

  const emptyCloze = evaluateQuestionAnswer(clozeQ, '');
  assert.equal(emptyCloze, null);
});

test('computeQuizStats tracks stars, progressPercent, and perExercise completion', () => {
  const answers = createInitialAnswers();
  // Answer all 5 in Exercise 1 correctly
  EXERCISE_SETS[0].questions.forEach((q, idx) => {
    if (q.type === 'choice') {
      answers[0][idx] = evaluateQuestionAnswer(q, q.answerIndex);
    }
  });
  // Answer 1 wrong in Exercise 2
  answers[1][0] = { value: 1, isCorrect: false };

  const stats = computeQuizStats(answers);
  assert.equal(stats.totalAnswered, 6);
  assert.equal(stats.totalCorrect, 5);
  assert.equal(stats.progressPercent, 24);
  assert.equal(stats.earnedStars, 1);
  assert.equal(stats.perExercise[0].isComplete, true);
  assert.equal(stats.perExercise[0].isPerfect, true);
  assert.equal(stats.perExercise[1].isComplete, false);
  assert.equal(stats.perExercise[1].correct, 0);
});

test('getSummaryEncouragement returns appropriate CM1 feedback messages', () => {
  const answers = createInitialAnswers();
  const emptyStats = computeQuizStats(answers);
  assert.match(getSummaryEncouragement(emptyStats), /3 étoiles/);

  EXERCISE_SETS.forEach((ex, exIdx) => {
    ex.questions.forEach((q, qIdx) => {
      answers[exIdx][qIdx] =
        q.type === 'choice'
          ? evaluateQuestionAnswer(q, q.answerIndex)
          : evaluateQuestionAnswer(q, q.answer);
    });
  });

  const perfectStats = computeQuizStats(answers);
  assert.equal(perfectStats.earnedStars, 3);
  assert.equal(perfectStats.totalCorrect, 25);
  assert.match(getSummaryEncouragement(perfectStats), /25 \/ 25/);
});

test('evaluateSortingChoice correctly validates CM1 sorting game items', () => {
  const sirop = SORTING_GAME_ITEMS.find((i) => i.id === 'sort-sirop')!;
  const huile = SORTING_GAME_ITEMS.find((i) => i.id === 'sort-huile')!;
  assert.equal(evaluateSortingChoice(sirop, 'homogene'), true);
  assert.equal(evaluateSortingChoice(sirop, 'heterogene'), false);
  assert.equal(evaluateSortingChoice(huile, 'heterogene'), true);
});
