import React, {Component} from "react";
import "./style.css";

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {nameInput, typeInput, placeholderInput, valueInput, onChangeInput} = this.props
        return ( 
            <input 
                className = "masukkan" 
                name = {nameInput} 
                placeholder = {placeholderInput} 
                type = {typeInput}
                onChange = {onChangeInput}
                value = {valueInput}
                required 
            />
        );
    }
}
 
export default Input;