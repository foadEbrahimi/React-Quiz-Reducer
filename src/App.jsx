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
import { useQuiz } from './context/QuizProvider';

export default function App() {
  const { questions, status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {/*<h1>CL9</h1> */}
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Questions />
            <footer>
              <Timer />
              <NextQuestion />
            </footer>
          </>
        )}
        {status === 'finished' && <FinishedScreen />}
      </Main>
    </div>
  );
}
