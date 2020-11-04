import React, {Component} from "react";
import "./style.css";
import { Switch, Route } from "react-router-dom"
import { About, Login, Register } from "../../pages"
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
    //     fetch('http://localhost:3001/users/all')
    //    .then(response => response.json())
    //    .then(data => {
    //        const dataUser = data.map(user => ({
    //            ...user
    //        }))
        
    //        this.props.doFetch({
    //            userData: [ ...dataUser]
    //        })
    //     })    
    // }

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
