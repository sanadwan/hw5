import React from 'react';
import Axios from 'axios';


class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post:[],
            id: this.props.match.params.id,
            title: '',
            content: '',
            author: '',
            published:'',
            image: null,
            user_id: this.props.user_id
        };
    }


    componentDidMount() {
        let id = this.props.match.params.id;
        Axios.get(`/posts/${id}`).then(res => {
            this.setState({
                post: res.data,
                title: res.data.title,
                content: res.data.content,
                author: res.data.author,
                image: res.data.image,
                id: id
            });
            console.log("state    ", res.data)
        }).catch((err)=>{
            console.log(err)
        });


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
        //e.preventDefault();
        const data = {
            user_id: this.state.user_id,
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
            image: this.state.image
        }
        console.log("this is the data", data)
        let id = this.state.id
        Axios.post(`/edit/${id}`, data).then(res => {
            const post = res.data;
            this.setState({
                title: '',
                content: '',
                author:'',
                image:''
            });
            console.log("post id " + id)
        }).catch((err)=> {
            console.log(err)
            // this.setState({
            //     resp: "Error: failed to login user."
            // });
        });
    }

    render() {
        let post = this.state.post
        return (
            <div>
                <h3>Edit Page</h3>
                <p>
                    <br/>
                    <input type="text" defaultValue={post.title} required size="48" onChange={this.handleTitleChange}/>
                    <br/><br/>
                    <textarea rows="8" cols="50" defaultValue={post.content} required onChange={this.handleContentChange}/>
                    <br/><br/>
                    <input type="text" defaultValue={post.author} required size="48" onChange={this.handleAuthorChange}/>
                    <br/><br/>
                    <input type="file" defaultValue={post.image} size="48" accept="image/png, image/jpeg" onChange={this.handleImageChange}/>
                    <br/>Or<br/>
                    <input type="text" defaultValue={post.image} placeholder="image URL" size="48" onChange={this.handleImageChange}/>
                    <br/><br/>
                    <input type="submit" value="Save post" onClick={this.handleSubmit}/>
                </p>
            </div>
        );

    }
}

export default Edit;
