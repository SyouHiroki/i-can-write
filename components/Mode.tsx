import { MODE_LIST } from "@/config"

export const Mode: React.FC<{
  handler: () => void
  data: typeof MODE_LIST[0]
  isLast: boolean
}> = props => {

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-[5vw]">
      <div className="text-[12vw]">{props.data.title}</div>
      <div className="text-[5vw]">{props.data.desc}</div>
      <div className="text-[5vw]">{props.isLast ? '➡️右划以切换模式' : '⬅️左划以切换模式'}</div>
      <button className="border-[.3vw] text-[4vw] border-dashed border-black rounded-md p-[2vw] cursor-pointer" onClick={props.handler}>选我选我👋</button>
    </div>
  )
}

export default Mode