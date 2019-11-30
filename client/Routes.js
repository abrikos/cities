import React from "react";
import Home from "client/views/home";
import MarkCity from "client/views/mark-city";

export default function Routes(props){

    return {
        "/": () => <Home {...props}/>,
        "/mark": () => <MarkCity {...props}/>,
    };
}
