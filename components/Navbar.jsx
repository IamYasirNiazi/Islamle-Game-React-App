import Image from 'next/image'
import Help from '@/components/Help'
import React, { useRef, useState } from 'react'

const Navbar = ({mode, setMode}) => {

  const [helpOpen, sethelpOpen] = useState(false)

  // const {mode, setMode} = props;

  
  
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
    <div style={{color: mode==='light'? '#222222f5' : '#fffffffb', background: mode==='light'? '#3535350a' : '#0bedf948', boxShadow:'0px 1px 6px .3px #000'}} className='w-100 flex justify-between items-center px-5 py-4'>
        
        <div className='flex gap-[.4rem] sm:gap-2 items-center cursor-pointer'>
          <Image alt="logo" src={'/logo3.webp'} className="rounded-lg" width={35} height={35} />
          <h1 className='text-white font-bold md:text-2xl text-[1.4rem] uppercase' style={{color: mode==='light'? '#222' : '#fff'}}>Islamle</h1>
        </div>
        <div className='flex gap-[.4rem] sm:gap-2 items-center cursor-pointer'>

          <button style={{background: mode=='light'? 'linear-gradient(140deg, #8206af, #CC2DCF)' : '#fff', color: mode=='light'? '#fffffffb' : '#222222'}} onClick={() => sethelpOpen(!helpOpen)} className='px-2 py-1 sm:px-3 sm:py-[.4rem] rounded-[.3rem] flex items-center gap-2'>
          <i className="ri-question-line"></i>
              <span className='text-[.7rem] sm:text-[.8rem]'>How to play?</span>
            </button>
          {(mode=='light') && <i className="ri-moon-fill text-[1.3rem] text-black" onClick={toggleMode}></i>}
          {(mode=='dark') && <i className="ri-sun-line text-[1.3rem] text-white" onClick={toggleMode}></i>}
  
        {helpOpen && <Help sethelpOpen={sethelpOpen} mode={mode} />}
        </div>
    </div>
  )
}



export async function getStaticProps() {

  return {
    props: {
      mode, setMode,
    },
  }
}



export default Navbar