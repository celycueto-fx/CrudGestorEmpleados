import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAJpLaOM8kenhRWXpJxrgsaCg71o5gLA08",
  authDomain: "crud-react-bf732.firebaseapp.com",
  databaseURL: "https://crud-react-bf732-default-rtdb.firebaseio.com",
  projectId: "crud-react-bf732",
  storageBucket: "crud-react-bf732.appspot.com",
  messagingSenderId: "915817290538",
  appId: "1:915817290538:web:fb3f7abc62fe07563cdc53",
  measurementId: "G-D3RT3PZMMW"
  };
  // Initialize Firebase
  var fireDB=firebase.initializeApp(firebaseConfig);

  export default fireDB.database().ref();