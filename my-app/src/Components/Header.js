import React from 'react';
import "../Styles/header.css";
import {Link} from 'react-router-dom'
import Axios from "axios";

class Header extends React.Component {

    thisLogout = () => {
        const url = "/logout";
        const user_id = {user_id: this.props.user_id}
        Axios.post(url, user_id)
            .then((res) => {
                this.props.onLogout()
            })
            .catch((err) => {
                console.log("error")
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
                        {this.props.LoggedIn?
                            "Hello " + this.props.first_name
                            :
                            <Link to="/login">Login</Link>}
                        {this.props.LoggedIn? <button onClick={this.thisLogout}>Logout</button> : null}
                    </div>
                </div>
            </header>
        );
    }

}

export default Header;