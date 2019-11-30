const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.WS_PORT });

export default function websocket() {
    console.log('ws port', process.env.WS_PORT)
    wss.on('connection', function connection(ws) {

        ws.on('message', function incoming(data) {
            console.log(data)
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });
    });
}
