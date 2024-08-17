import { MODE_LIST } from "@/config"
import { Orientation } from "@/hooks"

export const Mode: React.FC<{
  handler: () => void
  data: typeof MODE_LIST[0]
  orientation: Orientation
  isLast: boolean
}> = props => {

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center"
      style={props.orientation === 'portrait' ? {gap: '5vw'} : {gap: '5vh'}}
    >
      <div style={props.orientation === 'portrait' ? {fontSize: '12vw'} : {fontSize: '12vh'}}>{props.data.title}</div>
      <div style={props.orientation === 'portrait' ? {fontSize: '5vw'} : {fontSize: '5vh'}}>{props.data.desc}</div>
      <div style={props.orientation === 'portrait' ? {fontSize: '5vw'} : {fontSize: '5vh'}}>{props.isLast ? '➡️右划以切换模式' : '⬅️左划以切换模式'}</div>
      <button 
        className="rounded-md cursor-pointer"
        style={props.orientation === 'portrait' ? {border: '.4vw dashed black', fontSize: '4vw', padding: '2vw'} : {border: '.4vh dashed black', fontSize: '4vh', padding: '2vh'}}
        onClick={props.handler}
      >
        选我选我👋
      </button>
    </div>
  )
}

export default Mode