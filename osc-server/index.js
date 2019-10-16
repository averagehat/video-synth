'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('isomorphic-ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const easymidi = require('easymidi'); 
const T = require("timbre");

const wss = new WebSocket.Server({ server,     autoAcceptConnections: true });
let queue = [];

const midi2freq =  m => 2**((m-69)/12)*440

wss.on('connection', function(ws) {
    const id = setInterval( () => {
        let next;
        if ( (next = queue.shift()) !== undefined) {
            console.log('message sending', Date.now(), next);
            //ws.send(JSON.stringify(next), console.log);
            ws.send(next, console.log);
        }
    }, 100);

  let midiOn = (easymidi.getInputs().length > 0)
  console.log('midi available', midiOn, easymidi.getInputs());
  let midiInput = new easymidi.Input(easymidi.getInputs()[0]);
  let synth = T("OscGen", {wave:"saw", mul:0.25}).play();
  const playNoteOn = m => synth.noteOnWithFreq(midi2freq(m), 100);
  midiInput.on('noteon', midi => {
    console.log('MIDI message received', Date.now(), midi);
    const MAX = 255;
    let rgb = [0, 0, 0];
    // Midi: note, channel, velocity, _type ('noteon')
    if (midi.note < 51) rgb[0] = MAX;
    else if ( (midi.note >= 51) && (midi.note < 61)) rgb[1] = MAX;
    else rgb[2] = MAX;
    const data = {...midi, time: Date.now(), color: rgb};
    playNoteOn(midi.note);
    const VISUAL_DELAY = 700;
    setTimeout(() => 
       wss.clients.forEach(function each(client) {
         if (client.readyState === WebSocket.OPEN) {
           client.send( JSON.stringify(data) );
         }
       }), VISUAL_DELAY);
  });



   // ws.send(JSON.stringify({time : 0.5, color : [0, 255, 0, 1]}));
//  const id = setInterval(function() {
//    ws.send(JSON.stringify(process.memoryUsage()), function() {
//      //
//      // Ignore errors.
//      //
//    });
//  }, 100);
//  console.log('started client interval');
  ws.on('message', (data) => {
    const now = Date.now(); // JSON.stringify
    const msg = JSON.parse(data);
    console.log('message received', now, msg);
    // queue.push(data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
    // setTimeout(() => ws.send(data), 500);
});

  ws.on('close', function() {
    console.log('stopping client interval');
    clearInterval(id);
    midiInput.close()
  });
});

   
    // console.log(`Roundtrip time: ${Date.now() - data} ms`);

server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});
