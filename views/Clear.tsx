import { Orientation } from "@/hooks"

export const Clear: React.FC<{
  orientation: Orientation
}> = props => {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div style={props.orientation === 'portrait' ? {fontSize: '8vw'} : {fontSize: '8vh'}}>通过挑战！恭喜！🎉</div>

      <button 
        className="rounded-md cursor-pointer"
        style={props.orientation === 'portrait' ? {border: '.4vw dashed black', fontSize: '4vw', padding: '2vw'} : {border: '.4vh dashed black', fontSize: '4vh', padding: '2vh'}}
      >
        再来再来！💪
      </button>

      <button 
        className="rounded-md cursor-pointer"
        style={props.orientation === 'portrait' ? {border: '.4vw dashed black', fontSize: '4vw', padding: '2vw'} : {border: '.4vh dashed black', fontSize: '4vh', padding: '2vh'}}
      >
        撤了撤了😪
      </button>
    </div>
  )
}

export default Clear