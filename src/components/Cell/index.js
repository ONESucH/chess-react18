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
export const Cell = ({ stepHistory, activeMove }) => {

  return stepHistory.map((item, i) => (
    <Fragment key={i}>
      <div
        className={`cell ${(i % 2) !== 0 && 'black'}`}
        onClick={(e) => activeMove(e)}
        id={`A${i + 1}`}
      >
        <img
          alt={i === 0 ? 1 : i === 1 ? 6 : i === 6 ? 6 : i === 7 ? 1 : ''}
          src={i === 0 ? Tower : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? TowerMain : ''}
          name={i === 0 ? 'Tower' : i === 1 ? 'Pawn' : i === 6 ? 'PawnMain' : i === 7 ? 'TowerMain' : ''}
        />
      </div>
      <div
        className={`cell ${(i % 2) === 0 && 'black'}`}
        onClick={(e) => activeMove(e)}
        id={`B${i + 1}`}
      >
        <img
          alt={i === 0 ? 2 : i === 1 ? 6 : i === 6 ? 6 : i === 7 ? 2 : ''}
          src={i === 0 ? Horse : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? HorseMain : ''}
          name={i === 0 ? 'Horse' : i === 1 ? 'Pawn' : i === 6 ? 'PawnMain' : i === 7 ? 'HorseMain' : ''}
        />
      </div>
      <div
        className={`cell ${(i % 2) !== 0 && 'black'}`}
        onClick={(e) => activeMove(e)}
        id={`C${i + 1}`}
      >
        <img
          alt={i === 0 ? 3 : i === 1 ? 6 : i === 6 ? 6 : i === 7 ? 3 : ''}
          src={i === 0 ? Elephant : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? ElephantMain : ''}
          name={i === 0 ? 'Elephant' : i === 1 ? 'Pawn' : i === 6 ? 'PawnMain' : i === 7 ? 'ElephantMain' : ''}
        />
      </div>
      <div
        className={`cell ${(i % 2) === 0 && 'black'}`}
        onClick={(e) => activeMove(e)}
        id={`D${i + 1}`}
      >
        <img
          alt={i === 0 ? 4 : i === 1 ? 6 : i === 6 ? 6 : i === 7 ? 4 : ''}
          src={i === 0 ? Lady : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? LadyMain : ''}
          name={i === 0 ? 'Lady' : i === 1 ? 'Pawn' : i === 6 ? 'PawnMain' : i === 7 ? 'LadyMain' : ''}
        />
      </div>
      <div
        className={`cell ${(i % 2) !== 0 && 'black'}`}
        onClick={(e) => activeMove(e)}
        id={`E${i + 1}`}
      >
        <img
          alt={i === 0 ? 5 : i === 1 ? 6 : i === 6 ? 6 : i === 7 ? 5 : ''}
          src={i === 0 ? King : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? KingMain : ''}
          name={i === 0 ? 'King' : i === 1 ? 'Pawn' : i === 6 ? 'PawnMain' : i === 7 ? 'KingMain' : ''}
        />
      </div>
      <div
        className={`cell ${(i % 2) === 0 && 'black'}`}
        onClick={(e) => activeMove(e)}
        id={`F${i + 1}`}
      >
        <img
          alt={i === 0 ? 3 : i === 1 ? 6 : i === 6 ? 6 : i === 7 ? 3 : ''}
          src={i === 0 ? Elephant : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? ElephantMain : ''}
          name={i === 0 ? 'Elephant' : i === 1 ? 'Pawn' : i === 6 ? 'PawnMain' : i === 7 ? 'ElephantMain' : ''}
        />
      </div>
      <div
        className={`cell ${(i % 2) !== 0 && 'black'}`}
        onClick={(e) => activeMove(e)}
        id={`G${i + 1}`}
      >
        <img
          alt={i === 0 ? 2 : i === 1 ? 6 : i === 6 ? 6 : i === 7 ? 2 : ''}
          src={i === 0 ? Horse : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? HorseMain : ''}
          name={i === 0 ? 'Horse' : i === 1 ? 'Pawn' : i === 6 ? 'PawnMain' : i === 7 ? 'HorseMain' : ''}
        />
      </div>
      <div
        className={`cell ${(i % 2) === 0 && 'black'}`}
        onClick={(e) => activeMove(e)}
        id={`H${i + 1}`}
      >
        <img
          alt={i === 0 ? 1 : i === 1 ? 6 : i === 6 ? 6 : i === 7 ? 1 : ''}
          src={i === 0 ? Tower : i === 1 ? Pawn : i === 6 ? PawnMain : i === 7 ? TowerMain : ''}
          name={i === 0 ? 'Tower' : i === 1 ? 'Pawn' : i === 6 ? 'PawnMain' : i === 7 ? 'TowerMain' : ''}
        />
      </div>
    </Fragment>
  ));
};