
// firebase import 
import fbDB from '../config/firebasekeys'

// local db storage import  
import { setkey_data , clearhistory} from './storage.service';


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
 * logout user functionality 
 * **/ 
export const logoutuser = ()=> {
    clearhistory();  
    return Auth.signOut()
};

 