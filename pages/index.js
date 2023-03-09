// import Game from '@/components/Game'
// import Navbar from '@/components/Navbar'
import { useState } from 'react'
import Main from'@/components/Main'

const index = () => {
   
  // const [mode, setMode] = useState('dark');


   
  // const toggleMode = ()=>{

  //   if(mode=='light'){
  //     document.body.classList.remove('light-mode');
  //     setMode('dark');
  //   }else{
  //     document.body.classList.add('light-mode');
  //     setMode('light');
  //   }
  // }


  return (
    <div>
      <Main />
      {/* <Navbar mode={mode} setMode={setMode} toggleMode={toggleMode} />
      <Game mode={mode} /> */}
    </div>
  )
}

export default index