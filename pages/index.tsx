import Head from 'next/head'
import { useCallback, useState } from "react"
import { useWindowSize } from "@/hooks"
import { recognize } from "@/handlers"
import { Launch, Stage } from '@/views'
import { LANG, MODE_LIST, STAGE_LIST } from '@/config'
import { Drawer, Handwriter } from '@/components'

export default function Home() {
  const debug = true
  const [process, setProcess] = useState<number>(0)
  const [text, setText] = useState<string[]>([])
  const [mode, setMode] = useState<number>(0)
  const [handwriterIsClose, setHandwriterIsClose] = useState<boolean>(false)
  const [currentStage, setCurrentStage] = useState<number>(0)
  const windowSize = useWindowSize()

  const modeSetHandler = useCallback((mode: number) => {
    setMode(mode)
    setProcess(1)
  }, [])

  const handwriterIsCloseHandler = useCallback(() => {
    setHandwriterIsClose(preState => !preState)
  }, [])

  const handwriterHandler = useCallback(async (trace: number[][][], canvasWidth?: number, canvasHeight?: number) => {
    const data = await recognize(trace, canvasWidth, canvasHeight, LANG)
    data && setText(data)
  }, [])

  return (
    <div className="w-screen h-screen overflow-hidden" >
      <Head><title>Sayu - 早柚</title></Head>

      {process === 0 &&
        <Launch
          modeList={MODE_LIST}
          modeSetHandler={modeSetHandler}
        />
      }

      {process === 1 &&
        <>
          <Stage
            current={currentStage}
            contentHeight={windowSize.height * 0.6}
            data={STAGE_LIST[mode]}
          />

          <Drawer
            toggleHandler={handwriterIsCloseHandler}
            isClose={handwriterIsClose}
            contentHeight={windowSize.height * 0.4}
          >
            <Handwriter
              handler={handwriterHandler}
              brushWidth={10}
              height={windowSize.height * 0.4}
              width={windowSize.width}
              auxiliaryLine
              debug={debug}
            /> 
          </Drawer>
        </>
      }

      {debug && //debug info
        <div className='absolute top-0 right-0 z-[99999] p-[2vw] bg-[rgba(0,0,0,.5)]'>
          debug:
          <div>process: {process}</div>
          <div>text: {text?.map(item => ' ' + item + ' ')}</div>
          <div>mode: {mode}</div>
          <div>handwriterIsClose: {handwriterIsClose ? 'true' : 'false'}</div>
          <button onClick={() => process ? setProcess(0) : setProcess(1)}>switch</button>
        </div>
      }

    </div>
  )
}
