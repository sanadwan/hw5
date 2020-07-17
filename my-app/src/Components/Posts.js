import React from 'react';
import "../Styles/post.css";
import "../Styles/comment.css";
import {Link} from 'react-router-dom';
import Axios from "axios";
import Comment from "../pages/Comment";
import default_image from '../images/blog.jpg';
import delete_image from '../images/delete_button.png';
import edit_image from '../images/edit_button.png';


export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            user_id: this.props.UserId,
            user_name: this.props.UserName,
            loggedIn: false,
            numberOfPosts: 0,
            showComment: [],
            postNUmber: null
        };
    }

    componentDidMount() {
        if (this.state.user_name) {
            this.setState({
                    loggedIn: true
            });
        }
        Axios.get('/posts').then(res => {
            if(res.data) {
                var postNumbers = res.data.length
                var commentShowArray = new Array(postNumbers).fill(false)
                return(
                    this.setState({
                        posts: res.data,
                        numberOfPosts: postNumbers,
                        showComment: commentShowArray
                    })
                )
            }
        }).catch((err)=>{
            return "post error " + err
        })
    };
    postMap = () => {
        let posts = this.state.posts
        if (posts !== "no post") {
            return posts.map((post, index) => {
                return this.Post(post, index)
            })
        } else {
            return <h2>No posts yet...</h2>
        }
    };

    render() {
        return(
            <div>
                {this.postMap()}
            </div>
        )
    }

    onComments = (postNumber) => {
        let commentShow = this.state.showComment
        if (this.state.loggedIn) {
            commentShow[postNumber] = !commentShow[postNumber];
            return (
                this.setState({
                    showComment: commentShow
                })
            )
        } else {
            return "You need to log in"
        }

    }
    Delete = (id) => {
        console.log("delete post " + id)
        if (id) {
            Axios.post(`/posts/delete/${id}`).then(res => {
                return this.componentDidMount()
            }).catch((err) => {
                console.log("Couldn't delete this post", err)
            })
        }
    };
    Post = (post, index) =>{
        let loggedIn = this.state.loggedIn
        let username = this.state.user_name
        let commentShows =  this.state.showComment
        let postNumber = index
        return (
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

                <div className="comments-container">
                    <div className="comments-block">
                        <label className="comment-content">
                            <button onClick={() =>{this.onComments(postNumber)}}>Comments</button>
                            <div>
                                {commentShows[postNumber] &&
                                <Comment post_id={post.id} UserName={username}/>}
                            </div>
                        </label>
                    </div>
                </div>
            </div>

        );
    };
};