import React, {useState} from 'react';
import CopyButton from "./CopyButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQrcode} from "@fortawesome/free-solid-svg-icons";
import {Popover, PopoverHeader} from "reactstrap";
import {QRCode} from "react-qr-svg";

export default function Address(props) {
    const [popOver, setPopOver] = useState(false);

    function toggle() {
        setPopOver(!popOver)
    }

    return <span>
            <strong>{props.text.substring(0, 8)}...</strong>&nbsp;
        <FontAwesomeIcon size={'sm'} icon={faQrcode}
                         onClick={e => setPopOver(true)}
                         title={`QR`}
                         style={{cursor: 'pointer', color: '#555'}} id={props.text}/>&nbsp;

        <Popover placement={'top'} isOpen={popOver} target={props.text} toggle={toggle}>
                <PopoverHeader>
                    <QRCode
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        style={{width: 256}}
                        value={props.text}
                    />
                </PopoverHeader>
            </Popover>
                <CopyButton text={props.text} size={'1x'}/>
        </span>
}


