import Head from 'next/head'
import { useState } from "react"
import { Handwriter } from "@/components"
import { useWindowSize } from "@/hooks"
import { recognize } from "@/handlers"

export default function Home() {
  const [text, setText] = useState<string[]>([])
  const {width: windowWidth} = useWindowSize()

  const handler = async (trace: number[][][], canvasWidth?: number, canvasHeight?: number) => {
    const data = await recognize(trace, canvasWidth, canvasHeight, 'zh-Hans')
    data && setText(data)
  }

  return (
    <div className="w-screen h-screen overflow-hidden" >
      <Head><title>Sayu - 早柚</title></Head>
      <div className="flex flex-col items-center">
        <Handwriter handler={handler} brushWidth={10} height={300} width={windowWidth - 50} auxiliaryLine />
        <div>{text?.map(item => ' ' + item + ' ')}</div>
      </div>
    </div>
  )
}


