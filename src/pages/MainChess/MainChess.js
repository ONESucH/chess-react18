import { useEffect, useState } from 'react';
import { Cell } from '../../components/Cell';
import './MainChess.css';
import helpers from '../../helpers/utils';

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
  const [ activeCellID, setActiveCellID ] = useState('');
  const [ timerGame, setTimerGame ] = useState(0);
  const [ userColor, setUserColor ] = useState('#000000');
  const [ userColorMain, setUserColorMain ] = useState('#1ceeee');
  const [ stepHistory, setStepHistory ] = useState([
    {
      A1: 'tower',
      B1: 'horse',
      C1: 'elephant',
      D1: 'lady',
      E1: 'king',
      F1: 'elephant',
      G1: 'horse',
      H1: 'tower',
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
      A8: 'towerMain',
      B8: 'horseMain',
      C8: 'elephantMain',
      D8: 'ladyMain',
      E8: 'kingMain',
      F8: 'elephantMain',
      G8: 'horseMain',
      H8: 'towerMain',
    }
  ]);
  const defaultPositions = stepHistory;

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
    setStepHistory(defaultPositions);
  };

  // Очищаем поле боя от фокусов
  const clearFocuses = () => {
    const allFocusesTags = document.querySelectorAll('.focus');
    // После выбора хода, очищаем поле от подсказок
    for(let i = 0; i < allFocusesTags.length; i++) {
      allFocusesTags[i].classList.remove('focus');
    }
  }

  // Активный ход фигуры
  const activeMove = (e) => {
    if (!timerGame) return;

    const icon = e.currentTarget.childNodes[0] || e.currentTarget;
    const getName = e.currentTarget.childNodes[0] ? e.currentTarget.childNodes[0].getAttribute('name') : '';
    const getFocusTag = e.currentTarget.classList.contains('focus');
    const cellID = e.currentTarget.id;

    // Если изменилась ячейка или активна новая пешка, очищаем поле
    if (activePawn !== getName || cellID !== activeCellID) {
      clearFocuses();
    }

    // Если изменилась пешка, возвращаем старые изменения
    if (activeCellID) {
      const beforeCellFocus = document.querySelector(`#${activeCellID}`);

      if (beforeCellFocus) {
        const iconBeforeCellFocus = beforeCellFocus.childNodes[0];
        if (iconBeforeCellFocus) {
          iconBeforeCellFocus.style.marginTop = '0';
        }
      }
    }

    // Даем полноценный ход пешке
    if (getFocusTag) {
      clearFocuses();
      setUserStep(!userStep);
      nextMoved(cellID);
    }

    // Какой игрок ходит?
    if ((getName === 'ladyMain' || getName === 'kingMain' || getName === 'elephantMain' || getName === 'horseMain' || getName === 'towerMain' || getName === 'pawnMain') && !userStep) {
      whichPawnThePlayerChose(getName, icon, cellID);
      setUsers((props) => ({
        ...props,
        userOneSteps: props.userOneSteps++
      }))
    }
    if ((getName === 'lady' || getName === 'king' || getName === 'elephant' || getName === 'horse' || getName === 'tower' || getName === 'pawn') && userStep) {
      whichPawnThePlayerChose(getName, icon, cellID);
      setUsers((props) => ({
        ...props,
        userTwoSteps: props.userTwoSteps++
      }))
    }

    // Активная пешка
    setActivePawn(getName);
    // Активная ячейка
    setActiveCellID(cellID);
  };

  // ПРОДОЛЖАЕМ ходить и обновлять ход в истории
  const nextMoved = (NewCellID) => {
    const findActiveCell = document.querySelector(`#${activeCellID}`);
    const newFindActiveCell = document.querySelector(`#${NewCellID}`);
    const icon = findActiveCell.innerHTML;

    findActiveCell.innerHTML = '';
    newFindActiveCell.innerHTML = icon;
    updateHistory(activeCellID, NewCellID, activePawn);
  }

  // Определим какую пешку выбрал игрок
  const whichPawnThePlayerChose = (name, icon, cellID) => {
    icon.style.marginTop = '-15px';
    pawnCapabilities(name, icon, cellID);
  };

  // Если тег пустой фокусим его
  const findNextMove = (tag) => {
    if (tag?.innerHTML === '') {
      tag.classList.add('focus');
    }
  }

  // Определим возможные ходы
  const pawnCapabilities = (name, icon, cellID) => {
    let cellABC = cellID[0];
    let cellNumber = +cellID[1];

    stepHistory.map(item => {
      if (name === 'pawnMain' && item[cellID]) {
        if (icon?.getAttribute('parent') === cellID) {
          // Пешка делает двойной ход
          searchTop(cellABC, cellNumber, 2);
        } else {
          searchTop(cellABC, cellNumber, 1);
        }
      }
      if (name === 'pawn' && item[cellID]) {
        if (icon?.getAttribute('parent') === cellID) {
          // Пешка делает двойной ход
          searchBottom(cellABC, cellNumber, 2);
        } else {
          searchBottom(cellABC, cellNumber, 1);
        }
      }
      if ((name === 'towerMain' || name === 'tower' || name === 'lady' || name === 'ladyMain' || name === 'kingMain' || name === 'king') && item[cellID]) {
        if (name === 'kingMain' || name === 'king') {
          searchTop(cellABC, cellNumber, 1);
          searchBottom(cellABC, cellNumber, 1);
          searchLeft(cellABC, cellNumber, 1);
          searchRight(cellABC, cellNumber, 1);
        } else {
          searchTop(cellABC, cellNumber);
          searchBottom(cellABC, cellNumber);
          searchLeft(cellABC, cellNumber);
          searchRight(cellABC, cellNumber);
        }
      }
      if ((name === 'horseMain' || name === 'horse') && item[cellID]) {
        searchG(cellABC, cellNumber);
      }
      if ((name === 'elephantMain' || name === 'elephant' || name === 'ladyMain' || name === 'lady' || name === 'kingMain' || name === 'king') && item[cellID]) {
        if (name === 'kingMain' || name === 'king') {
          searchX(cellABC, cellNumber, 1);
        } else {
          searchX(cellABC, cellNumber);
        }
      }
      return item;
    });
  };

  const findPawnTopLeft = (cellNumber, findIndexABS, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 8); i++) {
      const searchElephantMovedTopLeft = document.querySelector(`#${helpers.cellABS[findIndexABS - i]}${cellNumber - i}`);

      if (!searchElephantMovedTopLeft?.innerHTML) {
        findNextMove(searchElephantMovedTopLeft);
      } else {
        return;
      }
    }
  }

  const findPawnTopRight = (cellNumber, findIndexABS, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 8); i++) {
      const searchElephantMovedTopRight = document.querySelector(`#${helpers.cellABS[findIndexABS + i]}${cellNumber - i}`);

      if (!searchElephantMovedTopRight?.innerHTML) {
        findNextMove(searchElephantMovedTopRight);
      } else {
        return;
      }
    }
  }

  const findPawnBottomLeft = (cellNumber, findIndexABS, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 8); i++) {
      const searchElephantMovedBottomLeft = document.querySelector(`#${helpers.cellABS[findIndexABS - i]}${cellNumber + i}`);

      if (!searchElephantMovedBottomLeft?.innerHTML) {
        findNextMove(searchElephantMovedBottomLeft);
      } else {
        return;
      }
    }
  }

  const findPawnBottomRight = (cellNumber, findIndexABS, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 8); i++) {
      const searchElephantMovedBottomRight = document.querySelector(`#${helpers.cellABS[findIndexABS + i]}${cellNumber + i}`);

      if (!searchElephantMovedBottomRight?.innerHTML) {
        findNextMove(searchElephantMovedBottomRight);
      } else {
        return;
      }
    }
  }

  const searchX = (cellABC, cellNumber, doubleStroke) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    findPawnTopLeft(cellNumber, findIndexABS, doubleStroke);
    findPawnTopRight(cellNumber, findIndexABS, doubleStroke);
    findPawnBottomLeft(cellNumber, findIndexABS, doubleStroke);
    findPawnBottomRight(cellNumber, findIndexABS, doubleStroke);
  }

  const searchG = (cellABC, cellNumber) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    for(let i = 1; i <= 8; i++) {
      const searchHorseMovedTopLeft = document.querySelector(`#${helpers.cellABS[findIndexABS - 1]}${cellNumber - 2}`);
      const searchHorseMovedTopRight = document.querySelector(`#${helpers.cellABS[findIndexABS + 1]}${cellNumber - 2}`);
      const searchHorseMovedLeftTop = document.querySelector(`#${helpers.cellABS[findIndexABS - 2]}${cellNumber - 1}`);
      const searchHorseMovedLeftBottom = document.querySelector(`#${helpers.cellABS[findIndexABS - 2]}${cellNumber + 1}`);
      const searchHorseMovedRightTop = document.querySelector(`#${helpers.cellABS[findIndexABS + 2]}${cellNumber - 1}`);
      const searchHorseMovedRightBottom = document.querySelector(`#${helpers.cellABS[findIndexABS + 2]}${cellNumber + 1}`);
      const searchHorseMovedBottomLeft = document.querySelector(`#${helpers.cellABS[findIndexABS - 1]}${cellNumber + 2}`);
      const searchHorseMovedBottomRight = document.querySelector(`#${helpers.cellABS[findIndexABS + 1]}${cellNumber + 2}`);

      if (!searchHorseMovedTopLeft?.innerHTML) {
        findNextMove(searchHorseMovedTopLeft);
      }
      if (!searchHorseMovedTopRight?.innerHTML) {
        findNextMove(searchHorseMovedTopRight);
      }
      if (!searchHorseMovedLeftTop?.innerHTML) {
        findNextMove(searchHorseMovedLeftTop);
      }
      if (!searchHorseMovedLeftBottom?.innerHTML) {
        findNextMove(searchHorseMovedLeftBottom);
      }
      if (!searchHorseMovedRightTop?.innerHTML) {
        findNextMove(searchHorseMovedRightTop);
      }
      if (!searchHorseMovedRightBottom?.innerHTML) {
        findNextMove(searchHorseMovedRightBottom);
      }
      if (!searchHorseMovedBottomLeft?.innerHTML) {
        findNextMove(searchHorseMovedBottomLeft);
      }
      if (!searchHorseMovedBottomRight?.innerHTML) {
        findNextMove(searchHorseMovedBottomRight);
      }
    }
  }

  const searchTop = (cellABC, cellNumber, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 9); i++) {
      const searchPawnMoveTop = document.querySelector(`#${cellABC}${cellNumber - i}`);

      if (!searchPawnMoveTop?.innerHTML) {
        findNextMove(searchPawnMoveTop);
      } else {
        return;
      }
    }
  }

  const searchBottom = (cellABC, cellNumber, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 9); i++) {
      const searchPawnMoveBottom = document.querySelector(`#${cellABC}${cellNumber + i}`);

      if (!searchPawnMoveBottom?.innerHTML) {
        findNextMove(searchPawnMoveBottom);
      } else {
        return;
      }
    }
  }

  const searchLeft = (cellABC, cellNumber, doubleStroke) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    for(let i = 1; i <= (doubleStroke || 9); i++) {
      const searchPawnMoveLeft = document.querySelector(`#${helpers.cellABS[findIndexABS + i]}${cellNumber}`);

      if (!searchPawnMoveLeft?.innerHTML) {
        findNextMove(searchPawnMoveLeft);
      } else {
        return;
      }
    }
  }

  const searchRight = (cellABC, cellNumber, doubleStroke) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    for(let i = 1; i <= (doubleStroke || 9); i++) {
      const searchPawnMoveRight = document.querySelector(`#${helpers.cellABS[findIndexABS - i]}${cellNumber}`);

      if (!searchPawnMoveRight?.innerHTML) {
        findNextMove(searchPawnMoveRight);
      } else {
        return;
      }
    }
  }

  // Обновляем историю ходов (Старый ID, Новый ID, Значение)
  const updateHistory = (prevID, nextID, value) => {
    stepHistory.map((item) => {
      if (prevID in item) item[prevID] = '';
      if (nextID in item) item[nextID] = value;
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