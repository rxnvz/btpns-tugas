import React, { Component } from 'react';
import { RowInput, Button } from '../../components';
import { Redirect } from "react-router-dom"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    onChangeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogin = async () => {
        const { username, password } = this.state

        const exist = this.props.listUsers.find(user => user.username === username)
        if (exist) {
            alert(`Selamat Datang ${username}!!`)
            this.props.changeLogIn() 
        } else if(username === 'admin' && password === "123") {
            alert(`Selamat Datang ${username}!!`)
            // const roles = "ADMIN";
            this.props.changeLogIn()    
        } else alert("Akun tidak ditemukan :(")

    }

    render() { 
        if (this.props.statusLogin){
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
 
export default Login;