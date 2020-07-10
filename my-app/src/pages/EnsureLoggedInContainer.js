import * as React from "react";
import {Redirect} from "react-router-dom";

class EnsureLoggedInContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: '',
            user_id: ''
        }
    }

    componentDidMount() {
        this.setState({
            loggedIn: this.props.isLoggedIn,
        })
        console.log("im before the if in Ensure", this.state.loggedIn)
        if(this.state.loggedIn){
            console.log("im in the if in Ensure")
            this.setState({
                username: this.props.UserName,

            })
        }

    }

    render() {
        if (!this.state.LoggedIn) {
            console.log("logged in " + this.state.loggedIn)
            return <Redirect to={'/login'}/>
        }
    }

}


export default EnsureLoggedInContainer