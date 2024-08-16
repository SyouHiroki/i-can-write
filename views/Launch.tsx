import { Carousel, Mode, Start } from "@/components"
import { MODE_LIST } from "@/config"

export const Launch: React.FC<{
  modeSetHandler: (level: number) => void
  modeList: typeof MODE_LIST
}> = props => {

  return (
    <div className="h-full w-full">
      <Carousel
        data={[
          {id: 0, render: <Start />},
          ...props.modeList.map((item, index) => ({id: index + 1, render: <Mode data={item} handler={() => props.modeSetHandler(item.mode)} isLast={item.id === props.modeList.length - 1} />}))
        ]}
      />
    </div>
  )
}

export default Launch