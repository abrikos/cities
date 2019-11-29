import React from "react";
import Home from "client/views/home";
import Login from "client/views/login";
import Cabinet from "client/views/cabinet";

export default function Routes(props){

    return {
        "/": () => <Home {...props}/>,
        "/cabinet": () => <Cabinet {...props}/>,
        "/login": () => <Login {...props}/>,
    };
}
