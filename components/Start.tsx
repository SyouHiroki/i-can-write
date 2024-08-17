import { Orientation } from "@/hooks"
import Image from "next/image"

export const Start: React.FC<{
  orientation: Orientation
}> = props => {

  return (
    <div
      className="h-full w-full flex items-center justify-center"
      style={props.orientation === 'portrait' ? {flexDirection: 'column', gap: '5vw'} : {flexDirection: 'row', gap: '10vh'}}  
    >
      <Image 
        src="/assets/logo.svg"
        alt="logo"
        unoptimized
        priority
        loading='eager'
        draggable="false"
        width={500}
        height={500}
        style={props.orientation === 'portrait' ? {widows: '35vw', height: '35vw'} : {width: '35vh', height: '35vh'}}
      />

      <div
        className="flex flex-col justify-center items-center"
        style={props.orientation === 'portrait' ? {fontSize: '5vw'} : {fontSize: '5vh'}}
      >
        <div>Sayu🍊</div>
        <div>日语单词📝边写边背</div>
        <div style={props.orientation === 'portrait' ? {marginTop: '10vw'} : {marginTop: '10vh'}}>⬅️左划以选择模式</div>
      </div>
    </div>
  )
}

export default Start