import cron from "server/lib/cron"
import websocket from "server/lib/websocket"
const app = require('./app');
const port = process.env.SERVER_PORT;


app.listen(port, 'localhost',function (err) {
    if (err) {
        throw err
    }

    console.log(`server is listening on ${port}...`)
});

cron()
websocket(app)
