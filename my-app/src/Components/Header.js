import React from 'react';
import "../Styles/header.css";
import {Link} from 'react-router-dom'
import Axios from "axios";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            isLoggedIn: this.props.isLoggedIn,
            firstName: this.props.firstName,
            user_id: this.props.user_id,
            onLogout: this.props.onLogout
        })
    }

    

    thisLogout = () => {
        const url = "/logout";
        const user_id = {user_id: this.props.user_id}
        Axios.post(url, user_id)
            .then((res) => {
                this.props.onLogout()
            })
            .catch((err) => {
                console.log("error", err)
            });
    }

    render() {
        return (
            <header>
                <div className="nav-bar">
                    <div>
                        <Link to="/">Home</Link>
                        <span className="vertical-line"> | </span>
                        <Link to="/about">About</Link>
                        <span className="vertical-line"> | </span>
                        <Link to="/aboutme">About Me</Link>
                        <span className="vertical-line"> | </span>
                        <Link to="/newpost">New Post</Link>
                    </div>
                    <div className="right-positioned">
                        {this.props.isLoggedIn?
                            "Hello " + this.props.firstName
                            :
                            <div>
                                <Link to="/login">Login</Link>
                                <span> | </span>
                                <Link to="/register">Register</Link>
                            </div>}
                        {this.props.isLoggedIn? <button onClick={this.thisLogout}>Logout</button> : null}
                    </div>
                </div>
            </header>
        );
    }

}

export default Header;