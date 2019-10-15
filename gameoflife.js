

const randChoice = (arr, default_) => { 
    randInt = (min, max) => Math.floor(Math.random() * (max - min) ) + min;
    return (arr.length == 0) ? default_ : arr[randInt(0, arr.length)]
}

let board = [];
board.populated = [];

const CoOrd = (xy) => { x: xy[0], y: xy[1] };

// interface Cell<T> {
//     data?: T
// }
const directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 0), (0, 1), (1, -1), (1, 0), (1, 1)].map(CoOrd);
getMove = (pos, board) => { 
    const possibleMoves = directions.map(xy => 
        (pos.x + xy.x, pos.y + xy.y)
    ); 
    const validMoves = possibleMoves.filter(xy =>
        board[xy.x][xy.y].data == undefined
    );
    return randChoice(validMoves, (0, 0))
}

const performMove = (board, pos) => {
    move = getMove(pos, board); 
    let newBoard = board.map(board => board.slice()); // copy
    const newData = board[ pos.x ][pos.y].data + 1;
    newBoard[ move.x ] [ move.y ] = { data: newData };
    return newBoard; 
}

// could use distance from the center instead of generation
// age is max(generation) - generation
// want to compute max-dist actually
const oDist = (board, cell) => (board.origin.x - cell.x)^2 + (board.origin.y - cell.y)^2
const computeColors = (board, cell) => { 
    const ALPHA = 1;
    const dists = board.populated.map(c => oDist(board, c));
    const maxDist = (Math.max(...dists));
    const charred = (maxDist < 2) ? 1 :  1 - (oDist(cell) / maxDist);
    return [255*charred,255*charred,255*charred, ALPHA]; 
}
const stepBoard = (board) => {
  newBoard = board.populated.reduce(preformMove(cell, board));
  newBoard.populated = board.entries().flatMap(e =>
      e[1].map(e2 => {
          const [x, y, cell] = [e[0], e2[0], e2[1]];
          return cell.data ? {x: x, y: y, data: cell.data} : null
      })).filter(x => x);
  return newBoard
}
// could just store each new births in a queue
// then add each moved one to it
//
const newImg = (frame, board) => {
  let newFrame = frame.slice();
  board.populated.forEach(cell => {
    const red = cell.y * (width * 4) + cell.x * 4;
    const colNalpha = computeColors(board, cell);
    for (let i = 0; i < colNalpha.length; i++) {
      newFrame[red+i] = colNalpha[i]; 
 }
  });
  return newFrame;
  }


