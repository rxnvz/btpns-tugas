import React, { Component } from 'react';
import { RowInput, Button } from '../../components';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onChangeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogin = () => {
        const { username, password } = this.state

        if (username && password) {
            let exist = this.props.userList.find(user => user.username === username && user.password === password)
            if (exist) {
                alert(`Selamat Datang ${username}`)
                let role = exist.role
                this.props.doLogin({username,password,role},this.props.userList)
            } else {
                alert("Kombinasi tidak sesuai atau data tidak ditemukan!")
            }
        } else {
            alert("Username dan password tidak boleh kosong!")
        }

    }

    render() { 
        if (this.props.exist){
            return <Redirect to="/about" />
        }

        return (
            <div className="login">
                <form className="login-form" method="POST">
                    <div className="container-log">
                        <h1 className="judul">Login</h1>
                        <RowInput value={this.state.username} label="Username" placeholder="Username" type="text" name="username" onChange={this.onChangeInput}/>
                        <RowInput value={this.state.password} label="Password" placeholder="Password" type="password" name="password" onChange={this.onChangeInput}/>
                        <Button onClickInput={this.onLogin}>Masuk</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    exist: state.auth.isLoggedIn,
    userList: state.auth.userData
})

const mapDispatchToProps = (dispatch) => ({
    doLogin: (users, userList) => dispatch({ type: "LOGIN", payload: { users, userList } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)