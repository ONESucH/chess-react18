import { useEffect, useState } from 'react';
import { Cell } from '../../components/Cell';
import './MainChess.css';

export default () => {
  const [ userStep, setUserStep ] = useState(false);
  const [ users, setUsers ] = useState({
    userOne: 'Игрок 1',
    userTwo: 'Игрок 2',
    userOneSteps: 0,
    userTwoSteps: 0,
  });
  const [ playGame, setPlayGame ] = useState(0);
  const [ activePawn, setActivePawn ] = useState('');
  const [ timerGame, setTimerGame ] = useState(0);
  const [ userColor, setUserColor ] = useState('#000000');
  const [ userColorMain, setUserColorMain ] = useState('#1ceeee');
  const [ stepHistory, setStepHistory ] = useState([
    {
      A8: 'towerMain',
      B8: 'horseMain',
      C8: 'elephantMain',
      D8: 'ladyMain',
      E8: 'kingMain',
      F8: 'elephantMain',
      G8: 'horseMain',
      H8: 'towerMain',
    },
    {
      A7: 'pawnMain',
      B7: 'pawnMain',
      C7: 'pawnMain',
      D7: 'pawnMain',
      E7: 'pawnMain',
      F7: 'pawnMain',
      G7: 'pawnMain',
      H7: 'pawnMain',
    },
    {
      A6: '',
      B6: '',
      C6: '',
      D6: '',
      E6: '',
      F6: '',
      G6: '',
      H6: '',
    },
    {
      A5: '',
      B5: '',
      C5: '',
      D5: '',
      E5: '',
      F5: '',
      G5: '',
      H5: '',
    },
    {
      A4: '',
      B4: '',
      C4: '',
      D4: '',
      E4: '',
      F4: '',
      G4: '',
      H4: '',
    },
    {
      A3: '',
      B3: '',
      C3: '',
      D3: '',
      E3: '',
      F3: '',
      G3: '',
      H3: '',
    },
    {
      A2: 'pawn',
      B2: 'pawn',
      C2: 'pawn',
      D2: 'pawn',
      E2: 'pawn',
      F2: 'pawn',
      G2: 'pawn',
      H2: 'pawn',
    },
    {
      A1: 'tower',
      B1: 'horse',
      C1: 'elephant',
      D1: 'lady',
      E1: 'king',
      F1: 'elephant',
      G1: 'horse',
      H1: 'tower',
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerGame(timerGame + 1);
    }, 1000);

    if (timerGame && timerGame === 60 || !playGame) {
      clearTimeout(timer);
      stopGame();
    }
  }, [ timerGame, playGame ]);

  const startGame = () => {
    setPlayGame(1);
    setTimerGame(1);
  };

  const stopGame = () => {
    setTimerGame(0);
    setPlayGame(0);
    setActivePawn('');
    setUserStep(false);
  };

  // Активный ход фигуры
  const activeMove = (e) => {
    if (!timerGame) return;

    const icon = e.currentTarget;
    const parentTag = e.currentTarget.parentNode;
    const cellID = parentTag.getAttribute('id');
    const getName = e.target.getAttribute('name');

    // Какой игрок ходит?
    if ((getName === 'ladyMain' || getName === 'kingMain' || getName === 'elephantMain' || getName === 'horseMain' || getName === 'towerMain' || getName === 'pawnMain') && !userStep) {
      whichPawnThePlayerChose(getName, icon, cellID);
      setUsers((props) => ({
        ...props,
        userOneSteps: props.userOneSteps++
      }))
      setUserStep(true);
    }
    if ((getName === 'lady' || getName === 'king' || getName === 'elephant' || getName === 'horse' || getName === 'tower' || getName === 'pawn') && userStep) {
      whichPawnThePlayerChose(getName, icon, cellID);
      setUsers((props) => ({
        ...props,
        userTwoSteps: props.userTwoSteps++
      }))
      setUserStep(false);
    }
  };

  // Определим какую пешку выбрал игрок
  const whichPawnThePlayerChose = (name, icon, cellID) => {
    icon.style.marginTop = '-15px';
    // Активная пешка
    setActivePawn(name);
    pawnCapabilities(name, icon, cellID);
  };

  // Определим возможные ходы
  const pawnCapabilities = (name, icon, cellID) => {
    let cellABC = cellID[0];
    let cellNumber = +cellID[1];
    let nextStep = '';

    stepHistory.map(item => {
      if (name === 'pawnMain' && item[cellID]) {
        //nextStep = `${cellABC}${cellNumber + 1}`;
        //updateHistory(item[cellID], nextStep);
        //item[cellID] = '';
      }
      if (name === 'pawn' && item[cellID]) {
        //nextStep = `${cellABC}${cellNumber - 1}`;
        //updateHistory(item[cellID], nextStep);
        //item[name] = '';
      }
      if (name === 'towerMain' && item[cellID]) {

      }
      return item;
    });
  };

  // Обновляем историю ходов
  const updateHistory = (nextStep, id) => {
    stepHistory.map((item) => {
      if (id in item) item[id] = nextStep;
      return item;
    });
    setStepHistory(stepHistory);
  };

  return (
    <div className="game">
      <div className="game-users">
        <div className="user-descriptions">
          <h5>Кто учавстует в данной игре?</h5>
        </div>
        <div className="user">
          <input type="color" value={userColor} onChange={(e) => setUserColor(e.target.value)}/>
          <p>{users.userOne}</p>
        </div>
        <div className="user-main">
          <input type="color" value={userColorMain} onChange={(e) => setUserColorMain(e.target.value)}/>
          <p>{users.userTwo}</p>
        </div>
        <div className="counter-step">
          <h5>Количество ходов участников</h5>
          <p style={{ color: userColor}}>{users.userOne} : <span>{users.userOneSteps}</span></p>
          <p style={{ color: userColorMain}}>{users.userTwo} : <span>{users.userTwoSteps}</span></p>
        </div>
      </div>
      <div className="game-dashboard">
        <div className="game-title">
          <h2>Chess GAME</h2>
        </div>
        <div className="game-timer">
          <button onClick={() => !playGame ? startGame() : stopGame()}>
            {!timerGame ? 'Запуск игры' : 'Стоп игра'}
          </button>
          {timerGame !== 30 ? `Игровое время: ${timerGame}` : 'Игровое время закончилось'}
        </div>
        <div className="user-descriptions">
          <h5>{!userStep ? 'Ваш ход' : 'Противник ходит'}</h5>
        </div>
        <Cell
            stepHistory={stepHistory}
            activeMove={activeMove}
        />
      </div>
    </div>
  );
}