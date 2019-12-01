import React, {useEffect, useReducer, useState} from "react";
import {t} from "client/components/Translator"
import "./Chat.sass"

export default function Chat(props) {

    const [socket, setSocket] = useState();
    const [savedName, setSavedName] = useState();
    const [state, dispatchMessage] = useReducer(reducer, {messages: []});

    function reducer(state, action) {
        console.log('REDUCER')
        if (action.length) {
            return {messages: action};
        } else {
            const messages = state.messages.filter(m => m.id !== action.id);
            if (messages.length > 50)
                messages.splice(0, 1);
            messages.push(action)
            console.log(messages, action)
            return {messages};
        }
    }

    useEffect(() => {
        setSavedName(props.getCookie('chatName'));
        wsLaunch();
        loadAllMessages();
        const elmnt = document.getElementById("bottom");
        setTimeout(() => {
            elmnt.scrollIntoView({block: "center", behavior: "smooth"});
        }, 1000)

    }, []);

    function wsLaunch() {
        const so = new WebSocket(`ws://${window.location.hostname}/ws`);
        setSocket(so);
        so.onmessage = onMessage;
        so.onopen = () => {
            console.log('WS connected')
        }
    }

    function loadAllMessages() {
        props.api('/chat/all')
            .then(dispatchMessage)
    }

    function onMessage(e) {
        console.log(e)
        const msg = JSON.parse(e.data);
        if (msg.error) return;
        dispatchMessage(msg)
    }

    function sendMessage(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        document.cookie = `chatName=${form.name}`;
        socket.send(JSON.stringify(form))
        e.target.reset()
        scrollBottom()
    }

    function scrollBottom() {

    }

    return <div id="chat-container">

        <div id={'scroll'} style={{height: props.height || 250, textOverflow: 'ellipsis', overflow: 'scroll', overflowX: 'hidden'}}>
            {state.messages.map(((m, i) => <div key={i}><strong>{m.name}</strong>: {m.text}</div>))}
            <div id={"bottom"}></div>
        </div>
        <form onSubmit={sendMessage}>
            <div><input name={'name'} defaultValue={savedName} placeholder={'nick'}/></div>
            <div><textarea name={'text'} placeholder={'message'} maxLength={100}/></div>
            <button>{t('Send')}</button>
        </form>
    </div>
}
