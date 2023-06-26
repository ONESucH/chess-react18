import { useEffect, useState } from 'react';
import { Cell } from '../../components/Cell';
import { getPadTime } from '../../helpers/getPadTime';
import helpers from '../../helpers/utils';
import './MainChess.css';

export default () => {
  const [ timerGameOne, setTimerGameOne ] = useState(1 * 60);
  const [ timerGameTwo, setTimerGameTwo ] = useState(1 * 60);
  const [ failMessage, setFailMessage ] = useState(false);
  const [ isCountingOne, setIsCountingOne ] = useState(false);
  const [ isCountingTwo, setIsCountingTwo ] = useState(false);
  const minutesOne = getPadTime(Math.floor(timerGameOne / 60));
  const secondsOne = getPadTime(timerGameOne % 60);
  const minutesTwo = getPadTime(Math.floor(timerGameTwo / 60));
  const secondsTwo = getPadTime(timerGameTwo % 60);
  const [ userStep, setUserStep ] = useState(true);
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
    if (!timerGameOne || !timerGameTwo) {
      stopGame();
    }
  }, [timerGameOne, timerGameTwo]);

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
    setFailMessage(false);
  };

  const stopGame = () => {
    stopTimerOne();
    stopTimerTwo();
    setPlayGame(0);
    setActivePawn('');
    setUserStep(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
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
    if ((getName === 'ladyMain' || getName === 'kingMain' || getName === 'elephantMain' || getName === 'horseMain' || getName === 'towerMain' || getName === 'pawnMain') && userStep) {
      whichPawnThePlayerChose(getName, icon, cellID);
    }
    if ((getName === 'lady' || getName === 'king' || getName === 'elephant' || getName === 'horse' || getName === 'tower' || getName === 'pawn') && !userStep) {
      whichPawnThePlayerChose(getName, icon, cellID);
    }

    // Активная пешка
    setActivePawn(getName);
    // Активная ячейка
    setActiveCellID(cellID);

    if (getAttackTag && (getName === "king" || getName === "kingMain")) {
      stopGame();
      setFailMessage(true);
    }
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

    if (!userStep) {
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
          searchBottom(cellABC, cellNumber, null, name);
          searchLeft(cellABC, cellNumber);
          searchRight(cellABC, cellNumber);
        }
      }
      if ((name === 'horseMain' || name === 'horse') && item[cellID]) {
        searchG(cellABC, cellNumber, name);
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

  const findTopLeft = (cellNumber, findIndexABS, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 8); i++) {
      const searchMovedTopLeft = document.querySelector(`#${helpers.cellABS[findIndexABS - i]}${cellNumber - i}`);
      const findMeTopLeft = searchMovedTopLeft?.querySelector("svg");
      const findMeNameTopLeft = findMeTopLeft?.getAttribute("name");
      const topLeftMeNotFound = findMeNameTopLeft?.indexOf("Main") !== -1;

      if (!searchMovedTopLeft?.innerHTML) {
        findNextMove(searchMovedTopLeft);
      } else {
        if (userStep) {
          if (searchMovedTopLeft?.innerHTML && topLeftMeNotFound) {
            return;
          } else if (searchMovedTopLeft?.innerHTML && !topLeftMeNotFound) {
            attackPawns(searchMovedTopLeft);
            return;
          }
        } else {
          if (searchMovedTopLeft?.innerHTML && !topLeftMeNotFound) {
            return;
          } else if (searchMovedTopLeft?.innerHTML && topLeftMeNotFound) {
            attackPawns(searchMovedTopLeft);
            return;
          }
        }
      }
    }
  }

  const findTopRight = (cellNumber, findIndexABS, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 8); i++) {
      const searchMovedTopRight = document.querySelector(`#${helpers.cellABS[findIndexABS + i]}${cellNumber - i}`);
      const findMeTopRight = searchMovedTopRight?.querySelector("svg");
      const findMeNameTopRight = findMeTopRight?.getAttribute("name");
      const topRightMeNotFound = findMeNameTopRight?.indexOf("Main") !== -1;

      if (!searchMovedTopRight?.innerHTML) {
        findNextMove(searchMovedTopRight);
      } else {
        if (userStep) {
          if (searchMovedTopRight?.innerHTML && topRightMeNotFound) {
            return;
          } else if (searchMovedTopRight?.innerHTML && !topRightMeNotFound) {
            attackPawns(searchMovedTopRight);
            return;
          }
        } else {
          if (searchMovedTopRight?.innerHTML && !topRightMeNotFound) {
            return;
          } else if (searchMovedTopRight?.innerHTML && topRightMeNotFound) {
            attackPawns(searchMovedTopRight);
            return;
          }
        }
      }
    }
  }

  const findBottomLeft = (cellNumber, findIndexABS, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 8); i++) {
      const searchMovedBottomLeft = document.querySelector(`#${helpers.cellABS[findIndexABS - i]}${cellNumber + i}`);
      const findMeBottomLeft = searchMovedBottomLeft?.querySelector("svg");
      const findMeNameBottomLeft = findMeBottomLeft?.getAttribute("name");
      const bottomLeftMeNotFound = findMeNameBottomLeft?.indexOf("Main") !== -1;

      if (!searchMovedBottomLeft?.innerHTML) {
        findNextMove(searchMovedBottomLeft);
      } else {
        if (userStep) {
          if (searchMovedBottomLeft?.innerHTML && bottomLeftMeNotFound) {
            return;
          } else if (searchMovedBottomLeft?.innerHTML && !bottomLeftMeNotFound) {
            attackPawns(searchMovedBottomLeft);
            return;
          }
        } else {
          if (searchMovedBottomLeft?.innerHTML && !bottomLeftMeNotFound) {
            return;
          } else if (searchMovedBottomLeft?.innerHTML && bottomLeftMeNotFound) {
            attackPawns(searchMovedBottomLeft);
            return;
          }
        }
      }
    }
  }

  const findBottomRight = (cellNumber, findIndexABS, doubleStroke) => {
    for(let i = 1; i <= (doubleStroke || 8); i++) {
      const searchMovedBottomRight = document.querySelector(`#${helpers.cellABS[findIndexABS + i]}${cellNumber + i}`);
      const findMeBottomRight = searchMovedBottomRight?.querySelector("svg");
      const findMeNameBottomRight = findMeBottomRight?.getAttribute("name");
      const topLeftMeNotFound = findMeNameBottomRight?.indexOf("Main") !== -1;

      if (!searchMovedBottomRight?.innerHTML) {
        findNextMove(searchMovedBottomRight);
      } else {
        if (userStep) {
          if (searchMovedBottomRight?.innerHTML && topLeftMeNotFound) {
            return;
          } else if (searchMovedBottomRight?.innerHTML && !topLeftMeNotFound) {
            attackPawns(searchMovedBottomRight);
            return;
          }
        } else {
          if (searchMovedBottomRight?.innerHTML && !topLeftMeNotFound) {
            return;
          } else if (searchMovedBottomRight?.innerHTML && topLeftMeNotFound) {
            attackPawns(searchMovedBottomRight);
            return;
          }
        }
      }
    }
  }

  const searchX = (cellABC, cellNumber, doubleStroke) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    findTopLeft(cellNumber, findIndexABS, doubleStroke);
    findTopRight(cellNumber, findIndexABS, doubleStroke);
    findBottomLeft(cellNumber, findIndexABS, doubleStroke);
    findBottomRight(cellNumber, findIndexABS, doubleStroke);
  }

  const searchG = (cellABC, cellNumber, pawnName) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);
    let rootAttack = false;

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

      const findMePawnNameTopLeft = searchHorseMovedTopLeftIcon?.getAttribute("name");
      const findMePawnNameTopRight = searchHorseMovedTopRightIcon?.getAttribute("name");
      const findMePawnNameLeftTop = searchHorseMovedLeftTopIcon?.getAttribute("name");
      const findMePawnNameLeftBottom = searchHorseMovedLeftBottomIcon?.getAttribute("name");
      const findMePawnNameRightTop = searchHorseMovedRightTopIcon?.getAttribute("name");
      const findMePawnNameRightBottom = searchHorseMovedRightBottomIcon?.getAttribute("name");
      const findMePawnNameBottomLeft = searchHorseMovedBottomLeftIcon?.getAttribute("name");
      const findMePawnNameBottomRight = searchHorseMovedBottomRightIcon?.getAttribute("name");

      let topLeftMeNotFound, topRightMeNotFound, leftTopMeNotFound, leftBottomMeNotFound, rightTopMeNotFound, rightBottomMeNotFound, bottomLeftMeNotFound, bottomRightMeNotFound;

      topLeftMeNotFound = findMePawnNameTopLeft?.indexOf("Main") !== -1;
      topRightMeNotFound = findMePawnNameTopRight?.indexOf("Main") !== -1;
      leftTopMeNotFound = findMePawnNameLeftTop?.indexOf("Main") !== -1;
      leftBottomMeNotFound = findMePawnNameLeftBottom?.indexOf("Main") !== -1;
      rightTopMeNotFound = findMePawnNameRightTop?.indexOf("Main") !== -1;
      rightBottomMeNotFound = findMePawnNameRightBottom?.indexOf("Main") !== -1;
      bottomLeftMeNotFound = findMePawnNameBottomLeft?.indexOf("Main") !== -1;
      bottomRightMeNotFound = findMePawnNameBottomRight?.indexOf("Main") !== -1;

      if (pawnName === "horse") {
        // Игнорировать вражеские пешки
        if (searchHorseMovedTopLeftIcon?.innerHTML && topLeftMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedTopLeft);
        }
        if (searchHorseMovedTopRightIcon?.innerHTML && topRightMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedTopRight);
        }
        if (searchHorseMovedLeftTopIcon?.innerHTML && leftTopMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedLeftTop);
        }
        if (searchHorseMovedLeftBottomIcon?.innerHTML && leftBottomMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedLeftBottom);
        }
        if (searchHorseMovedRightTopIcon?.innerHTML && rightTopMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedRightTop);
        }
        if (searchHorseMovedRightBottomIcon?.innerHTML && rightBottomMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedRightBottom);
        }
        if (searchHorseMovedBottomLeftIcon?.innerHTML && bottomLeftMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedBottomLeft);
        }
        if (searchHorseMovedBottomRightIcon?.innerHTML && bottomRightMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedBottomRight);
        }
      }

      if (pawnName === "horseMain") {
        // Игнорировать свой пешки
        if (searchHorseMovedTopLeftIcon?.innerHTML && !topLeftMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedTopLeft);
        }
        if (searchHorseMovedTopRightIcon?.innerHTML && !topRightMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedTopRight);
        }
        if (searchHorseMovedLeftTopIcon?.innerHTML && !leftTopMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedLeftTop);
        }
        if (searchHorseMovedLeftBottomIcon?.innerHTML && !leftBottomMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedLeftBottom);
        }
        if (searchHorseMovedRightTopIcon?.innerHTML && !rightTopMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedRightTop);
        }
        if (searchHorseMovedRightBottomIcon?.innerHTML && !rightBottomMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedRightBottom);
        }
        if (searchHorseMovedBottomLeftIcon?.innerHTML && !bottomLeftMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedBottomLeft);
        }
        if (searchHorseMovedBottomRightIcon?.innerHTML && !bottomRightMeNotFound) {
          rootAttack = true;
          attackPawns(searchHorseMovedBottomRight);
        }
      }

      if (!rootAttack) {
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
        const leftMeNotFound = findMePawnNameLeft?.indexOf("Main") !== -1;
        const rightMeNotFound = findMePawnNameRight?.indexOf("Main") !== -1;

        if (searchPawnMoveAttackLeft?.innerHTML && !leftMeNotFound) {
          attackPawns(searchPawnMoveAttackLeft);
          return;
        }
        if (searchPawnMoveAttackRight?.innerHTML && !rightMeNotFound) {
          attackPawns(searchPawnMoveAttackRight);
          return;
        }
        if (!searchPawnMoveTop?.innerHTML) {
          findNextMove(searchPawnMoveTop);
        }
      } else {
        // Attacks Top
        const searchPawnMoveTop = document.querySelector(`#${cellABC}${cellNumber - i}`);
        const findMePawnTop = searchPawnMoveTop?.querySelector("svg");
        const findMePawnNameTop = findMePawnTop?.getAttribute("name");
        const topMeNotFound = findMePawnNameTop?.indexOf("Main") !== -1;

        if (!searchPawnMoveTop?.innerHTML) {
          findNextMove(searchPawnMoveTop);
        } else {
          if (userStep) {
            if (searchPawnMoveTop?.innerHTML && topMeNotFound) {
              return;
            } else if (searchPawnMoveTop?.innerHTML && !topMeNotFound) {
              attackPawns(searchPawnMoveTop);
              return;
            }
          } else {
            if (searchPawnMoveTop?.innerHTML && !topMeNotFound) {
              return;
            } else if (searchPawnMoveTop?.innerHTML && topMeNotFound) {
              attackPawns(searchPawnMoveTop);
              return;
            }
          }
        }
      }
    }
  }

  // Поиск ходов по нижней части, есть возможность ограничинить количество ходов "doubleStroke"
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
        const leftMeNotFound = findMePawnNameLeft?.indexOf("Main") !== -1;
        const rightMeNotFound = findMePawnNameRight?.indexOf("Main") !== -1;

        if (searchPawnMoveAttackLeft?.innerHTML && leftMeNotFound) {
          attackPawns(searchPawnMoveAttackLeft);
          return;
        }
        if (searchPawnMoveAttackRight?.innerHTML && rightMeNotFound) {
          attackPawns(searchPawnMoveAttackRight);
          return;
        }
        if (!searchPawnMoveBottom?.innerHTML) {
          findNextMove(searchPawnMoveBottom);
        }
      } else {
        const searchPawnMoveBottom = document.querySelector(`#${cellABC}${cellNumber + i}`);
        const findMePawnBottom = searchPawnMoveBottom?.querySelector("svg");
        const findMePawnNameBottom = findMePawnBottom?.getAttribute("name");
        const bottomMeNotFound = findMePawnNameBottom?.indexOf("Main") !== -1;

        if (!searchPawnMoveBottom?.innerHTML) {
          findNextMove(searchPawnMoveBottom);
        } else {
          if (userStep) {
            if (searchPawnMoveBottom?.innerHTML && bottomMeNotFound) {
              return;
            } else if (searchPawnMoveBottom?.innerHTML && !bottomMeNotFound) {
              attackPawns(searchPawnMoveBottom);
              return;
            }
          } else {
            if (searchPawnMoveBottom?.innerHTML && !bottomMeNotFound) {
              return;
            } else if (searchPawnMoveBottom?.innerHTML && bottomMeNotFound) {
              attackPawns(searchPawnMoveBottom);
              return;
            }
          }
        }
      }
    }
  }

  const searchLeft = (cellABC, cellNumber, doubleStroke) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    for(let i = 1; i <= (doubleStroke || 9); i++) {
      const searchPawnMoveLeft = document.querySelector(`#${helpers.cellABS[findIndexABS + i]}${cellNumber}`);
      const findMePawnLeft = searchPawnMoveLeft?.querySelector("svg");
      const findMePawnNameLeft = findMePawnLeft?.getAttribute("name");
      const leftMeNotFound = findMePawnNameLeft?.indexOf("Main") !== -1;

      if (!searchPawnMoveLeft?.innerHTML) {
        findNextMove(searchPawnMoveLeft);
      } else {
        if (userStep) {
          if (searchPawnMoveLeft?.innerHTML && leftMeNotFound) {
            return;
          } else if (searchPawnMoveLeft?.innerHTML && !leftMeNotFound) {
            attackPawns(searchPawnMoveLeft);
            return;
          }
        } else {
          if (searchPawnMoveLeft?.innerHTML && !leftMeNotFound) {
            return;
          } else if (searchPawnMoveLeft?.innerHTML && leftMeNotFound) {
            attackPawns(searchPawnMoveLeft);
            return;
          }
        }
      }
    }
  }

  const searchRight = (cellABC, cellNumber, doubleStroke) => {
    const findIndexABS = helpers.cellABS.findIndex(item => item === cellABC);

    for(let i = 1; i <= (doubleStroke || 9); i++) {
      const searchPawnMoveRight = document.querySelector(`#${helpers.cellABS[findIndexABS - i]}${cellNumber}`);
      const findMePawnRight = searchPawnMoveRight?.querySelector("svg");
      const findMePawnNameRight = findMePawnRight?.getAttribute("name");
      const rightMeNotFound = findMePawnNameRight?.indexOf("Main") !== -1;

      if (!searchPawnMoveRight?.innerHTML) {
        findNextMove(searchPawnMoveRight);
      } else {
        if (userStep) {
          if (searchPawnMoveRight?.innerHTML && rightMeNotFound) {
            return;
          } else if (searchPawnMoveRight?.innerHTML && !rightMeNotFound) {
            attackPawns(searchPawnMoveRight);
            return;
          }
        } else {
          if (searchPawnMoveRight?.innerHTML && !rightMeNotFound) {
            return;
          } else if (searchPawnMoveRight?.innerHTML && rightMeNotFound) {
            attackPawns(searchPawnMoveRight);
            return;
          }
        }
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
        {(timerGameOne || timerGameTwo || playGame) ? (
            <div className="user-descriptions">
              {!timerGameOne ? (
                  <h5>Выйграл второй игрок</h5>
              ) : !timerGameTwo ? (
                  <h5>Выйграл первый игрок</h5>
              ) : null}
              {timerGameOne && timerGameTwo && playGame ? (
                  <h5>{userStep ? 'Ваш ход' : 'Противник ходит'}</h5>
              ) : null}
            </div>
        ): null}
        <Cell
            stepHistory={stepHistory}
            activeMove={activeMove}
        />
      </div>
      {failMessage ? (
          <div className="modal-message">
              <h4 className="modal-title">end game</h4>
          </div>
      ) : null}
    </div>
  );
}