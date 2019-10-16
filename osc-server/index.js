'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('isomorphic-ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server,     autoAcceptConnections: true });
let queue = [];
wss.on('connection', function(ws) {
    const id = setInterval( () => {
        let next;
        if ( (next = queue.shift()) !== undefined) {
            console.log('message sending', Date.now(), next);
            //ws.send(JSON.stringify(next), console.log);
            ws.send(next, console.log);
        }
    }, 100);
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
  });
});

   
    // console.log(`Roundtrip time: ${Date.now() - data} ms`);

server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});
