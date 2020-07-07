import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import PrimarySearchAppBar from "./components/appBar";
import HomePage from "./components/homePage";
import CollaboratorsPage from "./components/collaboratorsPage";
import MeetingPage from "./components/meetingPage";
import Profile from "./components/profile";
import {Switch, Route} from "react-router-dom";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import {ToastContainer} from "react-toastify";
import {withRouter} from 'react-router-dom';

function App(props) {

    return (
        <>
            <ToastContainer/>
            <PrimarySearchAppBar/>
            <Switch>
                <Route path='/signup' component={SignUp}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/tech-details' component={CollaboratorsPage}/>
                <Route path='/join' component={MeetingPage}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/' component={SignIn}/>
            </Switch>
        </>
);
}

export default withRouter(App);
