export const LANG: "zh-Hans" | "ja" | "en" = 'ja'

export const INPUTTOOLS_API = 'https://www.google.com.tw/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8'

export const MODE_LIST = [
  {id: 0, mode: 0, title: '汉字➡️假名', desc: '根据给出的汉字写出假名'},
  {id: 1, mode: 1, title: '假名➡️汉字', desc: '根据给出的假名写出汉字'}
]

export const STAGE_LIST = [
  [
    {id: 0, word: '一生懸命', desc: '竭尽所能，用尽全力去进行某件事', write: 'いっしょうけんめい'},
    {id: 1, word: '滅茶苦茶', desc: '形容事物乱七八糟，一塌糊涂的模样', write: 'めちゃくちゃ'},
  ],
  [
    {id: 0, word: 'いのり', desc: '祈祷', write: '祈り'},
    {id: 1, word: 'まつり', desc: '祭典、节日', write: '祭り'},
  ]
]