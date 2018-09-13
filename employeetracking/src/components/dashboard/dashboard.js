import React , { Component } from 'react';
import { ButtonToolbar , Button } from 'react-bootstrap/lib';



class Dashboard extends Component {
    render(){
        return(
            <h1>
               <ButtonToolbar>
                    <Button>Default</Button>
                </ButtonToolbar>
            </h1>
        )
    }
}

export default Dashboard