import HandWriter from "@/components/HandWriter"

export default function Home() {
  const handler = (base64: string) => {
    console.log(base64)
  }

  return (
    <div className="w-screen h-screen">
      <HandWriter handler={handler} />
    </div>
  )
}
