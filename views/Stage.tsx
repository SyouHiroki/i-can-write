import { Carousel } from "@/components"
import { STAGE_LIST } from "@/config"

export const Stage: React.FC<{
  current: number
  contentHeight?: number
  data: typeof STAGE_LIST[0]
  promptIsShow?: boolean
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
              <div className="w-full" style={{height: props.contentHeight ? `${props.contentHeight}px` : '100%'}}>
                <div className="flex flex-col p-[5vw] gap-[8vw] justify-start">
                  <div className="text-[12vw] font-semibold">{item.word}</div>
                  <div className="text-[4.5vw]">{item.desc}</div>
                  <button className="border-[.4vw] text-[4vw] border-dashed border-black rounded-md p-[2vw] cursor-pointer" onClick={props.promptIsShowHandler}>{props.promptIsShow ? '关闭提示' : '提示'}</button>
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