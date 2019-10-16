
export { LState, Board, stepState, Cell, Pos, initState }

const initState = (width: number, height: number): LState<number> => {
    let board = [];
    for(let i=0; i<width; i++) {
        board[i] = [];
        for(let j=0; j<height; j++) {
            board[i][j] = { x: i, y: j, data: undefined}
        }
    }
    const center =  { x: Math.floor(width / 2), y: Math.floor(height / 2), data: 1}
    board[center.x][center.y] = center;
    return { origin: center, center: center, populated: [center], board: board, frameCount: 0 }
} 

const randChoice = <T>(arr: Array<T>, default_: T) => { 
    const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min) ) + min;
    return (arr.length == 0) ? default_ : arr[randInt(0, arr.length)]
}

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


//interface Array<T> {
//    flat(): Array<T>;
//    flatMap(func: (x: T) => T): Array<T>;
//}
type Row = Array<Cell<number>>
const stepState = (state: LState<number>): LState<number> => {
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
