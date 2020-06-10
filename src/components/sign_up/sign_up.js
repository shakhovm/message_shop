import React from 'react';
import './sign_up.css';
import {connect} from "react-redux";
import {signUpRequest} from "../../actions/login";
import axios from "axios";

const inputs = [
    {name: 'first_name', text: 'First Name'},
    {name: 'last_name', text: 'Last Name'},
    {name: 'username', text: 'Username'},
    {name: 'email', text: "Email"},
    {name: 'password', text: 'Password'},
];

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            role: null,
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.x = this.x.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(resp => resp.json()).then(body => {
            console.log(body)
            ;})
            .catch(e => {console.log(e)})
        // this.props.signUpRequest(this.state).then(resp => {
        //         console.log(resp);
        //
        //     }
        //
        // ).catch(e => {
        //     console.log(e);
        // });

    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value});
    }

    x(e) {
        e.preventDefault();
        alert("EDWIOWE")
    }

    render() {
        if (this.state.role !== null) {
            return (
                <form className={ "register-block" } onSubmit={ this.onSubmit} >
                    <div className={ "input-block" }>
                        {
                            inputs.map(input => (
                                <div className={ "label-input"}>
                                    <label htmlFor="inputText">{ input.text }</label>
                                    <input name={ input.name } type="text" onChange={ this.onChange }/>
                                </div>
                            ))
                        }
                        <input type="submit" value="Login"/>

                    </div>
                </form>
            )
        }
        return (
            <form className={ "register-block" }>
                <h1>REGISTER AS</h1>
                <input value="USER" type={"button"} onClick={ e => {this.setState({role: 2})} } />
                <input value="AUTHOR" type="button" onClick={ e => {this.setState({role: 1})} } />
            </form>
        );
    }
}
//
// SignUp.propTypes = {
//     signUpRequest: React.PropTypes.func.isRequired
// };

export default connect(state => {}, { signUpRequest })(SignUp);