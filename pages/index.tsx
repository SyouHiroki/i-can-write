import Head from 'next/head'
import { useCallback, useRef, useState } from "react"
import { useWindowInfo } from "@/hooks"
import { recognize } from "@/handlers"
import { Clear, Launch, Stage } from '@/views'
import { LANG, MODE_LIST, STAGE_LIST } from '@/config'

export default function Home() {
  const debug = useRef<boolean>(false)
  const [mode, setMode] = useState<number>(0)
  const [process, setProcess] = useState<number>(0)
  const [handwriterRecognized, setHandwriterRecognized] = useState<string[]>([])
  const [handwriterIsClose, setHandwriterIsClose] = useState<boolean>(false)
  const [currentStage, setCurrentStage] = useState<number>(0)
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0)
  const [currentWordSplit, setCurrentWordSplit] = useState<string>('')
  const [promptIsShow, setPromptIsShow] = useState<boolean>(false) 
  const windowInfo = useWindowInfo()

  const modeSetHandler = useCallback((mode: number) => {
    setHandwriterRecognized([])
    setHandwriterIsClose(false)
    setCurrentStage(0)
    setCurrentCharIndex(0)
    setCurrentWordSplit('')
    setPromptIsShow(false)
    setMode(mode)
    setProcess(1)
  }, [])

  const handwriterIsCloseHandler = useCallback(() => {
    setHandwriterIsClose(preState => !preState)
  }, [])

  const handwriterHandler = useCallback(async (trace: number[][][], canvasWidth?: number, canvasHeight?: number) => {
    const data = await recognize(trace, canvasWidth, canvasHeight, LANG)
    if (!data) return
    setHandwriterRecognized(data)
    if (!data.includes(STAGE_LIST[mode][currentStage].write[currentCharIndex])) return
    if (currentCharIndex + 1 <= STAGE_LIST[mode][currentStage].write.length - 1) {
      setCurrentWordSplit(preState => preState + STAGE_LIST[mode][currentStage].write[currentCharIndex])
      setCurrentCharIndex(preState => preState + 1)
    } else {
      if (currentStage + 1 <= STAGE_LIST[mode].length - 1) {
        setCurrentWordSplit(preState => preState + STAGE_LIST[mode][currentStage].write[currentCharIndex])
        setPromptIsShow(false)
        setTimeout(() => {
          setCurrentCharIndex(0)
          setCurrentWordSplit('')
          setCurrentStage(preState => preState + 1)
        }, 1000)
      } else {
        setProcess(2)
      }
    }
  }, [currentCharIndex, currentStage, mode])

  const promptIsShowHandler = useCallback(() => {
    setPromptIsShow(preState => !preState)
  }, [])

  const resetHandler = useCallback(() => {
    setMode(0)
    setProcess(0)
    setHandwriterRecognized([])
    setHandwriterIsClose(false)
    setCurrentStage(0)
    setCurrentCharIndex(0)
    setCurrentWordSplit('')
    setPromptIsShow(false)
  }, [])

  const replayHandler = useCallback(() => {
    setHandwriterRecognized([])
    setHandwriterIsClose(false)
    setCurrentStage(0)
    setCurrentCharIndex(0)
    setCurrentWordSplit('')
    setPromptIsShow(false)
    setProcess(1)
  }, [])

  return windowInfo.ready && (
    <div className="w-screen h-screen overflow-hidden" >
      <Head><title>Sayu - 早柚</title></Head>

      {process === 0 &&
        <Launch
          modeList={MODE_LIST}
          modeSetHandler={modeSetHandler}
          orientation={windowInfo.orientation}
        />
      }

      {process === 1 &&
        <Stage
          currentStage={currentStage}
          contentHeight={windowInfo.height * 0.6}
          contentWidth={windowInfo.width}
          data={STAGE_LIST[mode]}
          promptIsShow={promptIsShow}
          promptIsShowHandler={promptIsShowHandler}
          orientation={windowInfo.orientation}
          currentWordSplit={currentWordSplit}
          handwriterIsClose={handwriterIsClose}
          handwriterIsCloseHandler={handwriterIsCloseHandler}
          drawerContentHeight={windowInfo.height * 0.4}
          currentChar={STAGE_LIST[mode][currentStage].write[currentCharIndex]}
          handwriterHandler={handwriterHandler}
          handwriterResTime={500}
          debug={debug.current}
        />
      }

      {process === 2 &&
        <Clear
          orientation={windowInfo.orientation}
          exitHandler={resetHandler}
          replayHandler={replayHandler}
        />
      }

      {debug.current && //debug info
        <div className='absolute top-0 right-0 z-[999999] p-[2vw] bg-[rgba(0,0,0,.5)]'>
          debug:
          <div>process: {process}</div>
          <div>mode: {mode}</div>
          <div>handwriterRecognized: {handwriterRecognized?.map(item => ' ' + item + ' ')}</div>
          <div>handwriterIsClose: {handwriterIsClose ? 'true' : 'false'}</div>
          <div>promptIsShow: {promptIsShow ? 'true' : 'false'}</div>
          <div>currentChar: {STAGE_LIST[mode][currentStage].write[currentCharIndex]}</div>
          <div>currentWordSplit: {currentWordSplit}</div>
          <div>currentStage: {currentStage}</div>
          <button onClick={() => process ? setProcess(0) : setProcess(1)}>switch</button>
        </div>
      }

    </div>
  )
}
