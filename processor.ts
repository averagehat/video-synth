// have to instantiate board based on image size and width
//

const randChoice = <T>(arr: Array<T>, default_: T) => { 
    const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min) ) + min;
    return (arr.length == 0) ? default_ : arr[randInt(0, arr.length)]
}

let state: LState<number> = {frameCount: 0};
const CoOrd = (xy: Array<number>): Pos => ({ x : xy[0], y : xy[1] })
interface Pos {
    x: number,
    y: number
}
interface Cell<T> {
    data?: T,
    x: number,
    y: number
}
interface LState<T> {
    board: Board,
    origin: Cell<T>,
    center: Pos,
    populated: Array<Cell<T>>,
    frameCount: number
    }
type Board = Array<Array<Cell<number>>>;
const directions: Array<Pos> = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]].map(CoOrd);
const getMove = (pos: Pos, board: Board) => { 
    const possibleMoves = directions.map(xy => 
        ({ x: pos.x + xy.x, y: pos.y + xy.y })
    ); 
    const validMoves = possibleMoves.filter(xy =>
        xy.x >= 0 && xy.y >= 0 && xy.x < board.length && xy.y < board[0].length && (board[xy.x][xy.y].data == undefined)// && board[xy.x][xy.y].data
    );
    return randChoice(validMoves, null) //, {x: 0, y: 0});
}

const performMove = (board: Board, cell: Cell<number>): Board => {
    const move = getMove(cell, board); 
    if (move == null) {
        return board;
    }
    let newBoard: Board = board.map(b => b.slice()); // copy
    const newData = cell.data + 1;
    newBoard[ move.x ][ move.y ] = { data: newData, x: move.x, y: move.y };
    return newBoard; 
}

// could use distance from the center instead of generation
// age is max(generation) - generation
// want to compute max-dist actually
const oDist = (a: Pos, b: Pos): number => 
 (a.x - b.x)^2 + (a.y - b.y)^2

const computeColors = (maxDist: number, origin: Pos, cell: Pos) => { 
    const ALPHA = 1;
    const charred = (maxDist < 2) ? 1 :  1 - (oDist(origin, cell) / maxDist);
    return [255*charred,255*charred,255*charred, ALPHA]; 
}

//interface Array<T> {
//    flat(): Array<T>;
//    flatMap(func: (x: T) => T): Array<T>;
//}
type Row = Array<Cell<number>>
const stepBoard = (state: LState<number>): LState<number> => {
  const newBoard: Board = state.populated.reduce( (board: Board, cell: Cell<number>) => performMove(board, cell), state.board);
  const newPopulated = newBoard.flat().filter( (x: Cell<number>) => x.data);
    //  const newPopulated: Array<SmartCell<number>> = entries.flatMap(e =>
    //      Array.from(e[1].entries()).map(e2 => {
    //          const [x, y, cell] = [e[0], e2[0], e2[1]];
    //          return cell.data ? {x: x, y: y, data: cell.data} : null
    //      })).filter(x => x);
    // const newLState = {...state, board: newBoard, populated: newPopulated };
  const newLState = { frameCount: state.frameCount, origin: state.origin, center: state.center, board: newBoard, populated: newPopulated };
  return newLState;
}
// could just store each new births in a queue
// then add each moved one to it
//
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
      //    for (let i = 0; i < colNalpha.length; i++) {
      //        newFrame[red+i] = 255; // colNalpha[i]; 
      // }
      //  });
      //  return newFrame;


let processor = {
    timerCallback: function() {
      if (this.video.paused || this.video.ended) {
        return;
      }
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
        }, 0);
    },
  
//      #c2 {/getimage
//        background-image: url(media/foo.png);
//        background-repeat: no-repeat;
//      }
    doLoad: function() {
      this.video = document.getElementById("video");
      this.c1 = document.getElementById("c1");
      this.ctx1 = this.c1.getContext("2d");
      this.c2 = document.getElementById("c2");
      this.ctx2 = this.c2.getContext("2d");
      let self = this;
      this.video.addEventListener("play", function() {
          self.width = self.video.videoWidth / 2;
          self.height = self.video.videoHeight / 2;
          self.timerCallback();
        }, false);
    },
  
    computeFrame: function() {
        if (state.board == undefined) { 
           state.board = [];
           for(let i=0; i<this.width; i++) {
               state.board[i] = [];
               for(let j=0; j<this.height; j++) {
                   state.board[i][j] = { x: i, y: j, data: undefined}
               }
           }
          const center = { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2), data: 1}
          state.board[center.x][center.y] = center;
          state.origin = center;
          state.populated = [center];
} 
      this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
      const SKIP_FRAMES = 10;
      if ((state.frameCount % SKIP_FRAMES) == 0) { 
          state = stepBoard(state);
      }
        //  const newImg = 
      makeNewImg(frame, state.populated, state.origin, this.width);
        // frame.data = newImg;   
        // state = newLState;
      state.frameCount++;
      this.ctx2.putImageData(frame, 0, 0); 
//      // this.ctx1.canvas.crossOrigin = "Anonymous";
//      let l = frame.data.length / 4; 
//      for (let i = 0; i < l; i++) {
//        let r = frame.data[i * 4 + 0];
//        let g = frame.data[i * 4 + 1];
//        let b = frame.data[i * 4 + 2];
//        if (g > 100 && r > 100 && b < 43)
//          frame.data[i * 4 + 1] = 0;
//          frame.data[i * 4 + 2] = 0;
//      }
      return;
    }
  };

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});
