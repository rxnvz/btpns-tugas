import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RowInput, Button } from '../../components'
import { Redirect } from "react-router-dom"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            username: "",
            password: "",
            passval: "",
        }
    }

    onChangeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onRegis = async () => {
        const { name, email, username, password, passval } = this.state

        if (name==="" || email==="" || username==="" || password==="") { //biar kalo kosong, gabisa daftar
            alert("Periksa kelengkapan data dan kesamaan password anda!")
        } else if(password !== passval){ //biar kalo password sama password repeat-nya beda, gabisa daftar
            alert("Periksa kembali password anda!")
        } else {
            this.props.addUser({ name, email, username, password })
            alert("Data berhasil dimasukkan.")
        }
    }

    render() {
        if (!this.props.statusLogin)
            return <Redirect to="/login" />

        return (
            <div className="regis">
                <form className="regis-form" method="POST" name="regist">
                    <div className="container-log">
                        <h1 className="judul">Registrasi</h1>
                        <RowInput value={this.state.name} label="Nama Lengkap" placeholder="Nama Lengkap" type="text" name="name" onChange={this.onChangeInput}/>
                        <RowInput value={this.state.email} label="E-mail" placeholder="E-mail" type="text" name="email" onChange={this.onChangeInput}/>
                        <RowInput value={this.state.username} label="Username" placeholder="Username" type="text" name="username" onChange={this.onChangeInput}/>
                        <RowInput value={this.state.password} label="Password" placeholder="Password" type="password" name="password" onChange={this.onChangeInput}/>
                        <RowInput value={this.state.passval} label="Ulangi Password" placeholder="Ulangi Password" type="password" name="passval" onChange={this.onChangeInput}/>
                        <Button onClickInput={this.onRegis}>Daftar</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    statusLogin: state.auth.isLoggedIn,
    userList: state.auth.userData
})

const mapDispatchToProps = (dispatch) => ({
    addUser: (dataRegis) => dispatch({ type: "REGISTER", payload: {dataRegis}}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)