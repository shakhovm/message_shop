import React from 'react';

import './response.css';

export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

    }

    componentDidMount() {
        const { data } = this.props.location.state;
        console.log(data);
        let x = [];
        try {
            for (let i of data) {
                for (let value in i) {
                    x.push([value, i[value]])
                }
            }
        } catch (e) {
            for (let value in data) {
                x.push([value, data[value]])
            }
        }

        this.setState({data: x})

    }


    render() {

        return (
            <div className={"response-block"}>
                {this.state.data.map(e => (<div className={"xx"}>{e[0]}: {e[1]}</div>))}
                {/*{ JSON.stringify(data) }*/}
            </div>
        );
    }
}