// import { useCallback, useState } from 'react'

// import './App.css'

// function App() {
//   const [length,setLength] = useState(8)
//   const [numbersAllowed, SetNumbersAllowed] = useState(false)
//   const [characterAllowed,SetCharacterAllowed] = useState(false) 
//   const [password,SetPassword] = useState('')

// const passwordGenetator = useCallback(()=>{
//   let pass = '';
//   let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

//   if(numbersAllowed) str+='0123456789'
//   if(characterAllowed) str += '~!@#$%^&*()?/|":'

//   for (let i = 1; i <= array.length; i++) {
//     let char =Math.floor(Math.random() * str.length + 1) 
//     pass = str.charAt(char)
    
//   }

//   SetPassword(pass)
 
// },[length,numbersAllowed,characterAllowed,SetPassword])

//   }

//   return (
//     <>
//       <div className=' w-full max-w-md max-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
//         <h1 className=' text-center text-4xl text-white'>PassWord Generator</h1>
//       </div>
        
//     </>
//   )


// export default App

import { useCallback,useState,useEffect,useRef } from "react";

import './App.css'

function App(){
  const [length,setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed,setCharacterAllowed] = useState(false)
  const [password,setPassword] = useState("")
  

  const passwordRef = useRef(null)



  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv'
    
    if(numberAllowed) str+= '0123456789'
    if(characterAllowed) str+= "~!@#$%^&*()_+{}?/>.<>"

    for (let i= 0; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char)

    }

    setPassword(pass)
  },
  [length,numberAllowed,characterAllowed,setPassword])

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  const copytoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  },[password])

 



  return(
    <>
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg text-orange-500 bg-slate-600 my-8 py-3 px-4">
      <h1 className=" text-center text-3xl text-white my-3">Password Generator</h1>
      <div className=" flex shadow rounded-lg overflow-hidden mb-4 mt-3">
        <input
         type="text" 
         ref={passwordRef}
         value={password}
         className=' outline-none w-full py-1 px-3'
         placeholder="password"
         readOnly
        />

        <button
        onClick={copytoClipboard} 
        className=" outline-none bg-blue-800 text-white py-0.5 px-3 shrink-0"
        >Copy</button>
  
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
           type="range"
           min={6}
           max={50}
           value={length}
           className=" cursor-pointer"
           onChange={(e)=>{setLength(e.target.value)}}
          />
          <label htmlFor="">Length:{length}</label>
        </div>
        <div className="flex text-sm gap-x-2">
          <input
           type="checkbox"
           defaultChecked ={numberAllowed} 
           id="numberInput"
           onChange={()=>{
            setNumberAllowed((prev) => !prev)
           }}
            />
            <label htmlFor="numberInput">Numbers</label>

        </div>
         <div className="flex text-sm gap-x-2">
          <input
           type="checkbox"
           defaultChecked ={characterAllowed} 
           id="charInput"
           onChange={()=>{
            setCharacterAllowed((prev) => !prev)
           }}
            />
            <label htmlFor="charInput">Character</label>

        </div>
        
      </div>
    </div>
    
    </>
  )
}
export default App

