import React, {Component} from "react";
import "./style.css";
import { Switch, Route } from "react-router-dom"
import {About, Login, Register} from "../../pages"

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        }
    }

    componentDidMount = async () => {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => this.setState({ userData: data }))
            .catch(err => console.warn("err ", err))
    }

    showPage = () => {
        const { changeLogIn, statusLogin } = this.props

        return (
            <Switch>
            <Route path="/about"  children={(props) => <About {...props} statusLogin={statusLogin} listUsers={this.state.userData} />} />
                <Route path="/login">
                    <Login changeLogIn={changeLogIn} listUsers={this.state.userData} statusLogin={statusLogin} />
                </Route>
                <Route path="/register">
                    <Register listUsers={this.state.userData} tambahUser={this.addUsers} />
                </Route>
            </Switch>
        )
    }

    addUsers = obj => { //From register
        const { name, email, username, password } = obj
        const userData = [...this.state.userData]
        userData.push({
            'name': name,
            'email': email,
            'username': username,
            'password': password
        })
        this.setState({ userData })
        alert("Data berhasil diinput.")
        console.log(this.state.userData);
    }

    render() { 
        return (
            <>
                {
                    this.showPage()
                }
            </>
        );
    }
}
 
export default Body;
