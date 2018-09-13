import firebase from 'firebase'

const Keys ={ 
    apiKey: "AIzaSyDrp8Zgo2hoAmRSJ50tz-6pSMVbFVK1DSU",
    authDomain: "reactauthenticationapp-52f9a.firebaseapp.com",
    databaseURL: "https://reactauthenticationapp-52f9a.firebaseio.com",
    projectId: "reactauthenticationapp-52f9a",
    storageBucket: "reactauthenticationapp-52f9a.appspot.com",
    messagingSenderId: "395565462358"
}

firebase.initializeApp(Keys);

const Auth = firebase.auth();

export default Auth;
