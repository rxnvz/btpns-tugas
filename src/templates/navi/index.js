import React, {Component} from "react"
import {Menu} from "../../components"
import { Link } from "react-router-dom"
import "./style.css"
import logo from "../../imgs/logo.png"

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shouldComponentUpdate(lastProp, nextProp) {
        // console.log("props: ", this.props);
        // console.log("lastProp: ", lastProp);
        if (lastProp.statusLogin !== this.props.statusLogin)
            return true
        return false
    }

    render() { 
        return ( 
            <div className="nav-container">
                <img className="logonya" src={logo} alt="logoku"></img><div className="title">HijabIrine</div>

                    <Link to="/about">
                        <Menu goToPage={() => this.props.changePage("about")}>Tentang Kami</Menu>
                    </Link>
                {/* checking is login true */}
                { this.props.statusLogin ?
                    <>
                        <Link to="/register">
                            <Menu goToPage={() => this.props.changePage("register")}>Tambah Pengguna</Menu>
                        </Link>
                        <Menu goToPage={this.props.changeLogIn}>Keluar</Menu>
                    </>
                    :
                    <>
                        <Link to="/login">
                            <Menu goToPage={() => this.props.changePage("login")}>Masuk</Menu>
                        </Link>
                        {/* <Link to="/register">
                            <Menu goToPage={() => this.props.changePage("register")}>Tambah Pengguna</Menu>
                        </Link> */}
                    </>
                }
                
                {/* checking is login true 
                { this.props.statusLogin && username === "admin" ? //Ini kalo login as admin
                    <>
                        <Link to="/about">
                            <Menu goToPage={() => this.props.changePage("about")}>Tentang Kami</Menu>
                        </Link>
                        <Link to="/register">
                            <Menu goToPage={() => this.props.changePage("register")}>Tambah Pengguna</Menu>
                        </Link>
                        <Menu goToPage={this.props.changeLogIn}>Keluar</Menu>
                    </>
                    : this.props.statusLogin ? //Ini kalo login as user
                    <>
                        <Link to="/about">
                            <Menu goToPage={() => this.props.changePage("about")}>Tentang Kami</Menu>
                        </Link>
                        <Menu goToPage={this.props.changeLogIn}>Keluar</Menu>
                    </>
                    : //Ini kalo ngga login
                    <>
                        <Link to="/login">
                            <Menu goToPage={() => this.props.changePage("login")}>Masuk</Menu>
                        </Link>
                    </>
                } */}
            </div>
         );
    }
}
 
export default Nav;