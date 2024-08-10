import { INPUTTOOLS_API, LANG } from "@/config"
import type { NextApiRequest, NextApiResponse } from "next"

type GoogleImeReq = {
  options: string
  requests: {
    writing_guide: {
      writing_area_width: number
      writing_area_height: number
    }
    ink: number[][][]
    language: LANG
  }[]
}

type GoogleImeRes = [
  string,
  [
    [
      string,
      string[],
      any[],
      { is_html_escaped: boolean }
    ]
  ]
]

export type InputtoolsRes = {
  code: number
  msg: string
  data: string[] | null
}

export type InputtoolsReq = {
  trace: number[][][]
  lang: LANG
  canvasWidth: number
  canvasHeight: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InputtoolsRes>,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ code: 405, msg: '请求方法不允许！', data: null })
    return
  }

  const {trace, lang, canvasWidth, canvasHeight} : InputtoolsReq = req.body

  if (!trace || !lang || !canvasWidth || !canvasHeight) {
    res.status(500).json({ code: 500, msg: '一个或多个参数有误！', data: null })
    return
  }

  const arg: GoogleImeReq = {
    "options": "enable_pre_space",
    "requests": [
      {
        "writing_guide": {
          "writing_area_width": canvasWidth || 400,
          "writing_area_height": canvasHeight || 400
        },
        "ink": trace || [],
        "language": lang || "zh-Hans"
      }
    ]
  }

  try {
    const ret: GoogleImeRes = await (await fetch(INPUTTOOLS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    })).json()

    res.status(200).json({ code: 200, msg: '成功！', data: ret[1][0][1] })

  } catch (error) {
    console.error(error)
    res.status(500).json({ code: 500, msg: '未知错误！', data: null })
  }
  
}
