import { Orientation } from "@/hooks"

export const Clear: React.FC<{
  orientation: Orientation
  exitHandler?: () => void
  replayHandler?: () => void
}> = props => {

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      style={props.orientation === 'portrait' ? {gap: '5vw'} : {gap: '5vh'}}
    >
      <div style={props.orientation === 'portrait' ? {fontSize: '8vw'} : {fontSize: '8vh'}}>通过挑战！恭喜！🎉</div>

      <button 
        className="rounded-md cursor-pointer"
        style={props.orientation === 'portrait' ? {border: '.4vw dashed black', fontSize: '4vw', padding: '2vw', width: '75vw'} : {border: '.4vh dashed black', fontSize: '4vh', padding: '2vh', width: '75vh'}}
        onClick={props.replayHandler}
      >
        再来再来！💪
      </button>

      <button 
        className="rounded-md cursor-pointer"
        style={props.orientation === 'portrait' ? {border: '.4vw dashed black', fontSize: '4vw', padding: '2vw', width: '75vw'} : {border: '.4vh dashed black', fontSize: '4vh', padding: '2vh', width: '75vh'}}
        onClick={props.exitHandler}
      >
        撤了撤了😪
      </button>
    </div>
  )
}

export default Clear