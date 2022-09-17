import { Fragment } from 'react';
import { Tower, Pawn, PawnMain, TowerMain, Horse, HorseMain, Elephant, ElephantMain, Lady, LadyMain, King, KingMain } from '../../helpers/icons';
import './style.css';

// Строим на доске клетки
export const Cell = ({ stepHistory, activeMove }) => {
  return (
      <div className="dashboard">
          {stepHistory?.map((item, i) => (
              <Fragment key={i}>
                  <div
                      className={`cell ${(i % 2) !== 0 ? 'black' : ''}`}
                      id={`A${i + 1}`}
                      onClick={activeMove}
                  >
                      {i === 0 ? <Tower name="tower"/> : i === 1 ? <Pawn name="pawn" parent={`A${i + 1}`}/> : i === 6 ? <PawnMain name="pawnMain" parent={`A${i + 1}`}/> : i === 7 ? <TowerMain name="towerMain" onClick={activeMove}/> : ''}
                  </div>
                  <div
                      className={`cell ${(i % 2) === 0 ? 'black' : ''}`}
                      id={`B${i + 1}`}
                      onClick={activeMove}
                  >
                      {i === 0 ? <Horse name="horse"/> : i === 1 ? <Pawn name="pawn" parent={`B${i + 1}`}/> : i === 6 ? <PawnMain name="pawnMain" parent={`B${i + 1}`}/> : i === 7 ? <HorseMain name="horseMain" onClick={activeMove}/> : ''}
                  </div>
                  <div
                      className={`cell ${(i % 2) !== 0 ? 'black' : ''}`}
                      id={`C${i + 1}`}
                      onClick={activeMove}
                  >
                      {i === 0 ? <Elephant name="elephant"/> : i === 1 ? <Pawn name="pawn" parent={`C${i + 1}`}/> : i === 6 ? <PawnMain name="pawnMain" parent={`C${i + 1}`}/> : i === 7 ? <ElephantMain name="elephantMain" onClick={activeMove}/> : ''}
                  </div>
                  <div
                      className={`cell ${(i % 2) === 0 ? 'black' : ''}`}
                      id={`D${i + 1}`}
                      onClick={activeMove}
                  >
                      {i === 0 ? <Lady name="lady"/> : i === 1 ? <Pawn name="pawn" parent={`D${i + 1}`}/> : i === 6 ? <PawnMain name="pawnMain" parent={`D${i + 1}`}/> : i === 7 ? <LadyMain name="ladyMain" onClick={activeMove}/> : ''}
                  </div>
                  <div
                      className={`cell ${(i % 2) !== 0 ? 'black' : ''}`}
                      id={`E${i + 1}`}
                      onClick={activeMove}
                  >
                      {i === 0 ? <King name="king"/> : i === 1 ? <Pawn name="pawn" parent={`E${i + 1}`}/> : i === 6 ? <PawnMain name="pawnMain" parent={`E${i + 1}`}/> : i === 7 ? <KingMain name="kingMain"/> : ''}
                  </div>
                  <div
                      className={`cell ${(i % 2) === 0 ? 'black' : ''}`}
                      id={`F${i + 1}`}
                      onClick={activeMove}
                  >
                      {i === 0 ? <Elephant name="elephant"/> : i === 1 ? <Pawn name="pawn" parent={`F${i + 1}`}/> : i === 6 ? <PawnMain name="pawnMain" parent={`F${i + 1}`}/> : i === 7 ? <ElephantMain name="elephantMain"/> : ''}
                  </div>
                  <div
                      className={`cell ${(i % 2) !== 0 ? 'black' : ''}`}
                      id={`G${i + 1}`}
                      onClick={activeMove}
                  >
                      {i === 0 ? <Horse name="horse"/> : i === 1 ? <Pawn name="pawn" parent={`G${i + 1}`}/> : i === 6 ? <PawnMain name="pawnMain" parent={`G${i + 1}`}/> : i === 7 ? <HorseMain name="horseMain"/> : ''}
                  </div>
                  <div
                      className={`cell ${(i % 2) === 0 ? 'black' : ''}`}
                      id={`H${i + 1}`}
                      onClick={activeMove}
                  >
                      {i === 0 ? <Tower name="tower"/> : i === 1 ? <Pawn name="pawn" parent={`H${i + 1}`}/> : i === 6 ? <PawnMain name="pawnMain" parent={`H${i + 1}`}/> : i === 7 ? <TowerMain name="towerMain"/> : ''}
                  </div>
              </Fragment>
          ))}
      </div>
  );
};