import React from "react";

import './header.css';

import { NavLink } from 'react-router-dom';

const links = [
    {to: '/', text: "Home"},
    {to: '/myqueries', text: "My Queries"},
    {to: '/myorders', text: "My Orders"},
    // {to: '/signup', text: "Sign Up"},
    //
    // {to: '/login', text: "Login"},
];

export default class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header>
                <nav className='main-nav'>
                    { links.map(link => (
                        <div className='sidebar-item'>
                            <NavLink to={ link.to } className="nav-link">
                                { link.text }
                            </NavLink>
                        </div>
                    ))}
                    <div className='sidebar-item1'>
                        <NavLink to={ '/signup' } className="nav-link">
                            Sign Up
                        </NavLink>
                    </div>
                    <div className='sidebar-item1'>
                        <NavLink to={ '/login' } className="nav-link">
                            Login
                        </NavLink>
                    </div>
                </nav>
            </header>
        );
    }

}