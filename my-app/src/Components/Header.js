import React from 'react';
import "../Styles/header.css";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header>
            <div className="nav-bar">
                <div>
                    <Link to="/">Home</Link>
                    <span className="vertical-line"> | </span>
                    <Link to="/About">About</Link>
                    <span className="vertical-line"> | </span>
                    <Link to="/AboutMe">About Me</Link>
                    <span className="vertical-line"> | </span>
                    <Link to="/newPost">New Post</Link>
                </div>
                <Link to="/Login" className="right-positioned">Login</Link>
            </div>
        </header>
    );
}

export default Header;