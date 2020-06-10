import React from 'react';
import OrderBlock from "../order_block";
import {AUTHOR, CUSTOMER, DJANGO_URL} from "../../consts/consts";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {addGroup, addUserToGroup, giveAccess} from "../../actions/events";
import {
    AddGroup,
    addToGroup,
    denyAccess,
    giveAuthorAccess,
    groupEditor,
    holdSales,
    orderMessage
} from "../../actions/queries";

import './order.css';

const inputFunc = (name, type) => `<input name=${name} type=${type} />`;

const STYLES = [
    [1, 'Assertive'],
    [2, 'Passive-aggressive'],
    [3, 'Aggressive'],
    [4, 'Submissive'],
    [5, 'Manipulative'],
    [6, 'Romantic'],
];

const NETWORKS = [
    [3, 'Telegram'],
    [1, 'Instagram'],
    [2, 'Facebook']
];



class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorGroups: [],
            authors: [],
            role: 0
        };

        this.onClick = this.onClick.bind(this);
        this.giveAccess = this.giveAccess.bind(this);
        this.addUserToGroup = this.addUserToGroup.bind(this);
        this.startSale = this.startSale.bind(this);
        this.orderMessage = this.orderMessage.bind(this);
        this.denyAccess = this.denyAccess.bind(this);
    }

    componentDidMount() {

        let role = localStorage.getItem("role");
        fetch(DJANGO_URL + '/authors/')
            .then(resp => resp.json()).then(body => {
            console.log(body);
            this.setState({authors: body});
        });
        fetch(DJANGO_URL + `/author-groups/${localStorage.getItem("userId")}/`)
            .then(resp => {
                console.log(resp);
                return resp.json()
            }).then(body => {
            console.log(body);
            this.setState({authorGroups: body});});
        if (role === CUSTOMER) {
            this.setState({role: CUSTOMER})

        } else if (role === AUTHOR) {
            this.setState({role: AUTHOR});


        }
    }

    startSale(e, sale) {
        let groupId = e.target.parentElement.getElementsByTagName("select")[0].value;

        this.props.holdSales(sale, groupId)
        // console.log(groupId);
        // console.log(new Date());
        // fetch(DJANGO_URL + `/groups-editor/${groupId}/`)
        //     .then(resp => resp.json())
        //     .then(body => {
        //         console.log(body);
        //         let data = {
        //             sale: parseInt(sale),
        //             sale_started: new Date()
        //         };
        //         console.log(data);
        //         fetch(DJANGO_URL + `/editors-add-sale/${body[0].id}/`, {
        //             method: 'PUT',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(data)
        //         }).then(resp => {
        //             console.log(resp);})
        //     }).catch(e => {console.log(e)});


    }

    onClick(e) {
        let name = e.target.parentElement.getElementsByTagName("input")[0].value;
        this.props.AddGroup(name);
        // console.log(data);
        // this.props.addGroup(data).then(resp => {
        //     console.log(resp);});

    }

    giveAccess(e) {
        let select = e.target.parentElement.getElementsByTagName('select');
        let groupId = select[1].value;
        let userId = localStorage.getItem("userId");
        this.props.giveAuthorAccess(groupId, userId, select[0].value, this.props.groupEditor)
        // fetch(DJANGO_URL + `/groups-editor/${groupId}/`)
        //     .then(resp => resp.json())
        //     .then(body => {
        //         let data = {
        //             customer: localStorage.getItem("userId"),
        //             date_start: new Date(),
        //             date_end: "",
        //             editor: body[0].id,
        //             social_name: select[0].value
        //         };
        //         this.props.giveAcess(data);
        //     }).catch(e => {
        //    console.log(e);
        // });
    }

    denyAccess(e) {
        let select = e.target.parentElement.getElementsByTagName('select');
        let groupId = select[1].value;
        this.props.denyAccess(localStorage.getItem("userId"), groupId, this.props.groupEditor);
        // fetch(DJANGO_URL +
        //     `/user-author-access/${localStorage.getItem("userId")}/${editor}/`)
        //     .then(resp => resp.json())
        //     .then(body => {
        //         fetch()
        //     });
        // let body = {
        //     customer: parseInt(localStorage.getItem("userId")),
        //     date_start: new Date(),
        //     date_end: "",
        //     editor: 1,
        //     social_name: parseInt(select[0].value)
        // };
        // this.props.giveAcess(body);
    }

    addUserToGroup(e) {
        let nodes = e.target.parentElement.getElementsByTagName("select");
        let names = nodes[0].value.split(" ");

        this.props.addToGroup(nodes[1].value, names[0], names[1]);
        // this.addToGroup(nodes);
    }

    // addToGroup(value) {
    //     let data = {
    //         participants:
    //             [
    //                 {
    //                     id: value[0].value,
    //                     username: value[0].name
    //                 }]
    //     };
    //
    //     this.props.addUserToGroup(data, value[1].value).then(resp => {
    //         console.log(resp);});
    // }

    orderMessage(e) {
        let nodes = e.target.parentElement;
        let selects = nodes.getElementsByTagName("select");
        this.props.orderMessage(localStorage.getItem("userId"), selects[1].value,
            nodes.getElementsByTagName("input")[0].value, selects[2].value, selects[0].value,
            this.props.groupEditor)
        // let data = {
        //     style: selects[0].value,
        //     date: new Date(),
        //     text: nodes.getElementsByTagName("input")[0].value,
        // };
        // fetch(DJANGO_URL + `/groups-editor/${selects[1].value}/`)
        //     .then(resp => resp.json())
        //     .then(body => {
        //         fetch(DJANGO_URL + `/user-author-acсess/${localStorage.getItem("userId")}/${body[0].id}/`)
        //             .then(resp => resp.json())
        //             .then(body => {
        //                 data.access = body[0].id;
        //                 fetch(DJANGO_URL + '/system_messages/', {
        //                     method: 'POST',
        //                     body: JSON.stringify(data)
        //                 });
        //             })
        //     }).catch(e => {console.log(e)});


    }

    render() {
        if (!localStorage.getItem("userId")) {
            return <Redirect to={"/login"}/>;
        }
        if (this.state.role === CUSTOMER) {
            return (
                <div className={"orders"}>

                    <div className={ "order-block" }>
                        <button onClick={ this.giveAccess }>OK</button>
                        I want to give access to my social network
                        <select>
                            {
                                NETWORKS.map(network => (
                                    <option value={network[0]}>{network[1]}</option>
                                ))
                            }
                        </select>
                        to editor
                        <select>
                            {this.state.authorGroups.map(e => (<option value={e.id}>{e.name}</option>))}
                        </select>
                    </div>

                    <div className={ "order-block" }>
                        <button onClick={ this.denyAccess }>OK</button>
                        I want to deny access to my social network
                        <select>
                            {
                                NETWORKS.map(network => (
                                    <option value={network[0]}>{network[1]}</option>
                                ))
                            }
                        </select>
                        to author
                        <select>
                            {this.state.authorGroups.map(e => (<option value={e.id}>{e.name}</option>))}
                        </select>
                    </div>

                    <div className={ "order-block" }>
                        <button onClick={ this.orderMessage }>OK</button>
                        I want to order message <input type="text"/> in
                        <select>
                            <option value="1">Telegram</option>
                            <option value="2">Facebook</option>
                            <option value="3">Instagram</option>
                        </select>
                        in author
                        <select>
                            {this.state.authorGroups.map(e => (<option value={e.id}>{e.name}</option>))}
                        </select>
                        in style
                        <select>
                            {STYLES.map(s => (
                                <option value={s[0]}>{s[1]}</option>
                            ))}
                        </select>


                    </div>
                </div>
            )
        } else if (this.state.role === AUTHOR) {
            return (
                <div className={"orders"}>
                    <h1>My Events</h1>
                    {/*{*/}
                    {/*    this.state.queries.map(text => (*/}
                    {/*        <OrderBlock text={ text }>*/}

                    {/*        </OrderBlock>*/}
                    {/*    ))*/}
                    {/*}*/}
                    <OrderBlock text={`I want to add group with name ${inputFunc("name", "text")}`}
                                onClick={e => this.onClick(e)}
                    />
                    <div className={ "order-block" }>
                        <button onClick={ this.addUserToGroup }>OK</button>
                        I want to add participant
                        <select>
                            {this.state.authors.map(e => (<option value={e.id + " " + e.username}>{e.username}</option>))}
                        </select>
                        to group with name
                        <select>
                            {this.state.authorGroups.map(e => (<option value={e.id}>{e.name}</option>))}
                        </select>
                    </div>
                    <div className={ "order-block" }>
                        <button onClick={ e => this.startSale(e, 2) }>OK</button>
                        I want hold 1 day sale in group
                        <select>
                            {this.state.authorGroups.map(e => (<option value={e.id} name={e.name}>{e.name}</option>))}
                        </select>

                    </div>
                    <div className={ "order-block" }>
                        <button onClick={ e => this.startSale(e, 1) }>OK</button>
                        I want hold 1 week sale in group
                        <select>
                            {this.state.authorGroups.map(e => (<option value={e.id} name={e.name}>{e.name}</option>))}
                        </select>

                    </div>
                </div>
            )
        }
        return (
            <div></div>
        );
    }
}

export default connect(null, { giveAccess, AddGroup, addUserToGroup, addToGroup, holdSales,
                            giveAuthorAccess, groupEditor, denyAccess, orderMessage})(Order);