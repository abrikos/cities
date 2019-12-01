import React from 'react';
import {t} from "client/components/Translator";
import {A} from 'hookrouter';
import Chat from "client/components/Chat";
import GeoChart from "client/components/GeoChart";

export default function Home(props) {
    return <div>

        <h1  className="text-center">{t('Cities where Minterarians live')}</h1>
        <GeoChart {...props}/>
        <hr/>
        <div className={'row'}>
            <div className={'col'}>
                <ol>
                    <li><A href={'/mark'} className="btn btn-primary">{t('Find your city')}</A></li>
                    <li>{t('Send any amount of MNT to the appropriate address')}</li>
                    <li>{t('Your city will be displayed on map')}</li>
                </ol>
            </div>
            <div className={'col'} >
                <Chat {...props} height={250}/>
            </div>
        </div>




    </div>


}




