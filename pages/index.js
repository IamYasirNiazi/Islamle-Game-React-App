import Game from '@/components/Game'
import Navbar from '@/components/Navbar'
import { useState } from 'react'


const index = () => {
   
  const [mode, setMode] = useState('dark');


  return (
    <div>
      <Navbar mode={mode} setMode={setMode} />
      <Game mode={mode} />
    </div>
  )
}

export default index