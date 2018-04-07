import firebase from 'firebase';

//firebase login authentication initialize
const config = {
  apiKey: "AIzaSyBTyr4K4NarIkDC0yaUQTUqQwJju6P1rbU",
  authDomain: "salestock-e55ad.firebaseapp.com",
  databaseURL: "https://salestock-e55ad.firebaseio.com",
  projectId: "salestock-e55ad",
  storageBucket: "",
  messagingSenderId: "1067278983867"
};
firebase.initializeApp(config);


export default firebase;
