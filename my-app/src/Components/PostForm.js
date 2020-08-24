import React from "react";
import Axios from "axios";


class PostForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            author: '',
            published:'',
            user_id: this.props.user_id,
            image: '',
            post_id: this.props.match.params.id,
            edit: this.props.edit
        };
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        let edit = this.state.edit
        if(edit) {
            Axios.get(`/posts/${id}`).then(res => {
                this.setState({
                    post: res.data,
                    title: res.data.title,
                    content: res.data.content,
                    author: res.data.author,
                    image: res.data.image,
                    id: id
                });
            }).catch((err) => {
                console.log("couldn't get post ", err)
            });
        }

    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    }
    handleContentChange = (e) => {
        this.setState({
            content: e.target.value,
        })
    }
    handleAuthorChange = (e) => {
        this.setState({
            author: e.target.value,
        })
    }
    handleImageChange = (e) => {
        this.setState({
            image: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            user_id: this.state.usxer_id,
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
            image: this.state.image,
        }
        if(!this.state.edit) {
            Axios.post('/posts', data).then(res => {
                if(res.data !== '') {
                    this.setState({
                        user_id: '',
                        title: '',
                        content: '',
                        author: '',
                        image: '',
                        published: ''
                    });
                }
                alert("Added post successfully!")
                this.props.history.push("/");
            }).catch((err) => {
                console.log(err)
                this.setState({
                    resp: "Error: adding new post failed."
                });
            })
        } else {
            Axios.put(`/posts/${this.state.post_id}`, data).then(res => {
                if(res.data === "edit succeed") {
                    this.setState({
                        title: '',
                        content: '',
                        author: '',
                        image: ''
                    });
                }
                alert("Edited post successfully!")
                this.props.history.push("/");
            }).catch((err)=> {
                console.log("couldn't edit post ", err)
            });
        }
    }

    render() {
        let edit = this.state.edit
            let {title, content, author, image} = this.state
        return (
            <div>
                { edit &&
                <h1>Edit post</h1>
                }
                { !edit &&
                    <h1>Create new post</h1>
                }
                <div>
                    <br/>
                    <form className={"new-post-form"} onSubmit={this.handleSubmit} >
                        <input type="text" defaultValue={title} required pattern=".*\S+.*" placeholder="Enter your title" size="48" onChange={this.handleTitleChange}/>
                        <br/><br/>
                        <textarea rows="8" cols="50" value={content} required pattern=".*\S+.*" placeholder="Enter your post content" onChange={this.handleContentChange}/>
                        <br/><br/>
                        <input type="text" defaultValue={author} required pattern=".*\S+.*" placeholder="Author Name" size="48" onChange={this.handleAuthorChange}/>
                        <br/><br/>
                        <input type="file" defaultValue={image} size="48" accept="image/png, image/jpeg" onChange={this.handleImageChange}/>
                        <br/>Or<br/>
                        <input type="text" defaultValue={image} placeholder="image URL" size="48" onChange={this.handleImageChange}/>
                        <br/><br/>
                        <input type="submit" defaultValue="Save post"/>
                    </form>
                </div>
            </div>
        );

    }

}
export default PostForm;