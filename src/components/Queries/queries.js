import React from 'react';
import OrderBlock from "../order_block";
import {BrowserRouter, Redirect} from "react-router-dom";
import {AUTHOR, CUSTOMER, DJANGO_URL} from "../../consts/consts";


const inputFunc = (name, type) => `<input name=${name} type=${type} />`;

// const queryText = [
//     `I want to find all authors who I ordered messages from in time period from ${inputDate}
//     to ${inputDate}`,
//
//     `I want to find all social networks where I ordered at least ${inputNumber} messages in time period from ${inputDate}
//         to ${inputDate}`,
//     `I want to find all authors who had access to at least one account in any social network`,
//     `I want to find for each message style how many messages get 50% discount in time period from ${inputDate} to
//         ${inputDate}`
//
// ];

const authorQueries = [
    {
        text: `I want to find all users who ordered messages 
            ${inputFunc("count_of_messages", "number")} 
            times from in time period from ${inputFunc("date_start", "date")} to 
            ${inputFunc("date_end", "date")}`,
        type: 'customers',
    },

    {
        text: `I want to find all accounts which I had access from 
       ${inputFunc("date_start", "date")}  to 
       ${inputFunc("date_end", "date")} `,
        type: 'authors-socials'
    },


    {
        text: `I want to find the social network in the desc order of avarage numbrt of messages from 
       ${inputFunc("date_start", "date")}  to 
       ${inputFunc("date_end", "date")} `,
        type: 'active-networks'
    }

];

const userQueries = [
    {
        text: `I want to find all authors who I ordered messages from in time period from 
        ${inputFunc("date_start", "date")} to ${inputFunc("date_end", "date")}`,
        type: 'authors'
    },

    {
        text: `I want to find all social networks where I ordered at least 
        ${inputFunc("count_orders", "number")}  messages in time period from 
        ${inputFunc("date_start", "date")}
        to ${inputFunc("date_end", "date")}`,
        type: "socials"
    },
    {
        text: `I want to find all authors who had access to at least one account and then was denied
            in any social network`,
        type: 'authors-denied'
    },
    {
        text: `I want to find for each message style how many messages get 50% discount in time period from ${inputFunc("date_start", "date")}
         to ${inputFunc("date_end", "date")}`,
        type: "customer-style-messages"
    }
];

const sharedQueries = [
    // {
    //     text: `
    //     type: 'author-off-diff-customers'
    // },
    //
    // {
    //     text:
    //     type: ''
    // }
    //
    // //

];

export default class Queries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getResponse: false,
            queries: [],
            data: {},
            role: '',
            userId: '',
            users: []

        };

        this.onClick = this.onClick.bind(this);
        this.commonEvent = this.commonEvent.bind(this);
    }

    componentDidMount() {
        let role = localStorage.getItem("role");
        let userId = localStorage.getItem("userId");
        this.setState({role: role, userId: userId});

        fetch(DJANGO_URL + '/users/')
            .then(resp => resp.json())
            .then(body => {
                this.setState({users: body});
                console.log(body);
            }).catch(e => {console.log(e)});
        if (role === CUSTOMER) {
            this.setState({queries: [...userQueries, ...sharedQueries]})
        } else if (role === AUTHOR) {
            this.setState({queries: [...authorQueries]})
        }
    }

    onClick(e, type, next, method) {
        e.preventDefault();
        let data = {};
        console.log(e.target.parentElement.getElementsByTagName("input"));
        [...e.target.parentElement.getElementsByTagName("input")].forEach(e => {
            data[e.name] = isNaN(e.value) ? e.value : parseInt(e.value);
        });
        console.log(data);
        let init = {
          method: method
        };
        console.log(`${DJANGO_URL}/${type}${next}`);
        if (method === 'POST') {
            init.body = JSON.stringify(data);
            init.headers = {'Content-Type': 'application/json'};
        }
        console.log(init);
        fetch(`${DJANGO_URL}/${type}${next}`, init).then(resp => {
            console.log(resp);return resp.json()}).then(body => {
            this.setState({getResponse: true, data: body});
        });
    }

    commonEvent(e) {
        let parent = e.target.parentElement;
        let selects = parent.getElementsByTagName("select");
        let data = {};
        [...e.target.parentElement.getElementsByTagName("input")].forEach(e => {
            data[e.name] = isNaN(e.value) ? e.value : parseInt(e.value);
        });
        fetch(`${DJANGO_URL}/author-customer/${selects[1].value}/${selects[0].value}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => {
            console.log(resp);return resp.json()}).then(body => {
            this.setState({getResponse: true, data: body});
        });

    }

    authorEvent(e) {
        let parent = e.target.parentElement;
        let selects = parent.getElementsByTagName("select");
        let data = {};
        [...e.target.parentElement.getElementsByTagName("input")].forEach(e => {
            data[e.name] = isNaN(e.value) ? e.value : parseInt(e.value);
        });
        fetch(`${DJANGO_URL}/author-in-group-size/${selects[0].value}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => {
            console.log(resp);return resp.json()}).then(body => {
            this.setState({getResponse: true, data: body});
        });

    }

    render() {
        if (!localStorage.getItem("userId")) {
            return <Redirect to={"/login"}/>;
        }
        if (this.state.getResponse) {

            return <Redirect to={{
                pathname: '/response',
                state: {
                   data: this.state.data
                }
            }}>

            </Redirect>
        }
        const { queries } = this.state;

        return (
            <div className={"orders"}>
                <h1>My Queries</h1>
                {
                    queries.map(text => (
                        <OrderBlock text={text.text }
                                    onClick={ e => this.onClick(e, text.type, `/${this.state.userId}/`, 'POST') }/>
                    ))
                }
                <OrderBlock text={`I want to find all authors who had orders at least
                ${inputFunc("count_customers", "number")}different users from in time period from
                ${inputFunc("date_start", "date")}to
                ${inputFunc("date_end", "date")}`}
                            onClick={ e => this.onClick(e, `author-of-diff-customers`,
                                `/`, "POST") }/>
                <OrderBlock text={`I want to find all users who ordered at least ${inputFunc("count_messages", "number")}
                          times from in time period from ${inputFunc("date_start", "date")}
                     to ${inputFunc("date_end", "date")}`}
                            onClick={ e => this.onClick(e, `customers-of-diff-messages`,
                                `/`, "POST") }/>
                <OrderBlock text={`I want to find the number of orders monthly`}
                            onClick={ e => this.onClick(e, `monthly`,
                                `/`, "GET") }/>


                <div className={ "order-block" }>
                    <button onClick={ this.commonEvent }>OK</button>
                    I want to find all common event for author
                    {/*{inputFunc("count_customers", "number")}different users from in time period from*/}
                    {/*{inputFunc("date_start", "date")}to*/}
                    {/*{inputFunc("date_end", "date")}*/}
                    <select>
                        {
                            this.state.users.filter(e => e.role == AUTHOR).map(user => (
                                <option value={user.id}>{user.username}</option>
                            ))
                        }
                    </select>
                    and customer
                    <select>
                        {
                            this.state.users.filter(e => e.role == CUSTOMER).map(user => (
                                <option value={user.id}>{user.username}</option>
                            ))
                        }
                    </select>
                    in time period from
                    <input type="date" name="date_start"/>
                    to <input type="date" name="date_end"/>
                </div>
                <div className={ "order-block" }>
                    <button onClick={ this.authorEvent }>OK</button>
                    Find how many times the author
                    <select>
                        {
                            this.state.users.filter(e => e.role == AUTHOR).map(user => (
                                <option value={user.id}>{user.username}</option>
                            ))
                        }
                    </select>
                    has written in group in all social networks
                    in time period from
                    <input type="date" name="date_start"/>

                    to <input type="date" name="date_end"/> <input type="number" name="count_authors"/>
                </div>



            </div>
        );
    }
}