import React from "react";
import Axios from "axios";


export default class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: this.props.UserId,
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        let id = this.state.id
        if(id) {
            Axios.post(`/delete/${id}`).then(res => {
                this.props.history.push("/");
                return "succeed to delete"
            })

            console.log(" delete my post?" + id)
        }
    }
    render() {
       return("bla  bla")
    }

}