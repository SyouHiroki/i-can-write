import HandWriter from "@/components/HandWriter"
import { InputtoolsReqType, InputtoolsResType } from "./api/inputtools"
import { useState } from "react"
import useWindowSize from "@/hooks/useWindowSize"

export default function Home() {
  const [text, setText] = useState<string[]>([])
  const {width: windowWidth} = useWindowSize()

  const handler = async (trace: number[][][], canvasWidth?: number, canvasHeight?: number) => {
    const arg: InputtoolsReqType = {
      trace: trace,
      lang: 'zh-Hans',
      canvasHeight: canvasWidth || 500,
      canvasWidth: canvasHeight || 500
    }

    try {
      const ret: InputtoolsResType = await (await fetch('/api/inputtools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg)
      })).json()

      setText(ret.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-screen h-screen" >
      <div className="flex flex-col items-center">
        <HandWriter handler={handler} brushWidth={10} height={300} width={windowWidth - 50} debug />
        <div>{text.map(item => ' ' + item + ' ')}</div>
      </div>
    </div>
  )
}


