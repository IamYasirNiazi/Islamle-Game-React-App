import Game from '@/components/Game'
import Navbar from '@/components/Navbar'
import { useState } from 'react'


const Main = () => {
   
  const [mode, setMode] = useState('dark');


   
  const toggleMode = ()=>{

    if(mode=='light'){
      document.body.classList.remove('light-mode');
      setMode('dark');
    }else{
      document.body.classList.add('light-mode');
      setMode('light');
    }
  }


  return (
    <div>
      <Navbar mode={mode} setMode={setMode} toggleMode={toggleMode} />
      <Game mode={mode} />
    </div>
  )
}

export default Main