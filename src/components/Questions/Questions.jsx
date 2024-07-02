import React from 'react';
import Options from './Options';
import { useQuiz } from '../../context/QuizProvider';

export default function Questions() {
  const { questions, index } = useQuiz();
  return (
    <div>
      <h4>{questions[index]?.question}</h4>
      <Options />
    </div>
  );
}
