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

      <div className="text-[5vw]">Sayu🍊 - 日语边写边学</div>
      <div className="text-[5vw]">⬅️左划以选择模式</div>
    </div>
  )
}

export default Start