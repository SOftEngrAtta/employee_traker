
import fbDB from '../config/firebasekeys';
import { fromRef } from 'rxfire/database';
import * as rxjs from 'rxjs';
import { subscribeOn } from 'rxjs/internal/operators/subscribeOn';

let dataDB = fbDB.database();

/***
 * upload image functionality 
 * @param { Object } data 
 * @param { ImageDB } data.ImageDB
 * **/ 
export const uploadImageDB = ( data ) => {
    let storageUrl = 'images/';
    let storageRef = fbDB.storage().ref(storageUrl + data.name);
    return storageRef.put(data)
    .then(res=>{
        let getUrl = fbDB.storage().ref().child(storageUrl + data.name);
        return getUrl.getDownloadURL()
    })
}


/**
 * update user profile functionality 
 * @param {Object} data
 * @param {Id Key} data.Id  
 * @param {ImageUrl Key} data.ImageName 
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
export const checkuser = (Id) => {
    let query = dataDB.ref('users/'+Id);
    
    return fromRef(query,'value')

    // return new rxjs.Observable( subscriber =>{
    //     dataDB.ref('user/'+Id).once('value')
    //     .then(res=>{
    //         debugger
    //     })
    // })

    // return new rxjs.Observable(function (subscriber) {

    //     var fn = query.on(event, function (snapshot, prevKey) {
    //         subscriber.next({ snapshot: snapshot, prevKey: prevKey, event: event });
    //     }, subscriber.error.bind(subscriber));
    //     return {
    //         unsubscribe: function () {
    //             query.off(event, fn);
    //         }
    //     };
    // }).pipe(operators.delay(0));
}


/**
 * get user
 */ 
export const getUser = (Id) => {
    let query = dataDB.ref('users').child(Id);
    return fromRef(query,'value');
}