import React from "react";
import Axios from "axios";
import '../Styles/comment.css'
import delete_image from "../images/delete_button.png";

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
        Axios.get(`/comment/${id}`).then(res => {
            this.setState({
                comments: res.data,
                post_id: res.data.post_id,
                content: res.data.content,
                username: this.props.UserName
            });
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            content: this.state.content,
            username: this.state.username,
            post_id: this.state.post_id
        }
        let id = this.state.post_id
        Axios.post(`/comment/${id}`, data).then(res => {
            console.log("added comment")
                this.setState({
                content: '',
                })
            return this.componentDidMount()
        }).catch((err) => {
            console.log(err)
            this.setState({
                resp: "Error: adding new comment failed."
            });
        })
    }
    DeleteComment = (id) => {
        console.log("delete")
        if (id) {
            Axios.post(`/comment/delete/${id}`).then(res => {
                return this.componentDidMount()
            }).catch((err) => {
                console.log("Couldn't delete this post", err)
            })
        }
    };
    commentMap = () =>{
        let comment = this.state.comments
        if(comment !== "no comments") {
            return comment.slice(0).reverse().map((comm, index) => {
                return this.SingleComment(comm, index)
            });
        } else {
            return <h5>No comments yet ...</h5>
        }
    }

    render() {
        return(
            <div>
                <div className={"comment-submit-container"}>
                    <input className={"comment-text-box"} type={"text"} value={this.state.comment} placeholder={"Write a comment..."} onChange={this.handleCommentChange}/>
                    <form onSubmit={this.handleSubmit}>
                        <button className={"-comment-submit-button"} type={"submit"} value={"Comment!"}>Comment</button>
                    </form>
                </div>
                <div className={"comment-container"}>
                    {this.commentMap()}
                </div>
            </div>
        );
    }


     SingleComment = (comment, index) => {

        return(
          <div key={index} className={"comment-container"}>
              <label>
                  {comment.username}
              </label>
              <label>
                  <input type={'image'} src={delete_image} height={'20'} width={'20'} alt={""} onClick={() => {
                      if (window.confirm('Are you sure you wish to delete this item?')) {
                          this.DeleteComment(comment.id)
                      }
                  }}/>
              </label>
              <label className={"comment-content"}>
                <p >{comment.content}</p>
              </label>
              <label className="comment-footer">
                  Published {comment.published}
              </label>
          </div>

        );
    }

}