import React from 'react';

import './home_page.css';
import {CUSTOMER} from "../../consts/consts";


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1 className={"main-h"}>
                    My Page
                </h1>
                <div className={"content-block"}>
                    <div>Username: { localStorage.getItem("username")}</div>
                    <div>Role: { localStorage.getItem("role") === CUSTOMER ? "Customer" : "Author" }</div>
                    <div>E-mail: { localStorage.getItem("e-mail") }</div>
                </div>
            </>
        );
    }
}