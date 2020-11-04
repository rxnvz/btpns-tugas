import React, { Component } from 'react';
import {Modal,Button, FormControl, FormLabel} from 'react-bootstrap'
import { connect } from "react-redux"

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setShow: false,
            show: false
        }
    }

    componentDidMount = () => {
        this.setState({
            username : this.props.user.username,
            email : this.props.user.email,
            name : this.props.user.name,
            password : this.props.user.password,
        })
    }

    onChangeInput = e => {
        this.setState({        
            [e.target.name]:e.target.value
        })
    }

    handleClose = () => {
        this.setState({
            setShow : false,
            show : false
        })
    }

    handleShow = () => {
        this.setState({
            setShow : true,
            show : true
        })
    }  

    handleEdit = () =>{
        const { name, email, username, password, passval } = this.state

        if (password === passval) {
            alert("Data berhasil diedit.")
            this.props.updateUser({name, email, username, password})
            this.handleClose()
        } else {
            alert("Password yang dimasukkan tidak sama!")
        }

    }

    render() { 
        const user = this.props.userData
        const idx = this.props.idxUser
        return(
            <>
            <button variant="primary" onClick={this.handleShow}>
                Edit
            </button>
            <br/>
            <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Produk</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormLabel>Username</FormLabel>
                        <FormControl onChange={this.onChangeInput} name="username" type="text" value={user[idx].username} disabled></FormControl>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl onChange={this.onChangeInput} name="name" type="text" defaultValue={user[idx].name} ></FormControl>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl onChange={this.onChangeInput} name="email" type="text" defaultValue={user[idx].email} ></FormControl>
                        <FormLabel>Password</FormLabel>
                        <FormControl onChange={this.onChangeInput} name="password" type="text" defaultValue={user[idx].password} ></FormControl>
                        <FormLabel>Ulangi Password</FormLabel>
                        <FormControl onChange={this.onChangeInput} name="passval" type="text" defaultValue={user[idx].passval} ></FormControl>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleEdit}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>        
                </Modal.Footer>
            </Modal>
        </>
        )
    }
}

const mapStateToProps = (state) => ({
    statusLogin: state.auth.isLoggedIn,
    userList: state.auth.userData
})

const mapDispatchToProps = (dispatch) => ({
    updateUser: (dataUpdate, index) => dispatch({ type: "EDITUSER", payload: {dataUpdate, index}}),
})
 
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);