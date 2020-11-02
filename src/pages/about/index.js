import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { EditUser } from "../../components";
import { Redirect } from "react-router-dom"

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onDelete = (idx) => {
        this.props.deleteUser(idx)
    }

    render() { 
        const user = this.props.dataUser
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
                        {user.map((user, idx) => {
                            return <tr key={idx}>
                                <td> {idx + 1} </td>
                                <td> {user.name} </td>
                                <td> {user.email} </td>
                                <td> {user.username}</td>
                                <td> {hi.role === "adm" ? //kalo role-nya admin
                                    <>
                                        <button>Lihat</button>
                                        <button>Edit</button>
                                        <button onClick={() => {this.onDelete(idx)}}>Hapus</button>
                                    </>
                                : 
                                    <>
                                    {hi.username === user.username ? //kalo akun dia sendiri
                                        <>
                                            <button>Lihat</button>       
                                            <button>Edit</button>
                                        </>
                                    : //lainnya (yang bukan akunnya dia)
                                        <>
                                            <button>Lihat</button>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(About)