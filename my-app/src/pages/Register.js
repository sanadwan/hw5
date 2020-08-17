import React from 'react';
import Axios from "axios";
import '../Styles/register.css';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            resp: ''
        }
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
                if(res.data !== '') {
                    this.setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        username: '',
                        password: '',
                        resp: "user registered."
                    });
                    alert("Registration successfully!")
                } else {
                    alert("Error: Can not add new post")
                }
                this.props.history.push("/");
            })
            .catch((err) => {
                this.setState({
                    resp: "Error: User name already in use", err
                });
            });
    }

    render() {
        return (
            <form className={"registerForm"} onSubmit={this.thisRegister}>
                <input type="text" placeholder={"First Name"} value={this.state.firstName} required onChange={this.handleFirstNameChange}/><br/>
                <input type="text" placeholder={"Last Name"} value={this.state.lastName} required onChange={this.handleLastNameChange}/><br/>
                <input type="text" placeholder={"Email"} value={this.state.email} required onChange={this.handleEmailChange}/><br/>
                <input type="text" placeholder={"Username"} value={this.state.username} required onChange={this.handleUserNameChange}/><br/>
                <input type="password" placeholder={"Password A-Z,a-z,0-9"} value={this.state.password} onChange={this.handlePasswordChange}/><br/>
                <input type={"submit"} defaultValue="Register" />
                <div className={"registerResponse"} >
                    {this.state.resp ? this.state.resp : null}
                </div>
            </form>
        )
    }
}

export default Register;