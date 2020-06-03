import React from 'react';
import Axios from 'axios';


class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            author: '',
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

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
        }

        Axios.post('/posts', data).then(res => {
            const post = res.data;
            this.setState({
                title: '',
                content: '',
                author:''
            });
        })
    }

    render() {
        return (
            <div>
                <h1>Create new post</h1>
                <p>
                    <br/>
                    <input type="text" value={this.state.title} placeholder="Enter your title" size="48" onChange={this.handleTitleChange}/>
                    <br/><br/>
                    <textarea rows="8" cols="50" value={this.state.content} placeholder="Enter your post content" onChange={this.handleContentChange}/>
                    <br/><br/>
                    <input type="text" value={this.state.author} placeholder="Author Name" size="48" onChange={this.handleAuthorChange}/>
                    <br/><br/>
                    <input type="submit" value="Save post" onClick={this.handleSubmit}/>
                </p>
            </div>
        );

    }
}

export default NewPost;



