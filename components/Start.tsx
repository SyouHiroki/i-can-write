import Image from "next/image"

export const Start: React.FC<{}> = () => {

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-[5vw]">
      <Image 
        src="/assets/logo.svg"
        alt="logo"
        unoptimized
        priority
        loading='eager'
        draggable="false"
        width={500}
        height={500}
        className="w-[35vw] h-[35vw]"
      />

      <div className="text-[5vw] flex flex-col justify-center items-center">
        <div>Sayu🍊</div>
        <div>日语单词📝边写边背</div>
        <div className="mt-[10vw]">⬅️左划以选择模式</div>
      </div>
    </div>
  )
}

export default Start