import { ref, set, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md"
import { database } from '../firebase/firebase-seed'

function LeftBar({user, notesData, getData}) {
  const [inputRef, SetInpurRef] = useState("")

  function addNote() {
    set(ref(database, 'notes/' + user.uid), {
      notes: 
      [...notesData, 
        {
          "noteName": inputRef
        }
      ]
    })
    console.log(inputRef)
    getData()
  }

  return (
    <div className='w-[100%] flex flex-row'>
        <div className="w-[250px] flex flex-col">
            <h1 className='text-center text-[#45f3ff] text-4xl mt-2'>Notes</h1>
            <div className="h-[100%] flex flex-col items-center">
                <div className="w-[100%] mt-5 flex flex-row gap-2 justify-center items-center">
                    <input onChange={(e) => SetInpurRef(e.target.value)} type="text" className='ml-3 w-[80%] outline-none bg-transparent border-b-[1px] border-b-[#45f3ff] text-[#45f3ff] placeholder:text-white' placeholder='Search Or Add Notes'/>
                    <MdAdd onClick={() => addNote()} color='#45f3ff' className="cursor-pointer w-[25px] h-[25px] active:scale"/>
                </div>
                <div className="w-[90%] mt-5 gap-3 flex flex-col itesm-center">
                  {notesData
                  .filter((note)=> {
                    if(note.noteName == "") {
                      return note
                    } else if(note.noteName.toLowerCase().includes(inputRef.toLowerCase())) {
                      return note
                    }
                  })
                  .map((note) => (
                    <h1 key={note.noteName} className='text-base text-white cursor-pointer p-1 rounded-lg bg-[#45f3ff]/70 hover:scale-95 hover:bg-[#45f3ff]/50 transition-all duration-200'>{note.noteName}</h1>
                  ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default LeftBar