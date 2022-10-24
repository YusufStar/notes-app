import React, { useEffect, useState } from 'react'
import { ref, child, get, set } from "firebase/database";
import { database } from "../firebase/firebase-seed"

function NoteContent({user, text, Settext, getText, i, selectedText}) {

    function HandleSubmit() {
        set(ref(database, 'notes/' + user.uid + '/notes/' + i),
            {
                noteName: selectedText,
                noteText: text
            }
        )
        getText(i)
    }

  return (
    <div className={`w-[85%] h-[91%] mr-5 mb-3 flex flex-col items-center border-[1px] border-[#45f3ff]/20`}>
        <textarea onChange={(e) => Settext(e.target.value)} aria-disabled className='w-[100%] h-[90%] bg-transparent border-b-[1px] border-b-[#45f3ff]/50 outline-none resize-none text-white' value={text}></textarea>
        <div className="w-[100%] h-[10%] flex flex-row items-center justify-center">
            <button onClick={() => HandleSubmit()} className='mr-5 w-[10%] h-[75%] hover:bg-[#45f3ff]/20 active:scale-95 transition-colors duration-300 bg-[#45f3ff]/50 rounded-full text-white'>Save</button>
        </div>
    </div>
  )
}

export default NoteContent