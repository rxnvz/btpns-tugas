import React, { Component } from "react"
import { Menu } from "../../components"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import "./style.css"
import logo from "../../imgs/logo.png"

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // shouldComponentUpdate(lastProp, nextProp) {
    //     // console.log("props: ", this.props);
    //     // console.log("lastProp: ", lastProp);
    //     if (lastProp.statusLogin !== this.props.statusLogin)
    //         return true
    //     return false
    // }

    render() { 
        return ( 
            <div className="nav-container">
                <img className="logonya" src={logo} alt="logoku"></img><div className="title">HijabIrine</div>

                    <Link to="/about">
                        <Menu goToPage={() => this.props.changePage("about")}>Tentang Kami</Menu>
                    </Link>
                    <Link to="/register">
                        <Menu goToPage={() => this.props.changePage("register")}>Tambah Pengguna</Menu>
                    </Link>
                
                {/* checking is login true  */}
                { this.props.statusLogin ? //Ini kalo login as admin
                        <>
                            <Menu goToPage={this.props.doLogout}>Keluar</Menu>
                        </>
                    : //Ini kalo ngga login
                        <>
                            <Link to="/login">
                                <Menu goToPage={() => this.props.changePage("login")}>Masuk</Menu>
                            </Link>
                        </>
                }
            </div>
         );
    }
}

const mapStateToProps = (state) => ({
    statusLogin: state.auth.isLoggedIn,
    userList: state.auth.userData,
    them: state.auth.users
})

const mapDispatchToProps = (dispatch) => ({
    doLogout: () => dispatch({ type: "LOGOUT" })
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Nav)