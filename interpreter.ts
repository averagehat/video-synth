
import { Cell, Pos } from './gameoflife';
export { makeNewImg, initListen, Message }
type RGBA = [number, number, number, number];

interface Message { 
    color:  RGBA,
    time: number
}
// console.log slows the rendering badly
const initListen = (location: { host: string}, sharedState: any ) => {
        const ws = new WebSocket(`ws://${location.host}`); 
        ws.onmessage = function(event) {
            const data = JSON.parse(event.data); 
            sharedState.messages.push(data);
        };
      }

const oDist = (a: Pos, b: Pos): number => (a.x - b.x)^2 + (a.y - b.y)^2

const makeNewImg = (frame: { data: Array<number> }, populated: Array<Cell<number>>, origin: Pos, width: number, message?: Message) => {
  const dists = populated.map(c => oDist(origin, c));
  const maxDist = (Math.max(...dists));
  populated.forEach(cell => {
    const red = cell.y * (width * 4) + cell.x * 4;
    const rgba = computeColors(maxDist, origin, cell);
    frame.data[red] = rgba[0];
    frame.data[red+1] = rgba[1];
    frame.data[red+2] = rgba[2];

   if (message) {
      frame.data[red] =   message.color[0];
      frame.data[red+1] = message.color[1];
      frame.data[red+2] = message.color[2];
      // somehow alpha is always getting set to 0
      // frame.data[red+3] = message.color[3];
    }
  });
 }

const computeColors = (maxDist: number, origin: Pos, cell: Pos) => { 
   const ALPHA = 1;
   const charred = (maxDist < 2) ? 1 :  1 - (oDist(origin, cell) / maxDist);
    return [255*charred,255*charred,255*charred, ALPHA]; 
}
