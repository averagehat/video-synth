// have to instantiate board based on image size and width
//
var randChoice = function (arr, default_) {
    var randInt = function (min, max) { return Math.floor(Math.random() * (max - min)) + min; };
    return (arr.length == 0) ? default_ : arr[randInt(0, arr.length)];
};
var state = { frameCount: 0 };
var CoOrd = function (xy) { return ({ x: xy[0], y: xy[1] }); };
var directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]].map(CoOrd);
var getMove = function (pos, board) {
    var possibleMoves = directions.map(function (xy) {
        return ({ x: pos.x + xy.x, y: pos.y + xy.y });
    });
    var validMoves = possibleMoves.filter(function (xy) {
        return xy.x >= 0 && xy.y >= 0 && xy.x < board.length && xy.y < board[0].length && (board[xy.x][xy.y].data == undefined);
    } // && board[xy.x][xy.y].data
     // && board[xy.x][xy.y].data
    );
    return randChoice(validMoves, null); //, {x: 0, y: 0});
};
var performMove = function (board, cell) {
    var move = getMove(cell, board);
    if (move == null) {
        return board;
    }
    var newBoard = board.map(function (b) { return b.slice(); }); // copy
    var newData = cell.data + 1;
    newBoard[move.x][move.y] = { data: newData, x: move.x, y: move.y };
    return newBoard;
};
// could use distance from the center instead of generation
// age is max(generation) - generation
// want to compute max-dist actually
var oDist = function (a, b) {
    return (a.x - b.x) ^ 2 + (a.y - b.y) ^ 2;
};
var computeColors = function (maxDist, origin, cell) {
    var ALPHA = 1;
    var charred = (maxDist < 2) ? 1 : 1 - (oDist(origin, cell) / maxDist);
    return [255 * charred, 255 * charred, 255 * charred, ALPHA];
};
var stepBoard = function (state) {
    var newBoard = state.populated.reduce(function (board, cell) { return performMove(board, cell); }, state.board);
    var newPopulated = newBoard.flat().filter(function (x) { return x.data; });
    //  const newPopulated: Array<SmartCell<number>> = entries.flatMap(e =>
    //      Array.from(e[1].entries()).map(e2 => {
    //          const [x, y, cell] = [e[0], e2[0], e2[1]];
    //          return cell.data ? {x: x, y: y, data: cell.data} : null
    //      })).filter(x => x);
    // const newLState = {...state, board: newBoard, populated: newPopulated };
    var newLState = { frameCount: state.frameCount, origin: state.origin, center: state.center, board: newBoard, populated: newPopulated };
    return newLState;
};
// could just store each new births in a queue
// then add each moved one to it
//
var makeNewImg = function (frame, populated, origin, width) {
    var dists = populated.map(function (c) { return oDist(origin, c); });
    var maxDist = (Math.max.apply(Math, dists));
    populated.forEach(function (cell) {
        var red = cell.y * (width * 4) + cell.x * 4;
        var rgba = computeColors(maxDist, origin, cell);
        frame.data[red] = rgba[0];
        frame.data[red + 1] = rgba[1];
        frame.data[red + 2] = rgba[2];
    });
};
//    for (let i = 0; i < colNalpha.length; i++) {
//        newFrame[red+i] = 255; // colNalpha[i]; 
// }
//  });
//  return newFrame;
var processor = {
    timerCallback: function () {
        if (this.video.paused || this.video.ended) {
            return;
        }
        this.computeFrame();
        var self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 0);
    },
    //      #c2 {/getimage
    //        background-image: url(media/foo.png);
    //        background-repeat: no-repeat;
    //      }
    doLoad: function () {
        this.video = document.getElementById("video");
        this.c1 = document.getElementById("c1");
        this.ctx1 = this.c1.getContext("2d");
        this.c2 = document.getElementById("c2");
        this.ctx2 = this.c2.getContext("2d");
        var self = this;
        this.video.addEventListener("play", function () {
            self.width = self.video.videoWidth / 2;
            self.height = self.video.videoHeight / 2;
            self.timerCallback();
        }, false);
    },
    computeFrame: function () {
        if (state.board == undefined) {
            state.board = [];
            for (var i = 0; i < this.width; i++) {
                state.board[i] = [];
                for (var j = 0; j < this.height; j++) {
                    state.board[i][j] = { x: i, y: j, data: undefined };
                }
            }
            var center = { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2), data: 1 };
            state.board[center.x][center.y] = center;
            state.origin = center;
            state.populated = [center];
        }
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        var SKIP_FRAMES = 10;
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
document.addEventListener("DOMContentLoaded", function () {
    processor.doLoad();
});
