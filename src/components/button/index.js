import React, {Component} from "react"
import "./style.css"

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {onClickInput, onChangeInputs} = this.props
        return ( 
            <div className="btn">
                <button
                    type="button"
                    className="tombol"
                    onClick={onClickInput}
                    onChange={onChangeInputs}>{this.props.children}</button>
            </div>
        );
    }
}
 
export default Button;