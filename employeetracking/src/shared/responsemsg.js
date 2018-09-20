import React ,  { Component } from 'react';
import { ToastContainer , toast , Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class DisplayMessage extends Component{


    render(){
        return(
            <ToastContainer position="top-right"
                autoClose = { this.props.timeduration }
                hideProgressBar={ true }
                newestOnTop={false}
                transition={ Slide }
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        )
    }
}

export const SuccessMessage = (res) => toast.success(res)

export const ErrorMessage = (err) => toast.error(err)