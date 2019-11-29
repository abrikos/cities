import React from "react";
import Home from "client/views/home";
import Login from "client/views/login";
import Cabinet from "client/views/cabinet";
import MarkCity from "client/views/mark-city";

export default function Routes(props){

    return {
        "/": () => <Home {...props}/>,
        "/cabinet": () => <Cabinet {...props}/>,
        "/login": () => <Login {...props}/>,
        "/mark": () => <MarkCity {...props}/>,
    };
}
