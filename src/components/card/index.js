import React, {Component} from "react";
import "./style.css"
import ppl from "../../imgs/profile.png"

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="kartu">
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src={ppl} alt="Avatar" className="theCard"></img>
                        </div>
                        <div className="flip-card-back">
                            <h1 className="namanya">{this.props.children}</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Card;