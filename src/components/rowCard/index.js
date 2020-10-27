import React, { Component } from 'react';
import "./style.css";
import { Card } from "../index";

class RowCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="row">
                <div className="column">
                    <Card>{this.props.children}</Card>
                </div>
            </div>
        );
    }
}
 
export default RowCard;