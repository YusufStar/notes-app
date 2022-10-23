import React from 'react'

function Home({user}) {
  
  console.log("Home Page Loaded");
  return (
    <div>{user.uid}</div>
  )
}

export default Home