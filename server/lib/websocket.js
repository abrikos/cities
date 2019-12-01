import Mongoose from "server/db/Mongoose";
const logger = require('logat');
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: process.env.WS_PORT});

export default function websocket() {
    console.log('ws port', process.env.WS_PORT);

    function adapt(obj){
        return JSON.stringify(obj)
    }

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(received) {
            let data;
            try{
                data = JSON.parse(received);
            }catch (e) {
                return ws.send(adapt({error: e.error}));
            }

            Mongoose.Chat.create(data)
                .then(() => {
                    wss.clients.forEach(function each(client) {
                        //client !== ws &&  - ws - client who sends
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(adapt(data));
                        }
                    });
                })
                .catch(e => {
                    logger.error(e.message);
                    ws.send(adapt({error: e.message}));
                })


        });
    });
}
