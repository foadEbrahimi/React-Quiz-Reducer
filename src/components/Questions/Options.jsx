import React from 'react';

export default function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswer}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswer
              ? index === question.correctOption
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
