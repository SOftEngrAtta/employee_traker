
import fbDB from '../config/firebasekeys'

let dataDB = fbDB.database();
let storageRef  = fbDB.storage().ref();

/***
 * upload image functionality 
 * @param { Object } data 
 * @param { ImageDB } data.ImageDB
 * **/ 
export const uploadImageDB = ( data ) => {
    

}


/**
 * update user profile functionality 
 * @param {Object} data
 * @param {Id Key} data.Id  
 * @param {ImageName Key} data.ImageName 
 * @param {FullName Key} data.FullName 
 * @param {Age Key} data.Age 
 * @param {Email Address Key} data.EmailAddress 
 * @param {ContacNumber Key} data.ContactNumber 
 * @param {Address Key} data.Address 
 * @param {HomeLocation Object} data.HomeLocation
 * @param {Latitute Object} data.Latitute
 * @param {Longitute Object} data.Longitute
 *  
 */ 
export const updateprofiledata = (data) => dataDB.ref('users').child(data['Id']).update(data)


/***
 * save create user record functionality 
 * @param { Object } data
 * @param { Id Key } data.Key
 * @param { EmailAddress Key } data.EmailAddress
 * **/ 
export const saveuserdb = ( data ) => dataDB.ref('users').child(data['Id']).update(data);


/**
 * check user functionality 
 * @param { Id Key } data.Key
 * **/ 
export const checkuser = (Id) => dataDB.ref('users/'+Id).once('value');