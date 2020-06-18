import React from 'react';
import './Styles/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom'

import Header from "./Components/Header";
import AboutMe from "./pages/AboutMe";
import About from "./pages/About";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register"

class App extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            LoggedIn: false,
            first_name:'',
            user_id:'',
        }
    }

    setLoginToTrue = (e) => {
        this.setState({
            LoggedIn: true
        })
    }

    setLoginToFalse =(e) =>{
        this.setState({
            LoggedIn: false
        })
    }


    set_Name_Id = (data) => {
        this.setState({
            first_name: data.first_name,
            user_id: data.user_id,
        })

    }

    render (){
        return (
            <div className="app-header">
                <Router>
                    <Header isLoggedIn={this.state.LoggedIn} onLogout={this.setLoginToFalse}/>
                    <Switch>
                        <Route path ="/register" component={Register}/>
                        <Route path="/login" component={() => <Login LoginSuccess={this.setLoginToTrue}/>}/>
                        <Route path='/post/:id' component = {Post}/>}/>
                        <Route path="/aboutme" component={AboutMe}/>
                        <Route path="/about" component={About}/>
                        <Route path="/newpost" component={NewPost}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;