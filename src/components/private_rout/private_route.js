import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import HomePage from "../home_page";

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!localStorage.getItem("userId")) {
            return <Redirect to={"/login"}/>;
        }
        return (
            <Route
                path={ this.props.path }
                render={props => {
                    // alert("DJWIOOW");
                    // if (!this.props.auth || !this.props.auth.isAuthed) {
                    //     return <Redirect to={"/login"}/>
                    // }
                    // this.props.component.props = props;
                    // console.log(this.props.component);

                    return (<HomePage></HomePage>)
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps)( PrivateRoute );