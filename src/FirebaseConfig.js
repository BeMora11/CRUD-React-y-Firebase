import firebase from 'firebase/app';
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoiD3c2kCdPJA148e-E_Izuu-B6IlDhmg",
  authDomain: "react-prueba-33fc6.firebaseapp.com",
  projectId: "react-prueba-33fc6",
  storageBucket: "react-prueba-33fc6.appspot.com",
  messagingSenderId: "350348586117",
  appId: "1:350348586117:web:e053409edce2ab105bcdec"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const store = fire.firestore();
export {store};