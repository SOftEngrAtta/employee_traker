import { authState } from 'rxfire/auth'
import { listVal , changeToData } from 'rxfire/database'
import { tap } from 'rxjs/operators';

import fbDB from '../config/firebasekeys'

let dataDB = fbDB.database();
let groupsdata = fbDB.database().ref('groups');



/**
 * @param {Id}
 */
export const getGroups = (Id) => dataDB.ref('groups/' + Id).once('value');


/**
 * get all groups functionality 
 */
export const getAllGroups  = (id)=> {

    let query = dataDB.ref('groups');
    
    let data = changeToData(query.on('value',res=> res))
    debugger 
    // return new Promise((resolve , reject)=>{
    //     query.on('value' , snapshot => {
    //         let _groups = []; let finalgroups = [];
    //         snapshot.forEach(elem => {
    //                 elem.forEach(item => {
    //                     let grpObj = item.val();
    //                     grpObj['key'] = item.key;
    //                     _groups.push(grpObj)
    //                 })
    //             })
        
    //             for (let i = 0; i < _groups.length; i++) {
    //                 _groups[i]['Users'].find(item => {
    //                     if (id == item) finalgroups.push(_groups[i])
    //                 })
    //             }
    //         resolve(finalgroups)
    //     })
    // })

    

    
}


/**
 * 
 * @param {Object} data 
 * @param { data.Fullname }
 * @param { data.Image }
 * @param { data.users }
 * @param { data.admins }
 */
export const groupCreateUpdate = (data) => {
    let _data = { FullName: data['FullName'], Image: data['Image'], Admins: data['Admins'], Users: data['Users'], CreatedBy: data['CreatedBy'], createdAt: data['CreatedAt'] }
    return dataDB.ref('groups').child(_data['CreatedBy']).push(_data);
}

/**
 * 
 * @param { Object } data 
 * @param { data.createrId }
 * @param { data.groupKey } 
 *  
 */
export const deleteGroupRecord = (data) => dataDB.ref('groups').child(data['createrId']).child(data['groupKey']).remove();

/**
 * @param {*key} userId 
 * @param {*key} grpId 
 */
export const getGroupInfo = (userId, grpId) => dataDB.ref('groups').child(userId).child(grpId).once('value');

export const groupUpdateInfo = (data) => {

    return dataDB.ref('groups').child(data['CreatedBy']).child(data['Id']).update(data)
};

