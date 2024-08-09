import HandWriter from "@/components/HandWriter"
import { InputtoolsReqType, InputtoolsResType } from "./api/inputtools"
import { useState } from "react"

export default function Home() {
  const [text, setText] = useState<string[]>([])

  const handler = async (trace: number[][][]) => {
    const arg: InputtoolsReqType = {
      trace: trace,
      lang: 'zh-Hans',
      canvasHeight: 500,
      canvasWidth: 700
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
    <div className="w-screen h-screen">
      <div className="w-[700px] h-[500px] border border-solid border-black">
        <HandWriter handler={handler} brushWidth={10}/>
      </div>
      <div>{text.map(item => ' ' + item + ' ')}</div>
    </div>
  )
}


