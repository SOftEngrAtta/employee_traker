import fbDB from '../config/firebasekeys'

let dataDB = fbDB.database();

/**
 * @param {Id}
 */  
export const getGroups = (Id) => dataDB.ref('groups/'+Id).once('value');


/**
 * 
 * @param {Object} data 
 * @param { data.Fullname }
 * @param { data.Image }
 * @param { data.users }
 * @param { data.admins }
 */ 
export const groupCreateUpdate = (data)=>{
    let _data = { FullName : data['FullName'] , Image : data['Image'] , Admins: data['Admins'] , Users: data['Users'] , CreatedBy: data['CreatedBy'], createdAt: data['CreatedAt'] }
    return dataDB.ref('groups').child(_data['CreatedBy']).child(data['counts']+1).update(_data);
} 