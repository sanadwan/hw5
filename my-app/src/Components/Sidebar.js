import React from 'react';
import {Link} from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="side-bar">
            <label className="title"><h1>Latest</h1></label>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #1 </span><Link to={'/post/1'}>here</Link>
                </li>
                <li>
                    <span>Blog post #2 </span><Link to={'/post/2'}>here</Link>
                </li>
                <li>
                    <span>Blog post #3 </span><Link to={'/post/3'}>here</Link>
                </li>
            </ul>
            <hr/>
            <label className="title"><h1>Popular</h1></label>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #1 </span><Link to={'/post/1'}>here</Link>
                </li>
                <li>
                    <span>Blog post #2 </span><Link to={'/post/2'}>here</Link>
                </li>
                <li>
                    <span>Blog post #3 </span><Link to={'/post/3'}>here</Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;