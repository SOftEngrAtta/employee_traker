import React , { Component } from 'react';


//services 
import { getkey_data, setkey_data } from '../../services/storage.service';
import { checkuser } from '../../services/employee.service'

// import components 
import Header from '../header/header';


export default class SearchGroup extends Component{

    componentDidMount(){
        let userId = getkey_data({ 'KeyName': 'Id' })
        if (userId) {
            checkuser(userId)
                .then(res => {
                    this.setState({
                        userinfo: res.val()
                    })
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.val()) })
                })
        } else this.props.history.push('/login')
    }


    render(){
        return(
            <div>
                <Header getHistory={this.props} />
                <h1> Search Group</h1>
            </div>
        )
    }
}