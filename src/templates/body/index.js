import React, {Component} from "react";
import "./style.css";
import { Switch, Route } from "react-router-dom"
import {About, Login, Register} from "../../pages"
import { connect } from "react-redux";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            admin: [{
                name: "admin",
                role: "adm",
                email: "adm@adm.com",
                username: "admin",
                password: "123"
            }]
        }
    }

    // componentDidMount = () => {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(data => {
    //             const dataUser = data.map(user =>({
    //                 ...user,
    //                 password: "pass",
    //                 role: "user",
    //             }));

    //             this.props.doFetch({ 
    //                 userData: [...this.state.admin, ...dataUser]
    //             })
    //         })
    // }

    componentDidMount = () => {
        fetch('http://localhost:3001/data')
       .then(response => response.json())
       .then(data => {
           const dataUser = data.map(user => ({
               ...user,
               role: "user"
           }))
        
           this.props.doFetch({
               userData: [...this.state.admin, ...dataUser]
           })
        })    
    }

    showPage = () => {
        return (
            <Switch>
            <Route path="/about"  children={(props) => <About {...props} />} />
                <Route path="/login">
                    <Login />
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


const mapDispatchToProps = (dispatch) => ({
    doFetch: (userList) => dispatch({ type: "FETCH", payload: userList })
})
 
export default connect(null, mapDispatchToProps)(Body);
