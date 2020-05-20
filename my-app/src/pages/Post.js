import React from "react";
import "../Styles/post.css";
import posts from '../postList';
import {useParams} from 'react-router-dom';

export default function Post() {
    let {id} = useParams();
    let post = {
        title: posts[id - 1].title,
        content: posts[id - 1].content,
        published: posts[id - 1].published,
        author: posts[id - 1].author
    }
    return(
        <div>
            <h2>{posts[id - 1].title}</h2>
            <p>{post.content}</p>
            <h5>This post has been published {post.published} by {post.author}</h5>
        </div>
    );


}

