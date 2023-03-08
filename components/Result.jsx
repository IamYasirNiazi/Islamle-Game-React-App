import Image from 'next/image'
import React, { useState } from 'react'
import {RxCopy} from 'react-icons/rx'
import { words } from '@/wordlist'

const Result = ({isCorrect, hours, minutes, seconds, timeRemaining, currentWord }) => {
    const [showNotification, setShowNotification] = useState(false);


    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText("Isamle 🟦🟦🟦🟦🟦🟦🟦🟦 Play here: https://islamle.vercel.app");
          setShowNotification(true);
          const id = setTimeout(() => setShowNotification(false), 3000);
          return () => clearTimeout(id);
        } catch (error) {
          console.error("Failed to copy text: ", error);
        }
    }

  return (
    <>
      <div className={`w-[280px] sm:w-[350px] md:w-[500px] gap-3 md:gap-3 md:text-lg px-3 py-5 md:p-6 flex flex-col items-center bg-gray-900 shadow-lg text-white border-[.125rem] md:border-[.2rem] ${isCorrect ? "border-green-600" : "border-red-600"} absolute z-[110]`}>
              <p className='font-semibold sm:text-[1.2rem] md:text-[1.4rem]'>{isCorrect ? 'MashaAllah Good Job, the word was' : 'The correct word was'} '{words[currentWord]?.text}'</p>
              {/* <div className='w-[300px] shadow-lg bg-gray-800 p-2 gap-5'>
                <div className='flex justify-between'>
                  <p>Isamle</p>
                  <p onClick={handleCopy} className='flex items-center justify-center gap-2 hover:text-cyan-400 hover:cursor-pointer'>Copy <RxCopy className='mt-1' /></p>
                </div>
                <div>🟦🟦🟦🟦🟦🟦🟦🟦</div>
                <p>Play here: <span className='underline decoration-cyan-400'>https://islamle.vercel.app</span></p>
              </div> */}
              {timeRemaining !== null ? <div className='flex flex-col items-center justify-center md:gap-1'>New word appear in <p className='text-[1.5rem] font-semibold sm:text-[1.8rem] md:text-[2rem] md:font-semibold tracking-wide'>{hours}:{minutes}:{seconds}</p></div> : <p>Loading...</p> }
              <div className='flex gap-4'>
                <div className='flex flex-col items-center'><p>Played</p> <p>1</p></div>
                <div className='flex flex-col items-center'><p>Succes Rate</p> <p>0%</p></div>
              </div>
              <div className='flex items-center gap-2 sm:gap-3 md:gap-5'>
                <h2>Follow us on: </h2>
                <span className='flex gap-[.4rem] sm:gap-2 md:gap-3'>
                  <Image className='cursor-pointer object-contain w-[20px]' width={25} height={25} alt="fb" src={'/fb.png'} />
                  <Image className='cursor-pointer object-contain w-[20px]' width={25} height={25} alt="in" src={'/in.png'} />
                  <Image className='cursor-pointer object-contain w-[20px]' width={25} height={25} alt="tw" src={'/tw.png'} />
                  <Image className='cursor-pointer object-contain w-[20px]' width={25} height={25} alt="tk" src={'/tk.png'} />
                </span>

              </div>
              {showNotification && (
                  <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg animate-slide-in-down">
                  <span>Text copied to clipboard!</span>
                  </div>
              )}
      </div>
      <div className="w-screen h-screen fixed z-40 bg-[#000] opacity-80 left-0 top-0 p-6" />
    </>
  )
}

export default Result