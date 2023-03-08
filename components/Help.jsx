import React from 'react';
import {AiOutlineClose} from 'react-icons/ai'

const Help = ({sethelpOpen, mode}) => {

  // const {mode} = props;

  return (
    <>
    
        <div style={{backgroundColor: '#fff', color: '#222'}} className='flex flex-col items-center md:p-5 p-4 gap-4 shadow-lg z-[100] w-[280px] sm:w-[350px] md:w-[500px] md:w-96 h-auto md:h-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[.6rem]'>
            <AiOutlineClose onClick={() => sethelpOpen(false)} className='fixed right-2 top-3 hover:cursor-pointer' size={20} />
            <h1 className='text-[1.3rem] md:text-2xl font-bold text-center mt-2'>How to Play?</h1>
            <p className='text-sm sm:text-sm md:text-lg '>
            The Islamle game involves guessing an Islamic word by viewing corresponding emojis and typing one letter that includes the word. Players have 8 attempts to guess the word, then the answer is revealed. For example, 🕋 and 🐪 might represent the word &quot;Makkah&quot; and the hint letter could be &quot;M&quot;. A new word is revealed every 24 hours.
            </p>
            <button  style={{background: 'linear-gradient(140deg, #8206af, #CC2DCF)', color: '#fff'}} onClick={() => sethelpOpen(false)} className='text-sm md:text-lg mt-0 pt-1 py-1 px-3 rounded-sm w-fit rounded '>Ready to play</button>
        </div>
        <div onClick={() => sethelpOpen(false)} className="w-screen h-screen fixed z-40 bg-[#000] opacity-80 left-0 top-0 p-6" />

    </>
  );
};



export async function getStaticProps() {

  return {
    props: {
      mode,
    },
  }
}



export default Help;
