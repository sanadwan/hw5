import React from 'react';
import './Styles/App.css';
import Header from "./Components/Header"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AboutMe from './pages/AboutMe';
import Login from "./pages/Login";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-header">
                <Router>
                <Header/>
                    <Switch>
                        <Route path="/AboutMe" component={AboutMe}/>
                        <Route path="/About" component={About}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/newPost" component={NewPost}/>
                        <Route exact path="/post/:id" component={Post}/>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </Router>
            </div>
        );

    }
}

export default App;
