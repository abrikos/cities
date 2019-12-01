import React, {useEffect, useRef} from 'react';
import 'client/views/style/main.sass';
import 'client/views/style/modal.css';
import {useRoutes} from "hookrouter";
import routes from "client/Routes";
import {changeLanguage} from "client/components/Translator";
import Loader from "client/components/Loader";
import {Button} from "reactstrap";
import {t} from "client/components/Translator"

export default function Layout(props) {

/*
    const menuItems = [
        {label: t('Home'), path: '/'},
        {label: t('Mark my city'), path: '/mark'},
        //{label: t('Cabinet'), path: '/cabinet', hidden: !props.authenticatedUser},
        {label: t('Login'), path: '/login', hidden: props.authenticatedUser},
        {label: t('Logout'), onClick: props.logOut, hidden: !props.authenticatedUser},
        {
            label: t('Language'), items: [
                {label: 'RU', onClick: () => changeLanguage('ru')},
                {label: 'EN', onClick: () => changeLanguage('en')},
            ]
        },
    ];
*/
    useEffect(() => {
        props.checkAuth()
            .then(res => {
                //setLoading(false)
            })

    }, []);


    let routeResult = useRoutes(routes(props));
    const prevRoute = usePrevious(routeResult);
    if (routeResult && prevRoute && prevRoute.type !== routeResult.type) {
        props.clearAlert()
    } else {
        //routeResult = <NotFound/>
    }


    function usePrevious(value) {
        // The ref object is a generic container whose current property is mutable ...
        // ... and can hold any value, similar to an instance property on a class
        const ref = useRef();

        // Store current value in ref
        useEffect(() => {
            ref.current = value;
        }, [value]); // Only re-run if value changes

        // Return previous value (happens before update in useEffect above)
        return ref.current;
    }

    return <div className={'content main'}>
        {props.loading ? <Loader/> : <div className="container py-2">
            <span>
                    <Button onClick={() => changeLanguage('en')} color={'link'}><span role="img" aria-label={"EN"}>🇬🇧</span></Button>
                    <Button onClick={() => changeLanguage('ru')} color={'link'}><span role="img" aria-label={"RU"}>🇷🇺</span></Button>
                </span>

            {props.errorPage || routeResult}
            <hr/>
            <footer className="d-flex justify-content-between">
                <span><a href={'https://www.abrikos.pro'} target={'_blank'}>abrikos 2019</a></span>
                <span><a href={'https://telegram.me/mnt_crane_bot'} target={'_blank'}>{t('Free MNT')}</a></span>

            </footer>
        </div>}

    </div>

}


