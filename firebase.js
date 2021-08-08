import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';



var firebaseConfig = {
    apiKey: "AIzaSyByQ-6nQQ3LCfmdqbNpKqEHNQ0SBbMQHHc",
    authDomain: "motoapp-80898.firebaseapp.com",
    projectId: "motoapp-80898",
    storageBucket: "motoapp-80898.appspot.com",
    messagingSenderId: "142119301334",
    appId: "1:142119301334:web:b7efb6b14f52dd5bdad977",
    measurementId: "G-KWSH68F16Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
// abaixo responsavel por exportar dentro do objeto a autenticação para o uso

  const db = firebase.firestore();
  export default{
      db, firebase, auth
  }
