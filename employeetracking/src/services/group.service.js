import fbDB from '../config/firebasekeys'

let dataDB = fbDB.database();

/**
 * @param {Id}
 */
export const getGroups = (Id) => dataDB.ref('groups/' + Id).once('value');

/**
 * get all groups functionality 
 */
export const getAllGroups = (id) => {
    return dataDB.ref('groups').once('value')
        .then(res => {
            let _groups = [];
            res.forEach(elem => {
                elem.forEach(item => {
                    let grpObj = item.val();
                    grpObj['key'] = item.key;
                    _groups.push(grpObj)
                })
            })
            return _groups
        })
        .then(grps => {
            let finalgroups = []
            for (let i = 0; i < grps.length; i++) {
                grps[i]['Users'].find(item => {
                    if (id == item) finalgroups.push(grps[i])
                })
            }
            return finalgroups;
        })
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
export const deletegroup = (data) => dataDB.ref('groups').child(data['createrId']).child(data['groupKey']).remove();
