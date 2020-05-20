import React from 'react';
import "../Styles/post.css";
import {Link} from "react-router-dom";
import posts from '../postList';



function Post(props) {
    return (
        <div className="post-container">
            <div className="post">
                <label className="post-title">
                    <Link to={`/post/${props.postId}`}>
                        {props.title}
                    </Link>
                </label>
                <p className="post-content">
                    {props.content}
                </p>
                <img alt="" width="100" height="90" className="post-image" src={props.image}/>
                <label className="post-footer">
                    Published {props.published} by {props.author}
                </label>
            </div>
        </div>
    );
}
function Posts() {
    return posts.map(function(post) {
        return <Post
            title={post.title}
            content={post.content}
            image={post.image}
            published={post.published}
            author={post.author}
            postId={post.postId}
        />
    })
}

export default Posts;