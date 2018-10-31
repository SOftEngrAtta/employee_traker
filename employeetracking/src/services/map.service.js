import axios from 'axios';

export const findlocation = (text)=>{
    debugger
    let placesearch = `https://maps.googleapis.com/maps/api/place/textsearch/xml?query=${text}&key=AIzaSyCetrwl6BIEBZjddEkR804Fi_cNlHBKnyI`
    return axios.get(placesearch) 
}