import { useEffect, useState } from 'react';
import './MainChess.css';

import Pawn from './assets/img/pawn.svg';
import Tower from './assets/img/tower.svg';
import Horse from './assets/img/horse.svg';
import Elephant from './assets/img/elephant.svg';
import Lady from './assets/img/lady.svg';
import King from './assets/img/king.svg';

import PawnMain from './assets/img/pawnMain.svg';
import TowerMain from './assets/img/towerMain.svg';
import HorseMain from './assets/img/horseMain.svg';
import ElephantMain from './assets/img/elephantMain.svg';
import LadyMain from './assets/img/ladyMain.svg';
import KingMain from './assets/img/kingMain.svg';

export default () => {
  const [ userName, setUserName ] = useState('Игрок 1');
  const [ userNameMain, setUserNameMain ] = useState('Игрок 2');
  const [ playGame, setPlayGame ] = useState(0);
  const [ timerGame, setTimerGame ] = useState(0);
  const [ userColor, setUserColor ] = useState('#000000');
  const [ userColorMain, setUserColorMain ] = useState('#1ceeee');

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

  const activeMove = ({ id }) => {
    console.log('id', id);
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

        <div className="Dashboard">
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="A8">
            <img src={Tower} alt="tower" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="B8">
            <img src={Horse} alt="horse" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="C8">
            <img src={Elephant} alt="elephant" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="D8">
            <img src={Lady} alt="lady" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="E8">
            <img src={King} alt="king" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="F8">
            <img src={Elephant} alt="elephant" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="G8">
            <img src={Horse} alt="horse" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="H8">
            <img src={Tower} alt="tower" />
          </div>

          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="A7">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="B7">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="C7">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="D7">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="E7">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="F7">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="G7">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="H7">
            <img src={Pawn} alt="tower" />
          </div>

          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="A6" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="B6" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="C6" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="D6" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="E6" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="F6" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="G6" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="H6" />

          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="A5" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="B5" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="C5" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="D5" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="E5" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="F5" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="G5" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="H5" />

          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="A4" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="B4" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="C4" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="D4" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="E4" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="F4" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="G4" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="H4" />

          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="A3" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="B3" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="C3" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="D3" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="E3" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="F3" />
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="G3" />
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="H3" />

          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="A2">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="B2">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="C2">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="D2">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="E2">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="F2">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="G2">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="H2">
            <img src={PawnMain} alt="pawnMain" />
          </div>

          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="A1">
            <img src={TowerMain} alt="tower" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="B1">
            <img src={HorseMain} alt="horseMain" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="C1">
            <img src={ElephantMain} alt="elephantMain" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="D1">
            <img src={LadyMain} alt="ladyMain" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="E1">
            <img src={KingMain} alt="kingMain" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="F1">
            <img src={ElephantMain} alt="elephantMain" />
          </div>
          <div className="cell black" onClick={(e) => activeMove(e.currentTarget)} id="G1">
            <img src={HorseMain} alt="horseMain" />
          </div>
          <div className="cell" onClick={(e) => activeMove(e.currentTarget)} id="H1">
            <img src={TowerMain} alt="towerMain" />
          </div>
        </div>
      </div>
    </div>
  );
}