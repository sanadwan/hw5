import React from 'react';
import './Styles/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from 'react-router-dom'

import Header from "./Components/Header";
import AboutMe from "./pages/AboutMe";
import About from "./pages/About";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Edit from "./pages/Edit";


class App extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            LoggedIn: false,
            first_name: '',
            user_name: '',
            user_id: '',
        }

    }
    componentDidMount() {
        if(this.state.user_name !== ''){
            this.setState({
                LoggedIn : true
            })
        }
    }

    setLoginToTrue = (e) => {
        this.setState({
            LoggedIn: true
        })
        console.log("Logged in!")
    }

    setLoginToFalse =(e) =>{
        this.setState({
            LoggedIn: false
        })
        console.log("Logged out!")
    }


    set_Name_Id = (data) => {
        this.setState({
            first_name: data.first_name,
            user_id: data.user_id,
            user_name: data.user_name
        })
    }

    render (){
        const Logged_in = this.state.LoggedIn
        return (
            <div className="app-header">
                <Router>
                    <Header isLoggedIn={this.state.LoggedIn} firstName={this.state.first_name} user_id = {this.state.user_id} onLogout={this.setLoginToFalse}/>
                    <Switch>
                        <Route path ="/register" component={Register}/>
                        <Route path="/login" component={(props) => <Login {...props} LoginSuccess={this.setLoginToTrue} set_Name_Id={this.set_Name_Id}/>}/>
                        <Route path='/post/:id' component = {Post}/>}/>
                        <Route path="/aboutme" component={AboutMe}/>
                        <Route path="/about" component={About}/>
                         <Route path="/newpost" component={(props) => Logged_in ? <NewPost {...props} user_id={this.state.user_id} />: <Redirect to={'/login'}/>}/>
                         <Route path="/edit/:id" component={(props) => Logged_in ? <Edit {...props} user_id={this.state.user_id} /> : <Redirect to={'/login'}/> } />
                        <Route path="/" component={(props) => <Home {...props} UserId={this.state.user_id} UserName={this.state.user_name}/>}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;