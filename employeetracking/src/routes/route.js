import React from 'react';
import { BrowserRouter as Router , Route  } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


import SignIn from '../components/authentication/signin/signin';
import SignUp from '../components/authentication/signup/signup';
import Dashboard from '../components/dashboard/dashboard';
import UserProfile from '../components/userprofile/profile';


const createHistory = createBrowserHistory();

const CustomRoutes = ()=>(

    <Router history={ createHistory }>
        <div>
            <Route exact path="/" component={ Dashboard }></Route>
            <Route exact path="/login" component={ SignIn }></Route>     
            <Route exact path="/createaccount" component={ SignUp }></Route>     
            <Route exact path="/dashboard" component={ Dashboard }></Route>     
            <Route exact path="/userprofile/:id" component={ UserProfile }></Route>    
        </div>
    </Router>

)

export default CustomRoutes;