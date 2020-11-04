import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { EditUser } from "../../components";
import { Redirect } from "react-router-dom"
import jwt from 'jwt-decode'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        fetch("localhost:3001/users/all", {
            mode: 'cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+this.props.users.token
            }
        })
            .then(response => response.json())
            .then(result => {
                const token = result.data[0].token
                this.props.SaveToken(token)
                
            })
            .catch(error => console.log('error', error));
    }

    // onDelete = async(username) => {
    //     // this.props.deleteUser(idx)
    //     await fetch("http://localhost:3001/del/"+username, {
    //         mode: "cors",
    //         method: "DELETE",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization' : 'Bearer '+this.props.dataLogin.token
    //         },
    //         body: JSON.stringify(username)
    //     })
    //     .then(response => response.json())
    //     .then(res => {
    //         this.componentDidMount()
    //         alert(res.message)
    //     })
    //     .catch(err => console.log("err: ", err))
    // }

    render() { 
        const user = jwt(this.props.dataUser)
        const hi = this.props.them

        if (!this.props.statusLogin)
            return <Redirect to="/login" />

        return (
            <div className="about">
                <h1 className="judul">SIAPA KAMI?</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th style={{width : "20px"}} scope="col">No</th>
                        <th>Nama</th>
                        <th>E-mail</th>
                        <th>Username</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                        {user.user.map((user, idx) => {
                            return <tr key={idx}>
                                <td> {idx + 1} </td>
                                <td> {user.name} </td>
                                <td> {user.email} </td>
                                <td> {user.username}</td>
                                <td> {hi.role === "adm" ? //kalo role-nya admin
                                    <>
                                        <button>Edit</button>
                                        <button onClick={() => {this.onDelete(idx)}}>Hapus</button>
                                    </>
                                : 
                                    <>
                                    {hi.username === user.username ? //kalo akun dia sendiri
                                        <>     
                                            <button>Edit</button>
                                        </>
                                    : //lainnya (yang bukan akunnya dia)
                                        <>
                                        </>
                                    }
                                    </>

                                } 

                                </td>
                            </tr>        
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    statusLogin: state.auth.isLoggedIn,
    dataUser: state.auth.userData,
    them: state.auth.users
})

const mapDispatchToProps = (dispatch) => ({
    deleteUser: (index) => dispatch({ type: "DELETEUSER", payload: index}),
    SaveToken: (userList) => dispatch({ type: "TOKEN", payload: userList })
})

export default connect(mapStateToProps, mapDispatchToProps)(About)