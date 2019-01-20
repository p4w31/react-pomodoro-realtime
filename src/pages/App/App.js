import React, { Component } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './app.scss';
import withAuthentication from '../../components/withAuthentication';
import MenuTop from './MenuTop';

import IntervalsListPage from '../IntervalsList';
import LoginPage from '../Login';
import TimersPage from '../Timers'; 
import PreviewPage from '../Preview'; 

class App extends Component {
    constructor(props) {
        super(props);

        this.askForNotifications();
    }

    askForNotifications = () => {
        if (!("Notification" in window)) {
            alert("Browser don't support notifications");
        }
        else if (Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <MenuTop />

                    <Switch>
                        <Route path="/preview" component={ PreviewPage } />
                        <Route path="/list" component={ IntervalsListPage } />
                        <Route path="/login" component={ LoginPage } />
                        <Route path="/timers" component={ TimersPage } />
                        <Redirect from="/" exact to="/timers" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default withAuthentication(App);
