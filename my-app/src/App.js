import React from 'react';
import './Styles/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from 'react-router-dom'
import Axios from 'axios';
import Header from "./Components/Header";
import AboutMe from "./pages/AboutMe";
import About from "./pages/About";
import Home from "./pages/Home";
import PostForm from "./Components/PostForm"
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Register from "./pages/Register"



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
        Axios.get('/login')
            .then((res)=>{
                if(res.data !== []){
                    return this.setState({
                        LoggedIn: true,
                        user_id: res.data.user_id,
                        first_name: res.data.first_name,
                        user_name: res.data.username
                    })
                } else {
                   return this.setState({
                        LoggedIn: false,
                        user_id: '',
                        first_name: '',
                        username: ''
                    })
                }
        })
    }

    setLoginToTrue = () => {
        this.setState({
            LoggedIn: true
        })
        console.log("Logged in!")
    }

    setLoginToFalse =() =>{
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
                        <Route path='/post/:id' component = {(props) => <SinglePost {...props} UserName={this.state.user_name} LoggedIn={this.state.LoggedIn}/>}/>
                        <Route path="/aboutme" component={AboutMe}/>
                        <Route path="/about" component={About}/>
                         <Route path="/newpost" component={(props) => Logged_in ? <PostForm {...props} user_id={this.state.user_id} edit={false} />: <Redirect to={'/login'}/>}/>
                         <Route path="/edit/:id" component={(props) => Logged_in ? <PostForm {...props} user_id={this.state.user_id} edit={true} /> : <Redirect to={'/login'}/> } />
                        <Route path="/" component={(props) => <Home {...props} UserId={this.state.user_id} UserName={this.state.user_name}/>}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;