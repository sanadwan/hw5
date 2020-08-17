import React from "react";
import Axios from "axios";
import Post from "./Post";
import Comments from "./Comments";

class SinglePost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: [],
            loggedIn: this.props.LoggedIn,
            post_id: this.props.match.params.id,
            username: this.props.UserName
        };
    }

    componentDidMount() {
        let id = this.state.post_id
        Axios.get(`/posts/${id}`).then(res => {
            this.setState({
                post: res.data,
            });
        })

    }

    render() {
        let post = this.state.post
        let loggedIn = this.state.loggedIn
        return (
            <div className={"singlepost-container"}>
                <div className={"singlepost-post"}>
                    <Post userName={this.props.UserName} loggedIn={this.props.LoggedIn} post={post}/>
                </div>
                <div className={"singlepost-comments"}>
                    {loggedIn &&
                    <Comments post_id={this.state.post_id} UserName={this.props.UserName}
                              LoggedIn={this.state.loggedIn}/>
                    }
                </div>
            </div>
        )
    }



}
export default SinglePost;
