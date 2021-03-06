import { useEffect, useState } from 'react';
import { Cell } from '../../components/Cell';
import utils from '../../helpers/utils';
import './MainChess.css';

export default () => {
  const [ userStep, setUserStep ] = useState(false);
  const [ userName, setUserName ] = useState('Игрок 1');
  const [ userNameMain, setUserNameMain ] = useState('Игрок 2');
  const [ activePawn, setActivePawn ] = useState();
  const [ playGame, setPlayGame ] = useState(0);
  const [ timerGame, setTimerGame ] = useState(0);
  const [ userColor, setUserColor ] = useState('#000000');
  const [ userColorMain, setUserColorMain ] = useState('#1ceeee');
  const [ stepHistory, setStepHistory ] = useState([
    {
      A8: 'tower',
      B8: 'horse',
      C8: 'elephant',
      D8: 'lady',
      E8: 'king',
      F8: 'elephant',
      G8: 'horse',
      H8: 'tower',
    },
    {
      A7: 'pawn',
      B7: 'pawn',
      C7: 'pawn',
      D7: 'pawn',
      E7: 'pawn',
      F7: 'pawn',
      G7: 'pawn',
      H7: 'pawn',
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
      A2: 'pawnMain',
      B2: 'pawnMain',
      C2: 'pawnMain',
      D2: 'pawnMain',
      E2: 'pawnMain',
      F2: 'pawnMain',
      G2: 'pawnMain',
      H2: 'pawnMain',
    },
    {
      A1: 'towerMain',
      B1: 'horseMain',
      C1: 'elephantMain',
      D1: 'ladyMain',
      E1: 'kingMain',
      F1: 'elephantMain',
      G1: 'horseMain',
      H1: 'towerMain',
    }
  ]);

  useEffect(() => {
    if (timerGame === 30) {
      console.log(`Игра закончилась на ${timerGame}`);
      stopGame();
    } else {
      if (playGame) {
        setTimeout(() => {
          setTimerGame(timerGame + 1);
        }, 1000);
      }
    }
  }, [ timerGame ]);

  const startGame = () => {
    setPlayGame(1);
    setTimerGame(1);
  };

  const stopGame = () => {
    setPlayGame(0);
  };

  // Активный ход фигуры
  const activeMove = (e) => {
    const { id } = e.currentTarget;
    let icon = e.currentTarget.querySelector('img');

    // Какой игрок ходит?
    if (icon.name === 'Pawn' || icon.name === 'Tower' || icon.name === 'Horse' || icon.name === 'Elephant' || icon.name === 'King' || icon.name === 'Lady' && userStep) {
      whichPawnThePlayerChose(icon);
      pawnCapabilities(id, icon);
      setUserStep(false);
    } else {
      whichPawnThePlayerChose(icon);
      pawnCapabilities(id, icon);
      setUserStep(true);
    }

    //rootStep(id, icon);
    //pawnCapabilities(icon.alt);
    return e.currentTarget;
  };

  // Определим какую пешку выбрал игрок
  const whichPawnThePlayerChose = (icon) => {
    icon.style.marginTop = '-15px';
  };

  // Определим возможные ходы
  const pawnCapabilities = (cellID, icon) => {

    if (cellID !== activePawn) {
      // Чистим последний ход
      setActivePawn(cellID);
      let lastCell = document.querySelector(`div[id="${cellID}"]`);
      let lastIcon = lastCell.querySelector('img');
      lastIcon.style.marginTop = '0';

      return lastIcon;
    }
  };

  // Даем шаг фигуре и проверяем может ли ходить
  const rootStep = (id, icon) => {
    let cellABC = id[0];
    let cellNumber = +id[1];
    let nextStep = '';

    stepHistory.map(item => {
      if (item[id] === 'pawn') {
        nextStep = `${cellABC}${cellNumber - 1}`;
        updateHistory(item[id], nextStep);
        item[id] = '';
      }
      if (item[id] === 'pawnMain') {
        nextStep = `${cellABC}${cellNumber + 1}`;
        updateHistory(item[id], nextStep);
        item[id] = '';
      }

      if (nextStep !== '') {
        let step = document.querySelector(`#${nextStep}`);

        if (step) step.innerHTML = icon;
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
          <p>{userName}</p>
        </div>
        <div className="user-main">
          <input type="color" value={userColorMain} onChange={(e) => setUserColorMain(e.target.value)}/>
          <p>{userNameMain}</p>
        </div>
        <div className="counter-step">
          <h5>Количество ходов участников</h5>
          <p>{userName} : <span>0</span></p>
          <p>{userNameMain} : <span>0</span></p>
        </div>
      </div>
      <div className="game-dashboard">
        <div className="game-title">
          <h2>Chess GAME</h2>
        </div>
        <div className="game-timer">
          <button onClick={() => !playGame ? startGame() : stopGame()}>
            {!playGame ? 'Запуск игры' : 'Стоп игра'}
          </button>
          Игровое время: {timerGame}
        </div>
        <div className="user-descriptions">
          <h5>{!userStep ? 'Ваш ход' : 'Противник ходит'}</h5>
        </div>

        <div className="Dashboard">
          <Cell
            stepHistory={stepHistory}
            activeMove={activeMove}
            chipSearch={utils.chipSearch}
          />
        </div>
      </div>
    </div>
  );
}