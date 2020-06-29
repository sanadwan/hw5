import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import '../Styles/login.css';


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            resp: null,
        }
    }


    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    thisLogin = (e) => {
        const url = "/login";
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        Axios.post(url, data)
            .then((res) => {
                this.setState({
                    username: '',
                    password: '',
                    resp: "Success: user logged in.",
                });
                this.props.LoginSuccess()
                this.props.set_Name_Id(res.data)


            })
            .catch((err) => {
                this.setState({
                    resp: "Error: failed to login user."
                });
            });
    }

    render() {
        return (
            <div>
                <br/><br/><br/>
                <div className={"loginForm"} align="center">
                    <input type="text" placeholder={"Username"} value={this.state.username} required onChange={this.handleUsernameChange}/><br/>
                    <input type="password" placeholder={"Password"} value={this.state.password} required onChange={this.handlePasswordChange}/><br/>
                    <button onClick={this.thisLogin}>Login</button><br/><br/>
                    <Link to="/register">I don't have an account</Link>
                </div>
                <div className={"loginResponse"}>
                    {this.state.resp ? this.state.resp : null}
                </div>
            </div>
        );
    }

}

export default Login;