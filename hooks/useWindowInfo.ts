import { useState, useEffect } from 'react'

export type Orientation = 'landscape' | 'portrait'

export const useWindowInfo = () => {
  const [windowInfo, setWindowInfo] = useState<{
    width: number
    height: number
    orientation: Orientation
    ready: boolean
  }>({
    width: 0,
    height: 0,
    orientation: 'portrait',
    ready: false
  }) 
  useEffect(() => {
    const handler = () => {
      setWindowInfo({
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
        ready: true
      })
    }  
    handler()  

    window.addEventListener('resize', handler) 

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return windowInfo
}

export default useWindowInfo