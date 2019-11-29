import React, {useState} from 'react';
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Popover, PopoverHeader} from "reactstrap";
import {t} from 'client/components/Translator';


export default function CopyButton(props) {
    const [popover, setPopOver] = useState(false)


    function copyToClipboard (text) {
        setPopOver(true);
        const textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select();
        document.execCommand('copy')
        textField.remove();
        setTimeout(() => {
            setPopOver(false)
        }, 2000);
    }



        const id='cpbtn'+props.text;
        return <span>
            <FontAwesomeIcon size={'sm'} icon={faCopy}
                             onClick={e => copyToClipboard(props.text)}
                             title={`Press to copy: ${props.text}`}
                             style={{cursor: 'pointer', color: '#555'}} id={id}/>
            <Popover placement={'right'}
                     isOpen={popover}
                     target={id}>
          <PopoverHeader>{t('Copied')}</PopoverHeader>
        </Popover>
        </span>

}


