import React from 'react';
import { BrowserRouter as Router , Route  } from 'react-router-dom';

import SignIn from '../components/authentication/signin/signin';
import SignUp from '../components/authentication/signup/signup';
import Dashboard from '../components/dashboard/dashboard';


const CustomRoutes = ()=>(

    <Router>
        <div>

            <Route exact path="/" component={ Dashboard }></Route>
            <Route exact path="/login" component={ SignIn }></Route>     
            <Route exact path="/createaccount" component={ SignUp }></Route>     
            <Route exact path="/home" component={ Dashboard }></Route>     
                 
        </div>
    </Router>

)

export default CustomRoutes;