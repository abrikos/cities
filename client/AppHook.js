import React, {useState} from "react";
import Layout from "client/views/Layout";
import API from "client/API";
import {navigate} from "hookrouter";


export default function App() {
    const [alert, setAlert] = useState({isOpen: false});
    const [authenticatedUser, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorPage, setErrorPage] = useState(false)
    const params = {
        errorPage,
        loading,
        authenticatedUser,
        alert,
        setAlert: (response) => {
            const color = response.error ? 'danger' : 'success';
            setAlert({isOpen: true, children: response.message, color})
        },

        clearAlert: () => {
            setAlert({isOpen: false})
        },

        async api(path, data) {
            //setIsLoading(true);
            const res = await API.postData(path, data);
            //setIsLoading(false);
            if (!res.error) return res;
            this.clearAlert();
            if (res.error) {
                //console.error(res)
                res.message += ': ' + path
                this.setAlert(res);
                throw res;
            }
            return res;
        },

        isLoading(on){
            setLoading(on)
        },

        async checkAuth() {
            const user = await API.postData('/isAuth');
            if (!user.error) setAuth(user);
        },

        logOut: () => {
            API.postData('/logout')
                .then(res => {
                    if (res.ok) setAuth(false);
                    navigate('/login');
                })
        },

        logIn: (strategy) => {
            API.postData('/login/' + strategy)
                .then(res => {
                    if (res.error) return;
                    if (res.ok) setAuth(true);
                    navigate('/cabinet');

                });
        },
    };


    return (
        <div className="App">
            <Layout {...params}/>
        </div>
    );
}
