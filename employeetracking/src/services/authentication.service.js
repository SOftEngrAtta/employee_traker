
// firebase import 
import fbDB from '../config/firebasekeys'

// local db storage import  
import { getkey_data , setkey_data } from './storage.service';


let Auth = fbDB.auth();


/** Login Functionality
 * @param {Object} data 
 * @param {Object key} data.EmailAddress
 * @param {Object key} data.Password
 */ 
export const login = (data) => Auth.signInWithEmailAndPassword(data.EmailAddress , data.Password);

/** create account functionality 
 * @param {Object} data 
 * @param {Object key} data.EmailAddress
 * @param {Object key} data.Password
 */ 
export const createaccount = (data) => Auth.createUserWithEmailAndPassword(data.EmailAddress , data.Password);

/**
 * verfiy user by token functionality 
 * @param { key } key // token
 * **/ 

 export const verifyuser = () => {
    
    let token = getkey_data({ 'KeyName' : 'auth_token'} )
    return Auth.onIdTokenChanged((user)=>{
        if(user && user.uid){
            setkey_data({ 'KeyName' : 'Id' , 'KeyData' : user.uid })
            return true 
        }else return false
    })
 }