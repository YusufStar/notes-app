import { useState } from "react";
import Home from "./pages/Home";
import { auth } from "./firebase/firebase-seed";
import { onAuthStateChanged } from "firebase/auth"
import LoginPage from "./pages/LoginPage"

function App() {

  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if(user) {
      const uid = user.uid
    } else {

    }
  })
  
  const [login, Setlogin] = useState(false)
  
  return (
    <div className="overflow-hidden flex h-screen justify-center bg-[#23242a]">
      {/* if login LoginPage Or HomePage */}
      {login ? <Home user={user} Setlogin={Setlogin} login={login}/>:<LoginPage Setlogin={Setlogin}/>}
    </div>
  );
}

export default App;
