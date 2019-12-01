import React, {useState} from "react";
import Layout from "client/views/Layout";
import API from "client/API";
import {navigate} from "hookrouter";


export default function App() {
    const [alert, setAlert] = useState({isOpen: false});
    const [authenticatedUser, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = {
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

        isLoading(on) {
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

        formToObject(form) {
            const array = Array.from(form.elements).filter(f => !!f.name)
            const obj = {};
            for (const a of array) {
                obj[a.name] = a.value
                //if (a.name === 'name' && !a.value) errors.push(a.name)
            }
            return obj
        },

        getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
    };


    return (
        <div className="App">
            <Layout {...params}/>
        </div>
    );
}
