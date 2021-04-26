import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "your_API_KEY",
  authDomain: "your_Auth_Domain",
  databaseURL: "your_Database_URL",
  projectId: "your_Project_ID",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_senderId",
  appId: "your_App_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
