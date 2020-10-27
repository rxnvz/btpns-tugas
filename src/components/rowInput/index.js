import React, { Component } from 'react'
import {Input} from "../index"

class RowInput extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {label, type, name, placeholder, value, onChange} = this.props
        return (
            <div>
                <label><b>{label}</b></label> <br></br>
                <Input 
                    nameInput = {name} 
                    placeholderInput = {placeholder} 
                    typeInput = {type}
                    onChangeInput = {onChange}
                    valueInput = {value}
                />
            </div>
        );
    }
}
 
export default RowInput;