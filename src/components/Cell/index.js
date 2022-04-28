import { Fragment } from 'react';

import Pawn from '../../assets/img/pawn.svg';
import Tower from '../../assets/img/tower.svg';
import Horse from '../../assets/img/horse.svg';
import Elephant from '../../assets/img/elephant.svg';
import Lady from '../../assets/img/lady.svg';
import King from '../../assets/img/king.svg';

import PawnMain from '../../assets/img/pawnMain.svg';
import TowerMain from '../../assets/img/towerMain.svg';
import HorseMain from '../../assets/img/horseMain.svg';
import ElephantMain from '../../assets/img/elephantMain.svg';
import LadyMain from '../../assets/img/ladyMain.svg';
import KingMain from '../../assets/img/kingMain.svg';

// Строим на доске клетки
export const Cell = (props) => {
  const { stepHistory, activeMove } = props;

  return stepHistory.map((item, i) => (
    <Fragment key={i}>
      <div
        className={`cell ${(i % 2) !== 0 && 'black'}`}
        onClick={(e) => activeMove(e.currentTarget)}
        id={`A${i}`}
      >
        <img src={i === 0 ? Tower : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? TowerMain : ''} alt="" />
      </div>
      <div
        className={`cell ${(i % 2) === 0 && 'black'}`}
        onClick={(e) => activeMove(e.currentTarget)}
        id={`B${i}`}
      >
        <img src={i === 0 ? Horse : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? HorseMain : ''} alt="" />
      </div>
      <div
        className={`cell ${(i % 2) !== 0 && 'black'}`}
        onClick={(e) => activeMove(e.currentTarget)}
        id={`C${i}`}
      >
        <img src={i === 0 ? Elephant : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? HorseMain : ''} alt="" />
      </div>
      <div
        className={`cell ${(i % 2) === 0 && 'black'}`}
        onClick={(e) => activeMove(e.currentTarget)}
        id={`D${i}`}
      >
        <img src={i === 0 ? Lady : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? LadyMain : ''} alt="" />
      </div>
      <div
        className={`cell ${(i % 2) !== 0 && 'black'}`}
        onClick={(e) => activeMove(e.currentTarget)}
        id={`E${i}`}
      >
        <img src={i === 0 ? King : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? KingMain : ''} alt="" />
      </div>
      <div
        className={`cell ${(i % 2) === 0 && 'black'}`}
        onClick={(e) => activeMove(e.currentTarget)}
        id={`F${i}`}
      >
        <img src={i === 0 ? Elephant : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? ElephantMain : ''} alt="" />
      </div>
      <div
        className={`cell ${(i % 2) !== 0 && 'black'}`}
        onClick={(e) => activeMove(e.currentTarget)}
        id={`G${i}`}
      >
        <img src={i === 0 ? Horse : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? HorseMain : ''} alt="" />
      </div>
      <div
        className={`cell ${(i % 2) === 0 && 'black'}`}
        onClick={(e) => activeMove(e.currentTarget)}
        id={`H${i}`}
      >
        <img src={i === 0 ? Tower : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? TowerMain : ''} alt="" />
      </div>
    </Fragment>
  ));
};