import * as fabric from 'fabric'
import React, { useEffect, useRef } from 'react'

export type HandwriterHandler = (trace: number[][][], canvasWidth?: number, canvasHeight?: number) => void

export const Handwriter: React.FC<{
  width?: number
  height?: number
  brushColor?: string
  brushWidth?: number
  resTime?: number
  debug?: boolean
  auxiliaryLine?: boolean
  handler?: HandwriterHandler
}> = props => {
  const isDrawing = useRef<boolean>(false)
  const handwritingCanvasRef = useRef<HTMLCanvasElement>(null)
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const timer = useRef<NodeJS.Timeout>()

  const drawDashedLine = (x1: number, y1: number, x2: number, y2: number, canvas: fabric.Canvas) => {
    const line = new fabric.Line([x1, y1, x2, y2], {
      stroke: '#7c7c7c',
      strokeWidth: 1,
      strokeDashArray: [5, 5], 
      selectable: false 
    })
    canvas.add(line)
  }

  useEffect(() => {
    if (!handwritingCanvasRef.current || !bgCanvasRef.current) return

    const handwritingCanvas = new fabric.Canvas(handwritingCanvasRef.current)
    const bgCanvas = new fabric.Canvas(bgCanvasRef.current)
    let trace: number[][][] = []
    let currentStroke: number[][] = [[], []]

    const parent = handwritingCanvasRef.current.parentElement?.parentElement
    const currWidth = props.width || parent?.clientWidth || 500
    const currHeight = props.height || parent?.clientHeight || 500

    handwritingCanvas.setDimensions({
      width: currWidth,
      height: currHeight
    })

    bgCanvas.setDimensions({
      width: currWidth,
      height: currHeight
    })

    handwritingCanvas.isDrawingMode = true
    const pencilBrush = new fabric.PencilBrush(handwritingCanvas)
    pencilBrush.color = props.brushColor || 'black'
    pencilBrush.width = props.brushWidth || 10
    handwritingCanvas.freeDrawingBrush = pencilBrush

    // drawDashedLine(0, 0, currWidth, currHeight, bgCanvas)
    // drawDashedLine(currWidth, 0, 0, currHeight, bgCanvas)
    // drawDashedLine(0, currHeight / 2, currWidth, currHeight / 2, bgCanvas)
    // drawDashedLine(currWidth / 2, 0, currWidth / 2, currHeight, bgCanvas)

    drawDashedLine(currWidth - currWidth * 0.95, currHeight / 2, currWidth * 0.95, currHeight / 2, bgCanvas)
    drawDashedLine(currWidth / 2, currHeight - currHeight * 0.95, currWidth / 2, currHeight * 0.95, bgCanvas)

    handwritingCanvas.on('mouse:down', () => {
      clearTimeout(timer.current)
      isDrawing.current = true
      currentStroke = [[], []]
    })

    handwritingCanvas.on('mouse:move', (event) => {
      if (!isDrawing) return

      const pointer = handwritingCanvas.getPointer(event.e)
      const x = pointer.x
      const y = pointer.y

      currentStroke[0].push(x)
      currentStroke[1].push(y)
    })

    handwritingCanvas.on('mouse:up', () => {
      isDrawing.current = false
      trace.push(currentStroke)

      timer.current = setTimeout(() => {
        props.handler ? 
        (() => {
          props.debug && console.log('trace:', trace)
          props.handler(trace, currWidth, currHeight)
          trace = []
        })() 
        :
        console.log('trace:', trace)

        trace = []
        handwritingCanvas.clear()
      }, props.resTime || 500)
    })

    return () => {
      handwritingCanvas.dispose()
      bgCanvas.dispose()
    }
  }, [props])

  return (
    <div style={{height: props.height, width: props.width, overflow: 'hidden', position: 'relative'}} className='bg-[#f9f9f9]'>
      <div style={{height: props.height, width: props.width, visibility: props.auxiliaryLine ? 'visible' : 'hidden'}} className='pointer-events-none absolute top-0 left-0'>
        <canvas ref={bgCanvasRef} className='pointer-events-none'/>
      </div>

      <div style={{height: props.height, width: props.width}}>
        <canvas ref={handwritingCanvasRef} />
      </div>
    </div>
  )
}

export default Handwriter
