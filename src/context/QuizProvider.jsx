import React, { createContext, useContext, useEffect, useReducer } from 'react';
const QuizContext = createContext();

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  higtScore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case 'finish':
      return {
        ...state,
        status: 'finished',
        higtScore:
          state.points > state.higtScore ? state.points : state.higtScore,
      };

    case 'reset':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };

    case 'tick':
      return {
        ...state,
        // question: state.questions,
        // status: 'finish',
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Action unknown');
  }
}
function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, higtScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPossiblePoints = questions.reduce(
    (prev, next) => prev + next.points,
    0
  );
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data =>
        setTimeout(() => {
          dispatch({ type: 'dataReceived', payload: data });
        }, 1000)
      )
      .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        dispatch,
        status,
        index,
        answer,
        points,
        higtScore,
        numQuestions: questions.length,
        secondsRemaining,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error('Unknow context');
  return context;
}
export { QuizProvider, useQuiz };
