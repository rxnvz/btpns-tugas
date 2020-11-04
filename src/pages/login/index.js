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

    userLogin = (dataLogin) => {
        fetch("http://localhost:3001/auth/login", {
            mode: 'cors',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataLogin)
        })
            .then(response => response.json())
            .then(result => {
                alert(result.message)
                const dataUser = result.data[0].dataUser
                const token = result.data[0].token
                this.props.doLogin({dataUser,token})
            })
            .catch(error => console.log('error: ', error));
    }

    onLogin = () => {
        const { username, password } = this.state

        if (username && password) {
            this.userLogin({username, password})
        } else {
            alert("Username dan password tidak boleh kosong!")
        }

    }

    render() { 
        if (this.props.exist){
            return <Redirect to="/register" />
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