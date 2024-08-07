import React from 'react';
import { useQuiz } from '../context/QuizProvider';

export default function StartScreen() {
  const { dispatch, numQuestions } = useQuiz();
  return (
    <div className="start">
      <h2>Wellcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Lest Start
      </button>
    </div>
  );
}
