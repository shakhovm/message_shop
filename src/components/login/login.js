import React from 'react';

import './login.css';
import {connect} from "react-redux";
import {login} from "../../actions/login";
import {Redirect} from "react-router-dom";
// import { connect } from 'react-redux';
// import { login } from '../../actions/login';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            isLoading: false,
            entered: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({...this.state, erros: {}, isLoading: true});
        this.props.login(this.state).then(resp => this.setState({...this.state, entered: true}))

    }

    onChange(e) {
        e.preventDefault();

        this.setState({ [e.target.name]: e.target.value});

    }

    render() {
        if (this.state.entered) {
            return <Redirect to='/'/>;
        }

        const { errors, user, password, isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit} className={ "register-block" }>
                <div className={ "input-block" }>
                    <label htmlFor="inputText">Username</label>
                    <input name="username" type="text" onChange={ this.onChange }/>
                    <label htmlFor="inputText">Password</label>
                    <input name="password" type="password" onChange={ this.onChange }/>
                    <input type="submit" disabled={isLoading} value="Login"/>
                </div>

            </form>
        );
    }
}

// Login.propTypes = {
//     login: React.PropTypes.func.isRequired
// };
//
// Login.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };
//
export default connect(null, { login })(Login);