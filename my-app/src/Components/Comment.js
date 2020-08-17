import React from "react";
import delete_image from "../images/delete_button.png";
import Axios from "axios";


export default class Comments extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: this.props.comment,
            index: this.props.index,
            loggedIn: this.props.LoggedIn,
            content:'',
            post_id:this.props.post_id,
            username: this.props.UserName
        };
    }

    DeleteComment = (id) => {
        if (id) {
            Axios.delete(`/comment/${id}`).then(res => {
                if (res.data === "comment delete succeed") {
                    return this.props.Delete()
                }
            }).catch((err) => {
                console.log("Couldn't delete this post", err)
            })
        }
    };

    render(){
        let comment = this.state.comment
        let index = this.state.index
        let loggedIn = this.state.loggedIn
        return(
            <div key={index} className={"comment-container"}>
                <label className={"username-title"}>
                    {comment.username}
                </label>
                <label>
                    {loggedIn &&
                        <input type={'image'} src={delete_image} height={'20'} width={'20'} alt={""} onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?')) {
                                this.DeleteComment(comment.id)
                            }
                        }}/>
                    }
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