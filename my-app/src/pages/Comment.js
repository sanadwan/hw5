import React from "react";
import Axios from "axios";
import '../Styles/comment.css'

export default class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            content:'',
            post_id:this.props.post_id,
            username: this.props.UserName
        };
    }

    handleCommentChange = (e) => {
        this.setState({
            content: e.target.value,
            post_id:this.props.post_id,
            username: this.props.UserName,
            resp:''
        })
    }

    componentDidMount() {
        let id = this.props.post_id
        console.log("this post id " + id)
        Axios.get(`/comment/${id}`).then(res => {
            this.setState({
                comments: res.data,
                post_id: res.data.post_id,
                content: res.data.content,
                username: this.props.UserName
            });

        console.log("this post comment ", this.state.comments)
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            content: this.state.content,
            username: this.state.username,
            post_id: this.state.post_id
        }
        console.log(data)
        let id = this.state.post_id
        Axios.post(`/comment/${id}`, data).then(res => {
            const post = res.data;
            console.log(post)
            this.setState({
                post_id: '',
                content: '',
                username: '',
                published: ''
            });
            //alert("added post successful!")
            // fix fox
            return this.props.history.push('/')
        }).catch((err) => {
            console.log(err)
            this.setState({
                resp: "Error: adding new comment failed."
            });
        })
    }
    commentMap = ()=>{
        let comment = this.state.comments
        console.log("comment", comment)
        if(comment !== "no comments") {
            return comment.map((com) => {
                return <SingleComment
                    id={com.id}
                    content={com.content}
                    username={com.username}
                    published={com.published}
                    post_id={com.post_id}
                />
                console.log()
            });

        } else {
            return <h5>No comments yet ...</h5>
        }
    }

    render() {
        let comment = this.state.comments
        return(
            <div>
                <div>
                    {this.commentMap()}
                </div>
                <div className={"comment-submit-container"}>
                    <input className={"comment-text-box"} type={"text"} value={this.state.comment} placeholder={"Write a comment..."} onChange={this.handleCommentChange}/>
                    <input className={"-comment-submit-button"} type={"submit"} value={"Comment!"} onClick={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}

var SingleComment = (comment) => {
    console.log("I made it to singleComment")
    return(
      <div className={"comment-container"}>
          <label>
              {comment.username}
          </label>
          <label className={"comment-content"}>
              {console.log("content " + comment.content)}
            <p >{comment.content}</p>
          </label>
          <label className="comment-footer">
              Published {comment.published}
          </label>
      </div>

    );
}

