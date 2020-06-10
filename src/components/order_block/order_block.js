import React from "react";

import './order_block.css';

import Parser from 'html-react-parser';

export default class OrderBlock extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={ "order-block" }>
                <button onClick={ this.props.onClick }>OK</button>
                {Parser( this.props.text )}

            </div>
        )
    }
}