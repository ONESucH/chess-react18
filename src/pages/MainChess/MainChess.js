import { useEffect, useState } from 'react';
import { Cell } from '../../components/Cell';
import './MainChess.css';
import { getPadTime } from '../../helpers/getPadTime';
import helpers from '../../helpers/utils';

export default () => {
  const [ timerGameOne, setTimerGameOne ] = useState(1 * 60);
  const [ timerGameTwo, setTimerGameTwo ] = useState(1 * 60);
  const [ isCountingOne, setIsCountingOne ] = useState(false);
  const [ isCountingTwo, setIsCountingTwo ] = useState(false);
  const minutesOne = getPadTime(Math.floor(timerGameOne / 60));
  const secondsOne = getPadTime(timerGameOne % 60);
  const minutesTwo = getPadTime(Math.floor(timerGameTwo / 60));
  const secondsTwo = getPadTime(timerGameTwo % 60);
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

  // Игры закончилась!!
  useEffect(() => {
    if (!timerGameOne) {
      console.log(`Проиграл игрок: ${users.userOne}`);
      stopGame();
    }
    if (!timerGameTwo) {
      console.log(`Проиграл игрок: ${users.userTwo}`);
      stopGame();
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      isCountingOne && setTimerGameOne((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [isCountingOne]);

  useEffect(() => {
    const interval = setInterval(() => {
      isCountingTwo && setTimerGameTwo((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [isCountingTwo]);

  const stopTimerOne = () => {
    setIsCountingOne(false);
  }

  const stopTimerTwo = () => {
    setIsCountingTwo(false);
  }

  const resetTimers = () => {
    setIsCountingOne(false);
    setIsCountingTwo(false);
    setTimerGameOne(1 * 60);
    setTimerGameTwo(1 * 60);
  }

  const startGame = () => {
    resetTimers();
    setPlayGame(1);
    setIsCountingOne(true);
  };

  const stopGame = () => {
    stopTimerOne();
    stopTimerTwo();
    setPlayGame(0);
    setActivePawn('');
    setUserStep(false);
  };

  // Очищаем поле боя от фокусов
  const clearFocuses = () => {
    const allFocusesTags = document.querySelectorAll('.focus');
    const allAttackTags = document.querySelectorAll('.attack');

    // После выбора хода, очищаем поле от подсказок
    if (allFocusesTags?.length) {
      for(let i = 0; i < allFocusesTags.length; i++) {
        allFocusesTags[i].classList.remove('focus');
      }
    }
    if (allAttackTags?.length) {
      for(let i = 0; i < allAttackTags.length; i++) {
        allAttackTags[i].classList.remove('attack');
      }
    }
  }

  // Активный ход фигуры
  const activeMove = (e) => {
    if (!isCountingOne && !isCountingTwo) return;

    const icon = e.currentTarget.childNodes[0] || e.currentTarget;
    const getName = e.currentTarget.childNodes[0] ? e.currentTarget.childNodes[0].getAttribute('name') : '';
    const getFocusTag = e.currentTarget.classList.contains('focus');
    const getAttackTag = e.currentTarget.classList.contains('attack');
    const cellID = e.currentTarget.id;

    // Если изменилась ячейка или активна новая пешка, очищаем поле
    if (activePawn !== getName || cellID !== activeCellID || getAttackTag) {
      clearFocuses();
    }

    // Заменяем пешку на новую
    if (getAttackTag && cellID !== activeCellID) {
      nextMoved(cellID);
      const getAttack = document.querySelector('.attack');

      if (getAttack) {
        const iconBeforeCellFocus = getAttack?.childNodes[0];

        if (iconBeforeCellFocus) {
          iconBeforeCellFocus.style.marginTop = '0';
        }
      }
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
      nextMoved(cellID);
    }

    // Какой игрок ходит?
    if ((getName === 'ladyMain' || getName === 'kingMain' || getName === 'elephantMain' || getName === 'horseMain' || getName === 'towerMain' || getName === 'pawnMain') && !userStep) {
      whichPawnThePlayerChose(getName, icon, cellID);
    }
    if ((getName === 'lady' || getName === 'king' || getName === 'elephant' || getName === 'horse' || getName === 'tower' || getName === 'pawn') && userStep) {
      whichPawnThePlayerChose(getName, icon, cellID);
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

    if (newFindActiveCell) {
      newFindActiveCell.innerHTML = icon;
      findActiveCell.innerHTML = '';
      updateHistory(activeCellID, NewCellID, activePawn);
    }

    if (userStep) {
      setIsCountingOne(true);
      setIsCountingTwo(false);
      setUsers((props) => ({
        ...props,
        userTwoSteps: props.userTwoSteps + 1
      }))
      setUserStep(!userStep);
      stopTimerTwo();
    } else {
      setIsCountingOne(false);
      setIsCountingTwo(true);
      setUsers((props) => ({
        ...props,
        userOneSteps: props.userOneSteps + 1
      }))
      setUserStep(!userStep);
      stopTimerOne();
    }
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

  // Фокусим пешку которую можно съесть
  const attackPawns = (tag) => {
    if (tag?.innerHTML) {
      tag.classList.add('attack');
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
          searchTop(cellABC, cellNumber, 2, 'pawnMain');
        } else {
          searchTop(cellABC, cellNumber, 1, 'pawnMain');
        }
      }
      if (name === 'pawn' && item[cellID]) {
        if (icon?.getAttribute('parent') === cellID) {
          // Пешка делает двойной ход
          searchBottom(cellABC, cellNumber, 2, 'pawn');
        } else {
          searchBottom(cellABC, cellNumber, 1, 'pawn');
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

      const searchHorseMovedTopLeftIcon = searchHorseMovedTopLeft?.childNodes[0];
      const searchHorseMovedTopRightIcon = searchHorseMovedTopRight?.childNodes[0];
      const searchHorseMovedLeftTopIcon = searchHorseMovedLeftTop?.childNodes[0];
      const searchHorseMovedLeftBottomIcon = searchHorseMovedLeftBottom?.childNodes[0];
      const searchHorseMovedRightTopIcon = searchHorseMovedRightTop?.childNodes[0];
      const searchHorseMovedRightBottomIcon = searchHorseMovedRightBottom?.childNodes[0];
      const searchHorseMovedBottomLeftIcon = searchHorseMovedBottomLeft?.childNodes[0];
      const searchHorseMovedBottomRightIcon = searchHorseMovedBottomRight?.childNodes[0];

      if (searchHorseMovedTopLeftIcon?.innerHTML) {
        attackPawns(searchHorseMovedTopLeft);
      }
      if (searchHorseMovedTopRightIcon?.innerHTML) {
        attackPawns(searchHorseMovedTopRight);
      }
      if (searchHorseMovedLeftTopIcon?.innerHTML) {
        attackPawns(searchHorseMovedTopLeft);
      }
      if (searchHorseMovedLeftBottomIcon?.innerHTML) {
        attackPawns(searchHorseMovedTopLeft);
      }
      if (searchHorseMovedRightTopIcon?.innerHTML) {
        attackPawns(searchHorseMovedTopLeft);
      }
      if (searchHorseMovedRightBottomIcon?.innerHTML) {
        attackPawns(searchHorseMovedTopLeft);
      }
      if (searchHorseMovedBottomLeftIcon?.innerHTML) {
        attackPawns(searchHorseMovedTopLeft);
      }
      if (searchHorseMovedBottomRightIcon?.innerHTML) {
        attackPawns(searchHorseMovedTopLeft);
      }

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

  const searchTop = (cellABC, cellNumber, doubleStroke, pawnName) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    for(let i = 1; i <= (doubleStroke || 9); i++) {
      if (pawnName === 'pawnMain') {
        const searchPawnMoveTop = document.querySelector(`#${cellABC}${cellNumber - i}`);
        const searchPawnMoveAttackLeft = document.querySelector(`#${helpers.cellABS[findIndexABS - 1]}${cellNumber - 1}`);
        const searchPawnMoveAttackRight = document.querySelector(`#${helpers.cellABS[findIndexABS + 1]}${cellNumber - 1}`);
        const findMePawnLeft = searchPawnMoveAttackLeft?.querySelector("svg");
        const findMePawnRight = searchPawnMoveAttackRight?.querySelector("svg");
        const findMePawnNameLeft = findMePawnLeft?.getAttribute("name");
        const findMePawnNameRight = findMePawnRight?.getAttribute("name");
        const findME = (findMePawnNameLeft?.indexOf("Main") !== -1 || findMePawnNameRight?.indexOf("Main") !== -1) && pawnName?.indexOf("Main") !== -1;

        if ((searchPawnMoveAttackLeft?.innerHTML || searchPawnMoveAttackRight?.innerHTML) && !findME) {
          searchPawnMoveAttackLeft && attackPawns(searchPawnMoveAttackLeft);
          searchPawnMoveAttackRight && attackPawns(searchPawnMoveAttackRight);
          return;
        }
        if (!searchPawnMoveTop?.innerHTML) {
          findNextMove(searchPawnMoveTop);
        }
      } else {
        const searchPawnMoveTop = document.querySelector(`#${cellABC}${cellNumber - i}`);

        if (!searchPawnMoveTop?.innerHTML) {
          findNextMove(searchPawnMoveTop);
        } else {
          return;
        }
      }
    }
  }

  const searchBottom = (cellABC, cellNumber, doubleStroke, pawnName) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    for(let i = 1; i <= (doubleStroke || 9); i++) {
      if (pawnName === 'pawn') {
        const searchPawnMoveBottom = document.querySelector(`#${cellABC}${cellNumber + i}`);
        const searchPawnMoveAttackLeft = document.querySelector(`#${helpers.cellABS[findIndexABS - 1]}${cellNumber + 1}`);
        const searchPawnMoveAttackRight = document.querySelector(`#${helpers.cellABS[findIndexABS + 1]}${cellNumber + 1}`);
        const findMePawnLeft = searchPawnMoveAttackLeft?.querySelector("svg");
        const findMePawnRight = searchPawnMoveAttackRight?.querySelector("svg");
        const findMePawnNameLeft = findMePawnLeft?.getAttribute("name");
        const findMePawnNameRight = findMePawnRight?.getAttribute("name");
        const findME = (!findMePawnNameLeft?.indexOf("Main") !== -1 || !findMePawnNameRight?.indexOf("Main") !== -1) && !pawnName?.indexOf("Main") !== -1;

        if ((searchPawnMoveAttackLeft?.innerHTML || searchPawnMoveAttackRight?.innerHTML) && !findME) {
          searchPawnMoveAttackLeft && attackPawns(searchPawnMoveAttackLeft);
          searchPawnMoveAttackRight && attackPawns(searchPawnMoveAttackRight);
          return;
        }
        if (!searchPawnMoveBottom?.innerHTML) {
          findNextMove(searchPawnMoveBottom);
        }
      } else {
        const searchPawnMoveBottom = document.querySelector(`#${cellABC}${cellNumber - i}`);

        if (!searchPawnMoveBottom?.innerHTML) {
          findNextMove(searchPawnMoveBottom);
        } else {
          return;
        }
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
            {!playGame ? 'Запуск игры' : 'Стоп игра'}
          </button><br/>
          <div>Игровое время основного игрока: {minutesOne}:{secondsOne}</div>
          <div>Игровое время второго игрока: {minutesTwo}:{secondsTwo}</div>
        </div>
        <div className="user-descriptions">
          {!timerGameOne ? (
              <h5>Выйграл второй игрок</h5>
          ) : !timerGameTwo ? (
              <h5>Выйграл первый игрок</h5>
          ) : null}
          <h5>{(!timerGameOne || !timerGameTwo || !playGame) ? null : !userStep ? 'Ваш ход' : 'Противник ходит'}</h5>
        </div>
        <Cell
            stepHistory={stepHistory}
            activeMove={activeMove}
        />
      </div>
    </div>
  );
}