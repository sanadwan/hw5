import React from 'react';
import MainSection from "../Components/MainSection";
import Sidebar from "../Components/Sidebar";

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            UserId: this.props.UserId,
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
            <div>
                <div className="app-container">
                    <div className="mainSection-container">
                        <MainSection UserId={user_id} UserName={user_name}/>
                    </div>
                    <div className="sidebar-container">
                        <Sidebar/>
                    </div>
                </div>
            </div>
        );
    }
}



