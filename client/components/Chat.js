import React, {useEffect} from "react";
import Websocket from 'ws';

export default function Chat() {
    const ws = new WebSocket('ws://localhost:4006');
    useEffect(()=>{
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            ws.send('fsdfsdfs')
        };
    })
    return <div>
        Chat
    </div>
}
