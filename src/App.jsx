import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLendth] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false );
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // user ref
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let code = "ABCDEFGDIJKMNOPURSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let pass = "";

    if(numberAllowed) {
      code += "0123456789";
    }

    if(charAllowed) {
      code += "~`!@#$%^&*";
    }

    for(let i = 1; i <= length; i++) {
      pass += code.charAt(Math.floor(Math.random()*code.length) + 1);
    }

    setPassword(pass);
    
  }, [length, numberAllowed, charAllowed, setLendth])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

 
     
  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    // console.log(passwordRef)
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password] )

  return (
    <>
      <div className=' m-[0px_10px] '> 
        <div className='max-w-2xl bg-gray-700  rounded-md p-[10px_15px] mt-5 m-auto ' >
          <h1 className='text-center sm:text-2xl text-[20px] text-white'>Paasword Generator</h1>

          <div className='mt-5 max-w-[550px] m-auto' >
            <input type="text" 
             readOnly

             className='rounded-tl-md rounded-bl-md p-[4px_4px] sm:p-[4px_8px] outline-none w-[80%]'
             value={password}
             ref={passwordRef}
             placeholder='Password'
             
            />
            <button onClick={handleCopy} className='text-white w-[20%] bg-blue-800 p-[4px_8px] rounded-tr-md rounded-br-md hover:bg-blue-950'>Copy</button>
          </div>

          <div className='flex flex-col text-white gap-5 mt-10 max-w-[550px] m-auto'>

            <div>
              <input type="range" 
              min={6}
              max={100}
              value={length}
              className='w-[80%]'
              onChange={(e) => {setLendth(e.target.value)}}
              />
              <span className='text-xl ml-4'>{length}</span>
            </div>

            <div >
              <input 
              type="checkbox" 
              name="" id="numberinput" 
              defaultChecked = {numberAllowed} 
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              />
              
              <label htmlFor="numberinput" className='cursor-pointer text-xl ml-4'>Number</label>
            </div>
            <div>
              <input type="checkbox" name="" id="charactor" 
              defaultChecked = {charAllowed} 
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
              />
              <label htmlFor="charactor" className='cursor-pointer text-xl ml-4' >Charactor</label>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
