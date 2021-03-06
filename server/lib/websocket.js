import Mongoose from "server/db/Mongoose";
const logger = require('logat');
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: process.env.SERVER_PORT * 1 + 1000});

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
                .then(chat => {
                    wss.clients.forEach(function each(client) {
                        //client !== ws &&  - ws - client who sends
                        if (client.readyState === WebSocket.OPEN) {
                            chat.populate('transactions').execPopulate(()=>{
                                client.send(adapt(chat));
                            });

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
