import React from "react";
import Axios from "axios";
import '../Styles/comment.css'
import Comment from "../Components/Comment";

export default class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            content:'',
            loggedIn: this.props.LoggedIn,
            post_id: this.props.post_id,
            username: this.props.UserName
        };
    }
    componentDidMount() {
        let id = this.state.post_id
        Axios.get(`/comment/${id}`).then(res => {
            this.setState({
                comments: res.data,
                content:''
            });
        })
    }

    handleCommentChange = (e) => {
        e.preventDefault();
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.state.post_id
        let loggedIn = this.state.loggedIn
        const data = {
            content: this.state.content,
            username: this.state.username,
            post_id: this.state.post_id
        }
        if(loggedIn){
            Axios.post(`/comment/${id}`, data).then(res => {
                if (res.data !== '')
                this.setState({
                        comments: [],
                        content: ''
                })
                return this.componentDidMount()
            }).catch((err) => {
                console.log(err)
                this.setState({
                    resp: "Error: adding new comment failed."
                });
            })
        } else {
            alert("You have to be logged in to comment")
            return this.componentDidMount()
        }
    }

    commentMap = () =>{
        let comments = this.state.comments
        let loggedIn = this.state.loggedIn
        if(comments !== "no comments") {
            return comments.slice(0).reverse().map((comment, index) => {
                return <Comment key={index} comment={comment} LoggedIn={loggedIn} Delete={this.CommentDelete} index={index}/>
            });
        } else {
            return <p>No comments yet ...</p>
        }
    }

    render() {
        return(
            <div key={this.state.post_id}>
                <div className={"comment-submit-container"}>
                    <form onSubmit={this.handleSubmit}>
                        <input className={"comment-text-box"} type={"text"} value={this.state.content} placeholder={"Write a comment..."} onChange={this.handleCommentChange}/>
                        <button className={"-comment-submit-button"} type={"submit"} value={"Comments!"}>Comment</button>
                    </form>
                </div>
                <div className={"comment-container"}>
                    {this.commentMap()}
                </div>
            </div>
        );
    }


    CommentDelete = () =>{
        return this.componentDidMount()
    }
}