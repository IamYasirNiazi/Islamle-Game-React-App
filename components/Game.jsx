import { words } from '@/wordlist'
import React, { useEffect, useState } from 'react'
import {BiHelpCircle} from 'react-icons/bi'
// import Help from '@/components/Help'
import ReactConfetti from 'react-confetti'
import Result from './Result'
import { generateNextWord } from '@/utils/generateNextWord'
import { useCount } from '@/hooks/useCount'
import { getCurrentWord } from '@/utils/GetCurrentWord'
import ParticlesBackground from './ParticlesBackground'
import Typed from "react-typed"
import Image from 'next/image'
import img from '../public/images/1234.png'
import lamp from '../public/images/1.png'
import lampLight from '../public/images/1Light.png'
import moon from '../public/images/moon.png'
import moonLight from '../public/images/moonLight.png'
import {motion} from 'framer-motion'

const Game = ({mode}) => {


  // const {mode} = props;
  // const [helpOpen, sethelpOpen] = useState(false)

  // For transition
    // const transition = { type: 'spring', duration: '3' }

  // var mobile;
  
  const [guess, setguess] = useState("")
  const [color, setcolor] = useState()
  const [gamestat, setgameStat] = useState()
  const [showConfetti, setshowConfetti] = useState(false)
  const isFinished = gamestat && (gamestat[0]?.gameState === "failed" || gamestat[0]?.gameState === "correct");
  const { timeRemaining, hours, minutes, seconds, } = useCount(isFinished)
  const currentWord = getCurrentWord()
  const isCorrect = gamestat && gamestat[0]?.guesses?.includes(words[currentWord]?.text?.toLowerCase())

  const handleShowConfetti =  () => {
    setshowConfetti(true);
    const id = setTimeout(() => setshowConfetti(false), 10000);
    return () => clearTimeout(id);
  }

  useEffect(() => {
    // mobile = window.innerWidth<768? true : false;
    const gamestats = localStorage.getItem("islamleHistory")
    setgameStat(JSON.parse(gamestats))
  },[])


  const handleGuess = async () => {
    if (guess === "" || !guess)  return alert("guess cant be empty");
    const islamleHistory = localStorage.getItem("islamleHistory");
    if (islamleHistory) {
      const islamleHistoryOject = JSON.parse(islamleHistory);
      const gamestate = islamleHistoryOject[0]?.gameState
      if (gamestate === "failed" || gamestate === "correct") return;
      const todayWord = words[currentWord]?.text;
      const guesses = islamleHistoryOject[0]?.guesses;
      if(guesses?.includes(guess)) return;
      if (todayWord?.toLowerCase() === guess?.toLowerCase()) {
        islamleHistoryOject[0].guesses.push(guess);
        islamleHistoryOject[0].gameState = "correct";
        setcolor("green")
        await generateNextWord()
        handleShowConfetti()
      } else if(islamleHistoryOject[0]?.guesses?.length === 7) {
        islamleHistoryOject[0].guesses.push(guess);
        islamleHistoryOject[0].gameState = "failed";
        setcolor("red")
        await generateNextWord()
      }
      else {
        islamleHistoryOject[0].guesses.push(guess);
        setcolor("red")
      }
      localStorage.setItem("islamleHistory", JSON.stringify(islamleHistoryOject));
      setgameStat(islamleHistoryOject)
      setguess("")
      return;
    } 

    if(guess.toLowerCase() === (words[currentWord]?.text?.toLowerCase())) {
      localStorage.setItem("islamleHistory", JSON.stringify([{ gameState: "correct", guesses: [guess] }]));
      setcolor("green")
      setgameStat([{ gameState: "correct", guesses: [guess] }])
      setguess("")
      await generateNextWord()
      handleShowConfetti()
    }
    else {
      localStorage.setItem("islamleHistory", JSON.stringify([{ gameState: "going", guesses: [guess] }]));
      setcolor("red")
      setguess("")
      setgameStat([{ gameState: "going", guesses: [guess] }])
    }
  };

  return (
        <div className='p-4 flex gap-4 sm:gap-5 flex-col items-center justify-center relative mt-[-1.7rem] md:mt-0' > 
          <ParticlesBackground/>


          <Image
          src={lamp} alt="" className='hidden sm:inline-block z-[-10] absolute sm:top-[1.5rem] sm:left-[1.5rem] sm:w-[70px] md:top-[-.2rem] md:left-[4rem] md:w-[100px] lamp-animate' />
          
          <Image src={moon} alt="" className='hidden sm:inline-block fixed z-[-10] sm:top-[15rem] sm:right-[1.3rem] sm:w-[100px] md:top-[18rem] md:right-[8rem] md:w-[170px] moon-animate' />
          
          {mode=='light' && <Image src={lampLight} alt="" className='hidden sm:inline-block z-[-10] absolute sm:top-[1.5rem] sm:left-[1.5rem] sm:w-[70px] md:top-[-.2rem] md:left-[4rem] md:w-[100px] lamp-animate' />}
          
          {mode=='light' && <Image src={moonLight} alt="" className='hidden sm:inline-block fixed z-[-10] sm:top-[15rem] sm:right-[1.3rem] sm:w-[100px] md:top-[18rem] md:right-[8rem] md:w-[170px] moon-animate'/>}

          <Image src={img} alt="" className='fixed bottom-0 z-[-100] object-cover h-[550px] md:h-[auto]' />

         {showConfetti && <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
          } 
        {isFinished && <Result currentWord={currentWord} timeRemaining={timeRemaining} hours={hours} minutes={minutes} seconds={seconds} isFinished={isFinished} isCorrect={isCorrect } />}
        
        <h1 className='p-3 text-[1.95rem] sm:text-[2.4rem] md:text-[2.6rem] font-bold' style={{color: mode=='light'? '#222222' : '#fffffffb'}}>
          Guess the Word by <Typed
          strings={[
              "emojis.",
              "letter.",
          ]}
          typeSpeed={80}
          backSpeed={20}
          loop/>
        </h1>

        <span>

          <span className='text-[1.05rem] sm:text-[1.1rem] md:text-xl capitalize pt-1 pb-2 px-4 rounded' style={{background: mode=='light'? '#3535351e' : 'linear-gradient(140deg, rgba(130, 6, 175, 0.6), rgba(204, 45, 207, 0.7))', color: mode=='light'? '#222222' : '#fff'}}>Word includes &apos;{words[currentWord]?.text[2]}&apos;</span>

          <span className='text-[1.05rem] sm:text-[1.1rem] capitalize pt-1 pb-2 px-4 rounded ml-2' style={{background: mode=='light'? '#3535351e' : 'linear-gradient(140deg, rgba(130, 6, 175, 0.6), rgba(204, 45, 207, 0.7))', color: mode=='light'? '#222222' : '#fff'}}>Hint {words[currentWord]?.hint}</span>

        </span>

        <div className='flex justify-center'>

          <div style={{background: mode=='light'? '#35353520' : '#ffffff46', color: mode=='light'? '#fffffffb' : '#fffffffb' }} className={`flex border-2 ${color === "green"? "animate-jump" : color === "red" ? "animate-shake" : ''} mt-3 border-none w-[280px] sm:w-[400px] md:w-[550px] text-lg rounded`}>
            <input style={{background: 'none'}} onKeyDown={(e) => e.key === "Enter" && handleGuess()} disabled={isFinished} onChange={(e) => setguess(e.target.value)} required value={guess} minLength={2} maxLength={10} className='disabled:cursor-not-allowed outline-none bg-none border-none text-[.9rem] sm:text-[1.12rem] w-[175px] sm:w-[auto] flex-1 p-2' placeholder='Enter Word i.e. "makah"' />
            <button  
            disabled={isFinished || !guess || guess == ""}
            onClick={handleGuess} className='disabled:cursor-not-allowed px-8 py-1 rounded' style={{background: mode=='light'? 'linear-gradient(140deg, #8206af, #CC2DCF)' : 'linear-gradient(140deg, #8206af, #CC2DCF)', color: mode=='light'? '#fff' : '#fff' }}>Guess</button>          
          </div>
        
        </div>


        {gamestat?.length > 0 && (

          <div className='w-[285px] sm:w-[400px] md:w-[550px] rounded shadow-lg' style={{background: mode=='light'? '#ffffffd9' : '#ffffffc5'}}>
            <p className='text-end pt-3 pr-4 font-semibold text-[.85rem] sm:text-[.95rem] md:text-[1rem]' style={{color: mode=='light'? '#222' : '#222'}}>
              {`Attempts Availed: ${gamestat[0]?.guesses?.length}/8`}
              </p>
            {gamestat[0]?.guesses?.map((item, index) => (
              <div key={item} className="flex gap-5 p-3 text-lg font-semibold">

                <p style={{color: mode=='light'? '#222222d8' : '#222222d8'}} className='text-[.85rem] sm:text-[.95rem] md:text-[1rem]'>{index + 1 + "."} </p>

                <p style={{color: mode=='light'? '#222222ef' : '#222222ef'}} className={`capitalize w-fit text-[.85rem] sm:text-[.95rem] md:text-[1rem]`}>{item}</p>

                <span>{ words[currentWord]?.text?.toLowerCase() === item.toLowerCase() ? <i class="ri-check-fill text-[green]"></i> : <i class="ri-close-line text-[red] text-[.85rem] sm:text-[.95rem] md:text-[1rem]"></i>}</span>
              </div>
            ))}
          </div>

        )
        }
      {/* {helpOpen && <Help sethelpOpen={sethelpOpen} />} */}
    </div>
  )
}



export async function getStaticProps() {

  return {
    props: {
      mode,
    },
  }
}



export default Game