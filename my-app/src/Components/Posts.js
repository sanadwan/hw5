import React from 'react';
import "../Styles/post.css";
import "../Styles/comment.css";
import Axios from "axios";
import Post from "../pages/Post";



export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
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
                let numberOfPost = res.data.length
                let commentShowArray = new Array(numberOfPost).fill(false)
                return(
                    this.setState({
                        posts: res.data,
                        numberOfPosts: numberOfPost,
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
        let loggedIn = this.state.loggedIn
        let username = this.state.user_name
        let showComment = this.state.showComment
        if (posts !== "no posts") {
            return posts.map((post, index) => {
                return <Post key={index} userName={username} loggedIn={loggedIn} post={post} Delete={this.DeletePost} showComment={showComment} postIndex={index}/>
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

    DeletePost = () => {
        return this.componentDidMount()
    }
};