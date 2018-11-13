/**
 * set data in localstorage functionality 
 * @param { Object } data 
 * @param { KeyName } data.KeyName
 * @param { KeyData } data.KeyData
 */ 
export const setkey_data = (data)=> localStorage.setItem(data['KeyName'], data['KeyData']);

/**
 * get data from localstorage functionlity 
 * @param { Object } data
 * @param { KeyName } data.KeyName 
 */ 
export const getkey_data = (data)=> localStorage.getItem( data['KeyName'] );

/**
 * delete data from localstorage functionality 
 * @param { Object } data 
 * @param { KeyName } data.KeyName
 */ 
export const deletekey_data = (data)=> localStorage.removeItem( data['KeyName'] );

/**
 * clear local history functionality 
 * **/ 
export const clearhistory = ()=> localStorage.clear();  