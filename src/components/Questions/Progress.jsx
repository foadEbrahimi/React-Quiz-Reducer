import React from 'react';
import { useQuiz } from '../../context/QuizProvider';

export default function Progress() {
  const { index, points, maxPossiblePoints, answer, numQuestions } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points} / </strong> {maxPossiblePoints}
      </p>
    </header>
  );
}
