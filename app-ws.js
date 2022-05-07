const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({
    server
  });

  let messages = []

  wss.on("connection", (ws) =>{
    // New Connection
    console.log(`Web Socket Connected ${ws.id}`)

    if (messages.length > 0)
      messages.forEach(message => {
        ws.send(JSON.stringify(message))
      })


    // Received Messages
    ws.on('message', function incoming(message){
      console.log('received: ', JSON.parse(message));
      const mensagem = JSON.parse(message)
      messages.push(mensagem)
      wss.broadcast(mensagem, ws)
    });
    ws.on("error", (err) => console.error(`onError: ${err.message}`));
  });

  wss.broadcast = function broadcast(msg, ws){
    wss.clients.forEach(function each(client){
      console.log("entrei")
      console.log(client !== ws)
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(JSON.stringify(msg));
      }
    });
  };

  console.log("Server is liestening on port " + 3000)

  return wss;
}