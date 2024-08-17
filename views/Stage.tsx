import { Carousel, Drawer, Handwriter, HandwriterHandler } from "@/components"
import { STAGE_LIST } from "@/config"
import { Orientation } from "@/hooks"

export const Stage: React.FC<{
  currentStage: number
  contentHeight?: number
  contentWidth?: number
  data: typeof STAGE_LIST[0]
  promptIsShow?: boolean
  orientation: Orientation
  currentWordSplit?: string
  handwriterIsClose?: boolean
  drawerContentHeight?: number
  currentChar?: string
  handwriterResTime?: number
  debug?: boolean
  promptIsShowHandler?: () => void
  handwriterIsCloseHandler?: () => void
  handwriterHandler?: HandwriterHandler
}> = props => {

  return (
    <div className="h-full w-full">
      <Carousel
        current={props.currentStage}
        data={props.data.map(item => ({
          id: item.id,
          render: (
            <div className={`w-full h-full ${props.currentStage !== item.id ? 'pointer-events-none' : ''}`}>
              <div className="w-full flex flex-col justify-center" style={{height: props.contentHeight ? `${props.contentHeight}px` : '100%'}}>
                <div className="flex flex-col justify-start" style={props.orientation === 'portrait' ? {padding: '5vw', gap: '8vw'} : {padding: '5vh', gap: '8vh'}}>
                  <div>
                    <div className="font-semibold" style={props.orientation === 'portrait' ? {fontSize: '12vw'} : {fontSize: '12vh'}}>{item.word}</div>
                    <div className={`${props.currentWordSplit ? 'text-black' : 'text-transparent'}`} style={props.orientation === 'portrait' ? {fontSize: '4vw'} : {fontSize: '4vh'}}>{props.currentWordSplit || 'none'}</div>
                  </div>
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

      <Drawer
        toggleHandler={props.handwriterIsCloseHandler}
        isClose={props.handwriterIsClose}
        contentHeight={props.drawerContentHeight}
        orientation={props.orientation}
      >
        <Handwriter
          orientation={props.orientation}
          handler={props.handwriterHandler}
          brushWidth={10}
          height={props.drawerContentHeight}
          width={props.contentWidth}
          auxiliaryLine
          currentChar={props.currentChar}
          promptIsShow={props.promptIsShow}
          resTime={props.handwriterResTime}
          debug={props.debug}
        /> 
      </Drawer>
    </div>
  )
}

export default Stage