import { useState } from "react"
import { HandWriter } from "@/components"
import { useWindowSize } from "@/hooks"
import { recognize } from "@/handlers"

export default function Home() {
  const [text, setText] = useState<string[]>([])
  const {width: windowWidth} = useWindowSize()

  const handler = async (trace: number[][][], canvasWidth?: number, canvasHeight?: number) => {
    const data = await recognize(trace, canvasWidth, canvasHeight)
    data && setText(data)
  }

  return (
    <div className="w-screen h-screen" >
      <div className="flex flex-col items-center">
        <HandWriter handler={handler} brushWidth={10} height={300} width={windowWidth - 50} debug />
        <div>{text?.map(item => ' ' + item + ' ')}</div>
      </div>
    </div>
  )
}


