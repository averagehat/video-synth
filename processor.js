
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const randChoice = (arr, default_) => 
    (arr.length == 0) ? default_ : arr[randInt(0, arr.length)]

const CoOrd = (xy) => { x: xy[0], y: xy[1] };
interface Cell<T> {
    data?: T
}
const directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 0), (0, 1), (1, -1), (1, 0), (1, 1)].map(CoOrd);
function getMove(pos, board) { 
    const possibleMoves = directions.map(xy => 
        (pos.x + xy.x, pos.y + xy.y)
    ); 
    const validMoves = possibleMoves.filter(xy =>
        board[xy.x][xy.y].data == undefined
    );
    const move = randChoice(validMoves, (0, 0))
    return move
}

const performMove = (pos, board) => {
    move = getMove(pos, board); 
    let newBoard = board.map(board => board.slice()); // copy
    const newData = board[ pos.x ][pos.y].data + 1;
    newBoard[ move.x ] [ move.y ] = { data: newData };
    return newBoard; 
}

// could use distance from the center instead of age
// want to compute max-dist actually
const oDist = (board, cell) => (board.origin.x - cell.x)^2 + (board.origin.y - cell.y)^2
const computeColors = (board, cell) => { 
    const ALPHA = 1
    const dists = populated.map(c => oDist(board, c))
    const maxDist = (Math.max(...dists));
    const charred = (maxDist < 2) ? 1 :  1 - (oDist(cell) / maxDist);
    return [255*charred,255*charred,255*charred, ALPHA]; 
}
const newImg = (frame, board) => {
  const populated = board.entries().flatMap(e =>
      e[1].map(e2 => {
          const [x, y, cell] = [e[0], e2[0], e2[1]];
          return cell.data ? {x: x, y: y, data: cell.data} : null
      })).filter(id)
  populated.map(cell => {
    const red = cell.y * (width * 4) + cell.x * 4;
    const colNalpha = computeColors(board, cell);
    // [redVal, greenVal, blueVal, alphaVal] = computeColors(board, cell);
    for (let i = 0; i < colNalpha.length; i++) {
      frame[red+i] = colNalpha[i]; 
 }
  });
  return frame;
  }



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
      let cx = self.video.videoWidth / 4;
      let cy = self.video.videoHeight / 4;
      let game.origin = 
      this.video.addEventListener("play", function() {
          self.width = self.video.videoWidth / 2;
          self.height = self.video.videoHeight / 2;
          self.timerCallback();
        }, false);
    },
  
    computeFrame: function() {
      // this.ctx1.canvas.crossOrigin = "Anonymous";
      this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
      let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
      let l = frame.data.length / 4;
  
      for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        if (g > 100 && r > 100 && b < 43)
          frame.data[i * 4 + 1] = 0;
          frame.data[i * 4 + 2] = 0;
      }
      this.ctx2.putImageData(frame, 0, 0);
      return;
    }
  };

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});
