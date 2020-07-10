import React from 'react';
import "../Styles/post.css";
import {Link} from 'react-router-dom';
import Axios from "axios";
import Comment from "../pages/Comment";


export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            user_id: this.props.UserId,
            user_name: this.props.UserName,
            edit: false
        };
    }


    componentDidMount() {
        this.setState({
            user_id: this.props.UserId,
            user_name: this.props.UserName
        })

        Axios.get('/posts').then(res => {
            this.setState({
                posts: res.data,
            });
        })

    }

    render() {
        if (this.state) {
            return this.state.posts.map((post)=> {
                return <Post
                    id={post.id}
                    postUserId={post.user_id}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    image={post.image}
                    published={post.published}
                    loginUserId={this.props.UserId}
                    username={this.state.user_name}

                />
            })
        } else {
            return <div>loading...</div>

        }
    }
}




var Post = (post) => {
    var loggedIn = post.postUserId === post.loginUserId
    return (
        <div>
            <div className="post-container">
                <div className="post">
                    <label className="post-title">
                        <Link to={`/post/${post.id}`} className="post-title"> {post.title} </Link>
                    </label>
                    <label className={"post-props"}>
                        {loggedIn &&
                            <Link to={`/edit/${post.id}`} onClick={()=>{return post.id;}}>Edit</Link>
                        }
                        {"  "}
                        {loggedIn &&
                        <Link to={`/delete/${post.id}`}  >Delete</Link>
                        }
                    </label>
                    <p className="post-content">
                        {post.content}
                    </p>
                    <label className={"post-image"}>
                        <img alt="" width="90" height="90" className="post-image" src={post.image}/>
                    </label>
                    <label className="post-footer">
                        Published {post.published} by {post.author}
                    </label>
                </div>
            </div>
            <div>
                <div className="comments-container">
                    <div className="comments-block">
                        <label className="comment-content">
                            {loggedIn &&
                                <Comment post_id={post.id} UserName={post.username}/>
                            }
                        </label>
                    </div>
                </div>
            </div>
        </div>

    );
};