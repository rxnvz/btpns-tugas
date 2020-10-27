import React, { Component } from 'react';
// import {RowCard} from "../../components";
import { Redirect } from "react-router-dom"

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        if (!this.props.statusLogin)
            return <Redirect to="/login" />

        return (
            <div className="about">
                <h1 className="judul">SIAPA KAMI?</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th style={{width : "20px"}} scope="col">No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                        {
                            this.props.listUsers.map((user, idx) => {
                                return <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>Lihat || Ubah || Hapus</td>
                                </tr>
                                    
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default About;