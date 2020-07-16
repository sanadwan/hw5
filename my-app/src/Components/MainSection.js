import React from 'react';
import Posts from './Posts'

export default class MainSection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            UserId: this.props.UserId
        }
    }

    componentDidMount() {
        this.setState({
            UserId: this.props.UserId
        })
    }

    render() {
        const user_id = this.props.UserId;
        const user_name = this.props.UserName;
        return (
            <section className="posts">
                <label className="title"><h1>This is my blog</h1></label>
                <div id="posts-root" className="posts-list">
                    <Posts UserId={user_id} UserName={user_name}/>
                </div>
            </section>
        );
    }
}
