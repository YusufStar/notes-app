import { useState } from "react";
import Home from "./pages/Home";
import { firebaseConfig } from "./firebase/firebase-seed"
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, update } from "firebase/database"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import LoginPage from "./pages/LoginPage"

function App() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)
  const auth = getAuth()

  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if(user) {
      const uid = user.uid
    } else {

    }
  })

  const [login, Setlogin] = useState(false)
  return (
    <div className="overflow-hidden flex h-screen justify-center items-center bg-[#23242a]">
      {/* if login LoginPage Or HomePage */}
      {login ? <Home user={user} login={login}/>:<LoginPage Setlogin={Setlogin} auth={auth}/>}
    </div>
  );
}

export default App;
