import React from 'react';
import { useQuiz } from '../../context/QuizProvider';

export default function Options() {
  const { questions, index: indexContext, dispatch, answer } = useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {questions[indexContext].options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswer}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswer
              ? index === questions[indexContext].correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
