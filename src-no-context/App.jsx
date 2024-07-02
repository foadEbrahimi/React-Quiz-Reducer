import React, { useEffect, useReducer } from 'react';
import Error from './components/Err&Loa/Error';
import Loader from './components/Err&Loa/Loader';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Questions from './components/Questions/Questions';
import StartScreen from './components/StartScreen';
import NextQuestion from './components/Questions/NextQuestion';
import Progress from './components/Questions/Progress';
import FinishedScreen from './components/FinishedScreen';
import Timer from './components/Timer';

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
        question: state.questions,
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

export default function App() {
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
    <div className="app">
      <Header />
      <Main>
        {/*<h1>CL9</h1> */}
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={questions.length}
              />
            </footer>
          </>
        )}
        {status === 'finished' && (
          <FinishedScreen
            dispatch={dispatch}
            points={points}
            higtScore={higtScore}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}
