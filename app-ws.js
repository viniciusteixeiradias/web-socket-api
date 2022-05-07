const WebSocket = require('ws');
 
function onError(ws, err) {
  console.error(`onError: ${err.message}`);
}
 
function onMessage(ws, data) {
  console.log(`onMessage: ${JSON.parse(data)}`);
  ws.send(`recebido!`);
}
 
// function onConnection(ws, req) {
//   ws.on('message', data => onMessage(ws, data));
//   ws.on('error', error => onError(ws, error));
//   console.log(`onConnection`);
// }

// function onConnection(ws, req) {
//   console.log(`Web Socket Connected`)
//   ws.on("message", (message) => {
//     console.log(`Received: ${message}`)
//     ws.broadcast(message)
//   })
//   ws.send(JSON.stringify({
//     user: "Node",
//     text: "Hello from Node.js Server"
//   }))
// }

// function onConnection(ws) {
//     ws.on('message', function incoming(message){
//       var cliente
//       console.log('received: ', message);
//       ws.broadcast(message);
//    });
  
//   ws.broadcast = function broadcast(msg){
//     ws.clients.forEach(function each(client){
//       client.send(msg);
//     });
//   };
// }

module.exports = (server) => {
  const wss = new WebSocket.Server({
    server
  });

  // wss.on('connection', onConnection);

  wss.on("connection", (ws) =>{
    console.log(`Web Socket Connected ${wss.id}`)
    ws.on('message', function incoming(message){
      console.log('received: ', JSON.parse(message));
      const mensagem = JSON.parse(message)
      wss.broadcast(mensagem)
    });
  });

  wss.broadcast = function broadcast(msg){
    wss.clients.forEach(function each(client){
      client.send(JSON.stringify(msg));
    });
  };

  console.log("Server is liestening on port " + 3000)
  
  console.log(`App Web Socket Server is running!`);

  return wss;
}