import {useEffect, useState} from 'react';
import './MainChess.css';

export default () => {
  const [ userName, setUserName ] = useState('Игрок 1');
  const [ userNameMain, setUserNameMain ] = useState('Игрок 2');
  const [ timerGame, setTimerGame ] = useState(null);
  const [ userColor, setUserColor ] = useState('#000');
  const [ userColorMain, setUserColorMain ] = useState('#1ceeee');

  const startGame = () => {
    let timer = setInterval(() => {
      setTimerGame(timerGame + 1);
    }, 1000);

    if (timerGame === 30) {
      clearInterval(timer);
    }
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
          <p style={{ textShadow: `1px 0 2px ${userColor}` }}>{userName} : <span>0</span></p>
          <p style={{ textShadow: `1px 0 2px ${userColorMain}` }}>{userNameMain} : <span>0</span></p>
        </div>
      </div>
      <div className="game-dashboard">
        <div className="game-title">
          <h2>Chess GAME</h2>
        </div>
        <div className="game-timer">
          <button onClick={() => startGame()}>Запуск игры</button>
          Игровое время: {timerGame}
        </div>

        <div className="Dashboard">
          <div className="cell">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/tower.svg#tower" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/horse.svg#horse" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/elephant.svg#elephant" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/lady.svg#lady" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/king.svg#king" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/elephant.svg#elephant" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/horse.svg#horse" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/tower.svg#tower" /></svg>
          </div>

          <div className="cell black">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColor }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
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
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/pawn.svg#pawn" /></svg>
          </div>

          <div className="cell black">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/tower.svg#tower" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/horse.svg#horse" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/elephant.svg#elephant" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/lady.svg#lady" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/king.svg#king" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/elephant.svg#elephant" /></svg>
          </div>
          <div className="cell black">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/horse.svg#horse" /></svg>
          </div>
          <div className="cell">
            <svg style={{ fill: userColorMain }}><use className="icon" xlinkHref="/assets/img/tower.svg#tower" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}