import React, {Component} from "react";
import {Menu} from "../../components"
import "./style.css";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="kaki">
                <footer className="anak-kaki">
                    <Menu>Tentang Kami</Menu>
                    <Menu>Kontak</Menu>
                </footer>
            </div>
        );
    }
}
 
export default Footer;