import HandWriter from "@/components/HandWriter"


export default function Home() {
  const handler = (trace: number[][][]) => {
    console.log('trace',trace)
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-[700px] h-[500px] border border-solid border-black">
        <HandWriter handler={handler} brushWidth={10}/>
      </div>
    </div>
  )
}
