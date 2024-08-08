import * as fabric from 'fabric'
import React, { useEffect, useRef } from 'react'

export const HandWriter: React.FC<{
  width?: number
  height?: number
  brushColor?: string
  brushWidth?: number
  resTime?: number
  handler?: (base64: string) => void
}> = ({
  width,
  height,
  brushColor,
  brushWidth,
  resTime,
  handler
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current)
    fabricCanvasRef.current = canvas

    // fabric包裹了一层div，所以是parent的parent
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

    canvas.on('mouse:down', () => {
      clearTimeout(timer.current)
    })

    canvas.on('mouse:up', () => {
      timer.current = setTimeout(() => {
        handler ? handler(canvas.toDataURL()) : console.log('on mouse up', canvas.toDataURL())
        canvas.clear()
      }, resTime || 500)
    })

    return () => {
      // 在组件卸载时销毁 fabric.Canvas 实例
      fabricCanvasRef.current?.dispose()
    }
  }, [width, height, brushColor, brushWidth, resTime, handler])

  return <canvas ref={canvasRef} />
};

export default HandWriter
