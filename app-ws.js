const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({
    server
  });

  wss.on("connection", (ws) =>{
    console.log(`Web Socket Connected ${wss.id}`)
    ws.on('message', function incoming(message){
      console.log('received: ', JSON.parse(message));
      const mensagem = JSON.parse(message)
      wss.broadcast(mensagem)
    });
    ws.on("error", (err) => console.error(`onError: ${err.message}`));
  });

  wss.broadcast = function broadcast(msg){
    wss.clients.forEach(function each(client){
      client.send(JSON.stringify(msg));
    });
  };

  console.log("Server is liestening on port " + 3000)

  return wss;
}