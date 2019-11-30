import React, {useEffect, useRef} from 'react';
import 'client/views/style/main.sass';
import 'client/views/style/modal.css';
import {useRoutes} from "hookrouter";
import routes from "client/Routes";
import {changeLanguage, t} from "client/components/Translator";
import Loader from "client/components/Loader";


export default function Layout(props) {
    let {children, alert, ...rest} = props;

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


            {props.errorPage || routeResult}
            <hr/>
            <footer>
                <small><a href={'https://www.abrikos.pro'}>abrikos 2019</a></small>
                <span className="float-right">
                <a href={'#'} onClick={() => changeLanguage('en')}>🇬🇧</a>
                <a href={'#'} onClick={() => changeLanguage('ru')}>🇷🇺</a>
            </span>
            </footer>
        </div>}

    </div>

}


