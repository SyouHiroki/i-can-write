import { InputtoolsReq, InputtoolsRes } from "@/pages/api/inputtools"

export const recognize = async (trace: number[][][], canvasWidth?: number, canvasHeight?: number) => {
  const arg: InputtoolsReq = {
    trace: trace,
    lang: 'zh-Hans',
    canvasHeight: canvasWidth || 500,
    canvasWidth: canvasHeight || 500
  }

  try {
    const ret: InputtoolsRes = await (await fetch('/api/inputtools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    })).json()

    return ret.data

  } catch (error) {
    console.error(error)
  }
}

export default recognize