import React, { useEffect, useReducer } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main';
import Loader from './components/Err&Loa/Loader';
import Error from './components/Err&Loa/Error';
import StartScreen from './components/StartScreen';
import Questions from './components/Questions/Questions';

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
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
      };

    default:
      throw new Error('Action unknown');
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
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
        {/* <p>1/15</p>
        <p>Question?</p>
        <h1>CL9</h1> */}
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === 'active' && <Questions question={questions[index]} />}
      </Main>
    </div>
  );
}
