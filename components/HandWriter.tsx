import * as fabric from 'fabric'
import React, { useEffect, useRef } from 'react'

export const Handwriter: React.FC<{
  width?: number
  height?: number
  brushColor?: string
  brushWidth?: number
  resTime?: number
  debug?: boolean
  auxiliaryLine?: boolean
  handler?: (trace: number[][][], canvasWidth?: number, canvasHeight?: number) => void
}> = ({
  width,
  height,
  brushColor,
  brushWidth,
  resTime,
  debug,
  auxiliaryLine,
  handler,
}) => {
  const handwritingCanvasRef = useRef<HTMLCanvasElement>(null)
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const timer = useRef<NodeJS.Timeout>()

  const drawDashedLine = (x1: number, y1: number, x2: number, y2: number, canvas: fabric.Canvas) => {
    const line = new fabric.Line([x1, y1, x2, y2], {
      stroke: 'gray',
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
    const parent = handwritingCanvasRef.current.parentElement?.parentElement
    const currWidth = width || parent?.clientWidth || 500
    const currHeight = height || parent?.clientHeight || 500

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
    pencilBrush.color = brushColor || 'black'
    pencilBrush.width = brushWidth || 10
    handwritingCanvas.freeDrawingBrush = pencilBrush

    // drawDashedLine(0, 0, currWidth, currHeight, bgCanvas)
    // drawDashedLine(currWidth, 0, 0, currHeight, bgCanvas)
    // drawDashedLine(0, currHeight / 2, currWidth, currHeight / 2, bgCanvas)
    // drawDashedLine(currWidth / 2, 0, currWidth / 2, currHeight, bgCanvas)

    drawDashedLine(currWidth - currWidth * 0.95, currHeight / 2, currWidth * 0.95, currHeight / 2, bgCanvas)
    drawDashedLine(currWidth / 2, currHeight - currHeight * 0.95, currWidth / 2, currHeight * 0.95, bgCanvas)

    handwritingCanvas.on('path:created', (event) => {
      const path = event.path as fabric.Path;
      const pathData = path.path

      const xCoords: number[] = []
      const yCoords: number[] = []

      pathData.forEach((item) => {
        if (item.length >= 3) {
          const [cmd, x, y] = item as [string, number, number]
          if (cmd === 'M' || cmd === 'L') {
            xCoords.push(x)
            yCoords.push(y)
          }
        }
      })

      trace.push([xCoords, yCoords])
    })

    handwritingCanvas.on('mouse:down', () => {
      clearTimeout(timer.current)
    })

    handwritingCanvas.on('mouse:move', (event) => {
      const pointer = fabric.util.getPointer(event.e)
      const x = pointer.x
      const y = pointer.y

      if (trace.length > 0) {
        const lastTrace = trace[trace.length - 1]
        lastTrace[0].push(x)
        lastTrace[1].push(y)
      }
    })

    handwritingCanvas.on('mouse:up', () => {
      timer.current = setTimeout(() => {
        
        handler ? 
        (() => {
          debug && console.log('trace:', trace)
          handler(trace, currWidth, currHeight)
          trace = []
        })() 
        :
        console.log('trace:', trace)

        handwritingCanvas.clear()
      }, resTime || 500)
    })

    return () => {
      handwritingCanvas.dispose()
      bgCanvas.dispose()
    }
  }, [width, height, brushColor, brushWidth, resTime, handler, debug])

  return (
    <div style={{height: height, width: width, overflow: 'hidden', position: 'relative'}} className='bg-[#f9f9f9]'>
      <div style={{height: height, width: width, visibility: auxiliaryLine ? 'visible' : 'hidden'}} className='pointer-events-none absolute top-0 left-0'>
        <canvas ref={bgCanvasRef} className='pointer-events-none'/>
      </div>

      <div style={{height: height, width: width}}>
        <canvas ref={handwritingCanvasRef} />
      </div>
    </div>
  )
}

export default Handwriter

