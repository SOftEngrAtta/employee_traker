import React , { Component } from 'react';

// css files
import './dashboard.css';

//service files 
import { verifyuser } from '../../services/authentication.service';

// components
import Header from '../header/header';


class Dashboard extends Component {


    componentDidMount(){
        verifyuser();
    }

    render(){
        return(
            <div className="prnt-dashboard">
                <Header />
                <div className="row prnt-dsh">
                    <div className="container-fluid ">
                        <div class="col-md-7">
                            <div className="rcnt-acts">
                                <p className="rcnt-hd"> Recent Activities </p>
                                <hr />
                                {/* recent logged list detail */}
                                <div class="">

                                </div>

                            </div>
                        </div>
                        <div class="col-md-4 col-offset-md-1">
                            <div className="grps-cls">
                                <p className="grps-hd">Groups</p>
                                <hr />
                                {/* recent groups list detail */}
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard