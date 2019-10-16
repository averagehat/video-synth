

import { Cell, Pos } from './gameoflife';
export { makeNewImg  }
const oDist = (a: Pos, b: Pos): number => (a.x - b.x)^2 + (a.y - b.y)^2

const makeNewImg = (frame: Array<number>, populated: Array<Cell<number>>, origin: Pos, width: number) => {
  const dists = populated.map(c => oDist(origin, c));
  const maxDist = (Math.max(...dists));
  populated.forEach(cell => {
    const red = cell.y * (width * 4) + cell.x * 4;
    const rgba = computeColors(maxDist, origin, cell);
    frame.data[red] = rgba[0];
    frame.data[red+1] = rgba[1];
    frame.data[red+2] = rgba[2];
  });
}

const computeColors = (maxDist: number, origin: Pos, cell: Pos) => { 
   const ALPHA = 1;
   const charred = (maxDist < 2) ? 1 :  1 - (oDist(origin, cell) / maxDist);
    return [255*charred,255*charred,255*charred, ALPHA]; 
}