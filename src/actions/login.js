import axios from 'axios';

export function login(state) {

    return dispatch => fetch("http://127.0.0.1:8000/logged-user/", {
        method: 'POST',
        body: JSON.stringify(state)
    }).then(resp => resp.json()).then(body => {
        console.log(body);
        localStorage.setItem("userId", body.id);
        localStorage.setItem("role", body.role);
        localStorage.setItem("e-mail", body["e-mail"]);
        localStorage.setItem("username", state.username);
        // localStorage.setItem();
    });
}

export function signUpRequest(state) {

    return dispatch => fetch("http://127.0.0.1:8000/logged-user/", {
        method: 'GET'
    })
}