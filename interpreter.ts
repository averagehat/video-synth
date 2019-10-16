
import { Cell, Pos } from './gameoflife';
export { makeNewImg, initListen, Message }
type RGBA = [number, number, number, number];

interface Message { 
    color:  RGBA,
    time: number, 
    frameIn: number
}
// console.log slows the rendering badly
const initListen = (location: { host: string}, sharedState: any ) => {
        const ws = new WebSocket(`ws://${location.host}`); 
        ws.onmessage = function(event) {
            let data = JSON.parse(event.data); 
            data.frameIn = sharedState.currentFrame;
            //console.log('onmessage', data);
            sharedState.messages.push(data);
            sharedState.newest = data;
        };
      }

const oDist = (a: Pos, b: Pos): number => (a.x - b.x)^2 + (a.y - b.y)^2

const makeNewImg = (frame: { data: Array<number> }, populated: Array<Cell<number>>, origin: Pos, width: number, frameskips: number, message?: Message, messages?: Array<Message>) => {
  const dists = populated.map(c => oDist(origin, c));
  const maxDist = (Math.max(...dists));
  populated.forEach(cell => {
    const red = cell.y * (width * 4) + cell.x * 4;
    const rgba = computeColors(maxDist, origin, cell);
    frame.data[red] = rgba[0];
    frame.data[red+1] = rgba[1];
    frame.data[red+2] = rgba[2];
      if (message) { // && ( (cell.data * frameskips) >= message.frameIn)) {
      // to do this properly, you could store the state
      // of the last image render and only change the new births.
      // alternatively, you can save all the messages, and match the
      // cells with the message they were born during 
          let msg = messages.slice().reverse().filter( m => ( (cell.data + 1) * frameskips) >= m.frameIn)[0] || messages[messages.length - 1]; // if we do the first message as the default after the ||, we get a cool bloom from the middle effect.
      frame.data[red] =   msg.color[0];
      frame.data[red+1] = msg.color[1];
      frame.data[red+2] = msg.color[2];
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
