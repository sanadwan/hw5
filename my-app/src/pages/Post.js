import React from "react";
import {Link} from "react-router-dom";
import edit_image from "../images/edit_button.png";
import delete_image from "../images/delete_button.png";
import default_image from "../images/blog.jpg";
import Axios from "axios";
import {Button} from 'react-bootstrap';



export default class Posts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            post: this.props.post,
            index: this.props.postIndex,
            user_name: this.props.userName,
            loggedIn: this.props.loggedIn,
            postNUmber: null
        };
    }
    Delete = (id) => {
        console.log("delete post " + id)
        if (id) {
            Axios.delete(`/posts/${id}`).then(res => {
                if (res.data === "Post delete succeed") {
                    return this.props.Delete()
                } else {
                    alert("Error: Can not delete post")
                }
                 return this.setState({
                    resp: "Deleted post with id: ", id
                })
            }).catch((err) => {
                console.log("Couldn't delete this post", err)
            })
        }
    };
    render() {
        let postNumber = this.props.postIndex
        let post = this.props.post
        let loggedIn = this.state.loggedIn
        return(
            <div key={postNumber}>
                <div className="post-container">
                    <div className="post">
                        <label className="post-title">
                            <Link to={`/post/${post.id}`} className="post-title"> {post.title} </Link>
                        </label>
                        <label className={"post-props"}>
                            {loggedIn &&
                            <Link to={`/edit/${post.id}`}>
                                <input type={'image'} src={edit_image} height={'20'} width={'25'} alt={""} onClick={() => {
                                    return post.id;
                                }}/>
                            </Link>
                            }
                            {loggedIn &&
                            <input type={'image'} src={delete_image} height={'20'} width={'20'} alt={""} onClick={() => {
                                if (window.confirm('Are you sure you wish to delete this item?')) {
                                    this.Delete(post.id)
                                }
                            }}/>
                            }
                        </label>
                        <p className="post-content">
                            {post.content}
                        </p>
                        <label className={"post-image"}>
                            <img alt="nothing here" width={'100'} height={'100'} className={"post-image"}
                                 src={post.image ? post.image : default_image}/>
                        </label>
                        <label className="post-footer">
                            Published {post.published} by {post.author}
                        </label>
                    </div>
                </div>
                    <label className="comment-content">
                        { loggedIn &&
                            <Link to={`/post/${post.id}`} className="post-title">
                                <Button>Show Comments</Button>
                            </Link>
                        }
                        {
                            !loggedIn &&
                            <p>{"You have to "}
                                <Link to={'/login'}>Login</Link>
                                {"  Or"}
                                <Link to={'/register'}>Sign Up</Link>
                                {"  to see the Comments!"}
                            </p>
                        }
                    </label>
            </div>
        )
    }



}


