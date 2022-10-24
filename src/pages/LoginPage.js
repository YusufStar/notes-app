import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { database, auth } from "../firebase/firebase-seed"
import { set, ref, update } from "firebase/database"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

function LoginPage({Setlogin}) {

  const [register, Setregister] = useState(false)
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")

  const successtoast = message => {
    toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  }

  const warningtoast = message => {
    toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  }
  
  const errortoast = message => {
    toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  }
  
  function createUser(e) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      const user = userCredential.user

      set(ref(database, 'users/' + user.uid), {
        username: email,
        email: email
      })

      set(ref(database, `notes/` + user.uid), {
        notes: [
          {
          noteName:"Hello",
          noteText:"Hello User, Welcome NotesApp"
          }
      ]
      })

      successtoast('user created!')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message
      errortoast(errorMessage)
    })
  }

  function loginUser(e) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user

      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      })
      successtoast('Login successful')
      setTimeout(() => {
        Setlogin(true)
      }, 1000)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      errortoast(errorMessage)
    })
  }

  function logOut(e) {
    signOut(auth).then(() => {
      warningtoast('Loged Out')
      setTimeout(() => {
        Setlogin(false)
      }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      errortoast(errorMessage)
    })
  }

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="dark"
    />
    <div className={`mt-[15%] overflow-hidden relative w-[380px] h-[420px] rounded-[8px] bg-[#1c1c1c] before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%] custom-linear-gradient`}>
      <div className="absolute inset-[2px] rounded-[8px] bg-[#28292d] z-[10] form flex flex-col">
        <h2 className='text-[#45f3ff] text-2xl font-[500] text-center tracking-[0.1em]'>Sign in</h2>
        <div className="relative w-[300px] mt-[35px] inputbox">
          <input type="text" required="required" className='relative w-[100%] inputbox-input bg-transparent outline-none text-[#23242a] font-[1em] tracking-[0.05em]' onChange={(e) => SetEmail(e.target.value)}/>
          <span className='absolute left-0 inputbox-span font-[1em] text-[#8f8f8f] tracking-[0.05em]'>Email</span>
          <i className='absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#45f3ff] rounded-[4px]'></i>
        </div>
        <div className="relative w-[300px] mt-[35px] inputbox">
          <input type="password" required="required" className='relative w-[100%] inputbox-input bg-transparent outline-none text-[#23242a] font-[1em] tracking-[0.05em]' onChange={(e) => SetPassword(e.target.value)}/>
          <span className='absolute left-0 inputbox-span font-[1em] text-[#8f8f8f] tracking-[0.05em]'>Password</span>
          <i className='absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#45f3ff] rounded-[4px]'></i>
        </div>
          <div className="flex justify-between">
            <a className='links-a font-[0.75em] decoration-none text-[#8f8f8f]' href="">Forgot Password</a>
            <a className='links-a font-[0.75em] decoration-none text-[#8f8f8f]' onClick={() => Setregister(!register)}>{register ? "Log in":"Sign Up"}</a>
          </div>
        <input 
        onClick={(e) => {
          if(register) {
            createUser(e)
          } else {
            loginUser(e)
          }
        }}
        className='border-none outline-none bg-[#45f3ff] custom-input w-[100px] mt-[10px] rounded-[4px] font-[600] cursor-pointer' type="submit" value={register ? "Register":"Login"}/>
      </div>
    </div>
    </>
  )
}

export default LoginPage;