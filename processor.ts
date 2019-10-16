
import { stepState, initState } from './gameoflife';
import { makeNewImg } from './interpreter';

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
          self.state = initState(self.width, self.height);
          self.timerCallback();
        }, false);
    },
  
    computeFrame: function() {
      this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
      const SKIP_FRAMES = 10;
        if (this.state) {
          if ((this.state.frameCount % SKIP_FRAMES) == 0) { 
             this.state = stepState(this.state);
        }
          makeNewImg(frame, this.state.populated, this.state.origin, this.width);
          this.state.frameCount++;
      }
        //  const newImg = 
        // frame.data = newImg;   
        //
        // state = newLState;
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