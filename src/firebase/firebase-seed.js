import { getDatabase } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import "firebase/firestore"
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiea4SgxdHaEivNpX_he-0Zsl5GUSN5K4",
  authDomain: "notes-app-774f7.firebaseapp.com",
  databaseURL: "https://notes-app-774f7-default-rtdb.firebaseio.com",
  projectId: "notes-app-774f7",
  storageBucket: "notes-app-774f7.appspot.com",
  messagingSenderId: "1081607890559",
  appId: "1:1081607890559:web:229d0324ed06f65f73c14a",
  measurementId: "G-BTDZX43QX3"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app);

export { database, auth, app}