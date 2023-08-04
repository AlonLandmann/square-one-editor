import { v4 as uuid } from 'uuid'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function TeX({ tex }) {
  let parsed = []
  let mode = 'text'
  let main = ''

  for (let i = 0; i <= tex.length; i += 1) {
    if (mode === 'text') {
      if (i === tex.length) {
        pushText()
      } else if (tex[i] === '[') {
        pushText()
        mode = 'math'
      } else {
        main = main.concat(tex[i])
      }
    } else if (mode === 'math') {
      if (tex[i] === ']') {
        pushMath()
        mode = 'text'
      } else {
        main = main.concat(tex[i])
      }
    }
  }

  function pushText() {
    parsed.push(
      <span key={uuid()}>{main}</span>
    )

    main = ''
  }
  function pushMath() {
    parsed.push(
      <InlineMath key={uuid()}>{main}</InlineMath>
    )

    main = ''
  }

  return <div>{parsed}</div>
}