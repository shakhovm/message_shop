import React from 'react';
import logo from './logo.svg';
import './App.css';

import OrderBlock from "./components/order_block";
import Header from "./components/header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components/home_page";
import Queries from "./components/Queries";
import SignUp from "./components/sign_up";
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import PrivateRoute from "./components/private_rout/private_route";
import Order from "./components/order";
import Responses from "./components/responses";

const store = createStore(
    (state = {}) => state,
    applyMiddleware((thunk))
);


export default class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // fetch('/isLoggedIn', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-type': "application"
        //     }
        // }).then(result => result.json()).catch(e => alert("Something went wrong!"));
        // localStorage.setItem('x', 'wqfqwfqwqfwwq');
        console.log(localStorage.getItem("isAuthed"));
    }

    render() {

        return (
            <Provider store={ store }>
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <Route path='/login' component={ Login }/>

                        <PrivateRoute exact path='/' component={HomePage}/>

                        <Route path='/myorders' component={ Order }/>

                        <Route path='/myqueries' component={ Queries }/>

                        <Route path='/signup' component={ SignUp }/>

                        <Route path='/response' component={ Responses }/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

