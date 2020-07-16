import React from 'react';
import Axios from "axios";
import '../Styles/register.css';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.setState({
            firstName: null,
            lastName: null,
            email: null,
            username: null,
            password: null,
            resp: null
        })
    }

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value,
        })
    }
    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value,
        })
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        })
    }
    handleUserNameChange = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    thisRegister = (e) => {
        e.preventDefault();
        const url = "/register"
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        }
        Axios.post(url, data)
            .then((res) => {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email:'',
                    username: '',
                    password: '',
                    resp: "user registered."
                });
                alert("Registration succesfull!")
                this.props.history.push("/");
            })
            .catch((err) => {
                this.setState({
                    resp: "Error: User name already in use"
                });
            });
    }

    render() {
        return (
            <div className={"registerForm"}>
                <input type="text" placeholder={"First Name"} value={this.state.firstName} required onChange={this.handleFirstNameChange}/><br/>
                <input type="text" placeholder={"Last Name"} value={this.state.lastName} required onChange={this.handleLastNameChange}/><br/>
                <input type="text" placeholder={"Email"} value={this.state.email} required onChange={this.handleEmailChange}/><br/>
                <input type="text" placeholder={"Username"} value={this.state.username} required onChange={this.handleUserNameChange}/><br/>
                <input type="password" placeholder={"Password A-Z,a-z,0-9"} value={this.state.password} onChange={this.handlePasswordChange}/><br/>
                <button onClick={this.thisRegister}>Register</button>
                <div className={"registerResponse"} >
                    {this.state.resp ? this.state.resp : null}
                </div>
            </div>
        )
    }
}

export default Register;