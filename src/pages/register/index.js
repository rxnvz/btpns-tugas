import React, { Component } from 'react';
import { RowInput, Button } from '../../components'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            username: "",
            password: "",
            passval: ""
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
            this.props.tambahUser({ name, email, username, password })
        }
    }

    render() { 
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
 
export default Register;