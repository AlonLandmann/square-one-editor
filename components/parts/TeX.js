import { v4 as uuid } from 'uuid'
import { InlineMath } from 'react-katex'
import Reference from '@/components/parts/Reference'
import 'katex/dist/katex.min.css'

export default function TeX({ tex }) {
  let parsed = []
  let mode = 'text'
  let main = ''
  
  const mathSplits = /^(=|<|>|\\neq|\\geq|\\leq)/

  for (let i = 0; i <= tex.length; i += 1) {
    if (mode === 'text') {

      if (i === tex.length) { pushText() }
      else if (tex[i] === '[') { pushText(); mode = 'math' }
      else if (tex[i] === '§') { pushText(); mode = 'textRef' }
      else if (tex[i] === '%') { pushText(); pushNewLine() }
      else { main = main.concat(tex[i]) }

    } else if (mode === 'textRef') {

      if (tex[i] === '§') { pushTextRef(); mode = 'text' }
      else { main = main.concat(tex[i]) }

    } else if (mode === 'math') {

      if (tex[i] === ']') { pushMath(); mode = 'text' }
      else if (tex[i] === '§') { pushMath(); pushSpacer(); mode = 'mathRef' }
      else if (mathSplits.test(tex.slice(i))) { pushMath(); pushSpacer(); main = tex[i] }
      else { main = main.concat(tex[i]) }

    } else if (mode === 'mathRef') {

      if (tex[i] === '§') { pushMathRef(); pushSpacer(); mode = 'math' }
      else { main = main.concat(tex[i]) }

    }
  }

  function pushText() {
    parsed.push(
      <span key={uuid()}>{main}</span>
    )

    main = ''
  }
  function pushNewLine() {
    parsed.push(
      <div key={uuid()} style={{ 'height': '35px' }}></div>
    )
  }
  function pushTextRef() {
    parsed.push(
      <Reference key={uuid()}>
        {main.split(',')[0]}
      </Reference>
    )

    main = ''
  }
  function pushMath() {
    parsed.push(
      <InlineMath key={uuid()}>{main}</InlineMath>
    )

    main = ''
  }
  function pushSpacer() {
    parsed.push(
      <span key={uuid()} style={{ 'marginRight': '0.2778em' }}></span>
    )
  }
  function pushMathRef() {
    parsed.push(
      <Reference key={uuid()}>
        <InlineMath>
          {main.split(',')[0]}
        </InlineMath>
      </Reference>
    )

    main = ''
  }

  return <div>{parsed}</div>
}