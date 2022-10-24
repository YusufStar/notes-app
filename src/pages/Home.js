import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { database } from "../firebase/firebase-seed"
import { ref, child, get } from "firebase/database";
import { signOut } from "firebase/auth"
import {auth} from "../firebase/firebase-seed"
import LeftBar from '../Components/LeftBar';
import NoteContent from '../Components/NoteContent';

function Home({user, Setlogin, login}) {
  const [selectedText, setselectedText] = useState('')
  const [data, setdata] = useState([])
  const [SelectedNote, setSelectedNote] = useState(0)
  const [text, Settext] = useState('')

  function getText(i) {
      const dbRef = ref(database);
        get(child(dbRef, `notes/${user.uid}/notes`)).then((snapshot) => {
          if (snapshot.exists()) {
            Settext(snapshot.val()[i].noteText)     
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
  }

  function getData() {
    const dbRef = ref(database);
      get(child(dbRef, `notes/${user.uid}/notes`)).then((snapshot) => {
        if (snapshot.exists()) {
          setdata(snapshot.val())      
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getData()
  }, [])

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
      <LeftBar SetSelectedNote={setSelectedNote} user={user} getText={getText} notesData={data} getData={getData} logOut={logOut} setselectedText={setselectedText}/>
      <NoteContent user={user} text={text} Settext={Settext} getText={getText} i={SelectedNote} selectedText={selectedText}/>
    </>
  )
}

export default Home