import { Carousel } from "@/components"
import { STAGE_LIST } from "@/config"
import { Orientation } from "@/hooks"

export const Stage: React.FC<{
  current: number
  contentHeight?: number
  data: typeof STAGE_LIST[0]
  promptIsShow?: boolean
  orientation: Orientation
  promptIsShowHandler?: () => void
}> = props => {

  return (
    <div className="h-full w-full">
      <Carousel
        current={props.current}
        data={props.data.map(item => ({
          id: item.id,
          render: (
            <div className={`w-full h-full ${props.current !== item.id ? 'pointer-events-none' : ''}`}>
              <div className="w-full flex flex-col justify-center" style={{height: props.contentHeight ? `${props.contentHeight}px` : '100%'}}>
                <div className="flex flex-col justify-start" style={props.orientation === 'portrait' ? {padding: '5vw', gap: '8vw'} : {padding: '5vh', gap: '8vh'}}>
                  <div className="font-semibold" style={props.orientation === 'portrait' ? {fontSize: '12vw'} : {fontSize: '12vh'}}>{item.word}</div>
                  <div style={props.orientation === 'portrait' ? {fontSize: '4.5vw'} : {fontSize: '4.5vh'}}>{item.desc}</div>
                  <button 
                    className="rounded-md cursor-pointer"
                    style={props.orientation === 'portrait' ? {fontSize: '4vw', border: '.4vw dashed black', padding: '2vw'} : {fontSize: '4vh', border: '.4vh dashed black', padding: '2vh'}}
                    onClick={props.promptIsShowHandler}
                  >
                    {props.promptIsShow ? '关闭提示' : '提示'}
                  </button>
                </div>
              </div>
            </div>
          )
        }))}
      />
    </div>
  )
}

export default Stage