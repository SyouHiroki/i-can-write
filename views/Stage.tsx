import { Carousel } from "@/components"
import { STAGE_LIST } from "@/config"

export const Stage: React.FC<{
  current: number
  contentHeight?: number
  data: typeof STAGE_LIST[0]
  promptIsShowHandler?: () => void
}> = props => {

  return (
    <div className="h-full w-full">
      <Carousel
        current={props.current}
        data={props.data.map(item => ({
          id: item.id,
          render: (
            <div className="w-full" style={{height: props.contentHeight ? `${props.contentHeight}px` : '100%'}}>
              <div className="flex flex-col">
                <div>{item.word}</div>
                <div>{item.desc}</div>
                <button onClick={props.promptIsShowHandler}>提示</button>
              </div>
            </div>
          )
        }))}
      />
    </div>
  )
}

export default Stage