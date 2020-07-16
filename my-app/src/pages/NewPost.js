import React from 'react';
import Axios from 'axios';


class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            author: '',
            published:'',
            user_id: this.props.user_id,
            image: ''
        };
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
            user_id: this.state.user_id,
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
            image: this.state.image,
        }
        Axios.post('/posts', data).then(res => {

            console.log("added post")
            this.setState({
                user_id: '',
                title: '',
                content: '',
                author:'',
                image: '',
                published:''
            });
            alert("added post successful!")
            this.props.history.push("/");
        }).catch((err) => {
                console.log(err)
                this.setState({
                    resp: "Error: adding new post failed."
                });
        })
    }

    render() {
        return (
            <div>
                <h1>Create new post</h1>
                <div>
                    <br/>
                    <input type="text" value={this.state.title} required placeholder="Enter your title" size="48" onChange={this.handleTitleChange}/>
                    <br/><br/>
                    <textarea rows="8" cols="50" value={this.state.content} required placeholder="Enter your post content" onChange={this.handleContentChange}/>
                    <br/><br/>
                    <input type="text" value={this.state.author} required placeholder="Author Name" size="48" onChange={this.handleAuthorChange}/>
                    <br/><br/>
                    <input type="file" value={this.state.image} size="48" accept="image/png, image/jpeg" onChange={this.handleImageChange}/>
                    <br/>Or<br/>
                    <input type="text" value={this.state.image} placeholder="image URL" size="48" onChange={this.handleImageChange}/>
                    <br/><br/>
                    <form onSubmit={this.handleSubmit} className={"newpost-submit-button"}>
                        <input type="submit" value="Save post" onClick={this.handleSubmit}/>
                    </form>
                </div>
            </div>
        );

    }
}

export default NewPost;



