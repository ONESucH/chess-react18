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
          <div className="cell">
            <img src={Tower} alt="tower" />
          </div>
          <div className="cell black">
            <img src={Horse} alt="horse" />
          </div>
          <div className="cell">
            <img src={Elephant} alt="elephant" />
          </div>
          <div className="cell black">
            <img src={Lady} alt="lady" />
          </div>
          <div className="cell">
            <img src={King} alt="king" />
          </div>
          <div className="cell black">
            <img src={Elephant} alt="elephant" />
          </div>
          <div className="cell">
            <img src={Horse} alt="horse" />
          </div>
          <div className="cell black">
            <img src={Tower} alt="tower" />
          </div>

          <div className="cell black">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell black">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell black">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell black">
            <img src={Pawn} alt="pawn" />
          </div>
          <div className="cell">
            <img src={Pawn} alt="tower" />
          </div>

          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>

          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>

          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>

          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>
          <div className="cell black"></div>
          <div className="cell"></div>

          <div className="cell">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell black">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell black">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell black">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell">
            <img src={PawnMain} alt="pawnMain" />
          </div>
          <div className="cell black">
            <img src={PawnMain} alt="pawnMain" />
          </div>

          <div className="cell black">
            <img src={TowerMain} alt="tower" />
          </div>
          <div className="cell">
            <img src={HorseMain} alt="horseMain" />
          </div>
          <div className="cell black">
            <img src={ElephantMain} alt="elephantMain" />
          </div>
          <div className="cell">
            <img src={LadyMain} alt="ladyMain" />
          </div>
          <div className="cell black">
            <img src={KingMain} alt="kingMain" />
          </div>
          <div className="cell">
            <img src={ElephantMain} alt="elephantMain" />
          </div>
          <div className="cell black">
            <img src={HorseMain} alt="horseMain" />
          </div>
          <div className="cell">
            <img src={TowerMain} alt="towerMain" />
          </div>
        </div>
      </div>
    </div>
  );
}