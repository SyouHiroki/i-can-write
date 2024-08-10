import * as fabric from 'fabric'
import React, { useEffect, useRef } from 'react'

export const HandWriter: React.FC<{
  width?: number
  height?: number
  brushColor?: string
  brushWidth?: number
  resTime?: number
  handler?: (trace: number[][][]) => void
}> = ({
  width,
  height,
  brushColor,
  brushWidth,
  resTime,
  handler,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current)
    fabricCanvasRef.current = canvas

    const parent = canvasRef.current.parentElement?.parentElement
    const currWidth = width || parent?.clientWidth
    const currHeight = height || parent?.clientHeight

    canvas.setDimensions({
      width: currWidth,
      height: currHeight
    })

    canvas.isDrawingMode = true
    const pencilBrush = new fabric.PencilBrush(canvas)
    pencilBrush.color = brushColor || 'black'
    pencilBrush.width = brushWidth || 10
    canvas.freeDrawingBrush = pencilBrush

    let trace: number[][][] = []

    canvas.on('path:created', (event) => {
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

    canvas.on('mouse:down', () => {
      clearTimeout(timer.current)
    })

    canvas.on('mouse:move', (event) => {
      const pointer = fabric.util.getPointer(event.e)
      const x = pointer.x
      const y = pointer.y

      if (trace.length > 0) {
        const lastTrace = trace[trace.length - 1]
        lastTrace[0].push(x)
        lastTrace[1].push(y)
      }
    })

    canvas.on('mouse:up', () => {
      timer.current = setTimeout(() => {
        
        handler ? 
        (() => {
          handler(trace)
          trace = []
        })() 
        :
        console.log('Trace:', trace)

        canvas.clear()
      }, resTime || 500)
    })

    return () => {
      fabricCanvasRef.current?.dispose()
    };
  }, [width, height, brushColor, brushWidth, resTime, handler])

  return <canvas ref={canvasRef} />
};

export default HandWriter

