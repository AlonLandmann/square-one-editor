import { v4 as uuid } from 'uuid'
import { InlineMath, BlockMath } from 'react-katex'
import Reference from '@/components/parts/Reference'
import Derivation from '@/components/parts/Derivation'
import Table from '@/components/parts/Table'
import Highlight from '@/components/parts/Highlight'
import 'katex/dist/katex.min.css'

export default function TeX({ tex }) {
  let parsed = []
  let mode = 'text'
  let main = ''

  const mathSplits = /^(=|<|>|\\neq|\\geq|\\leq)/
  const escapePattern = /^~(\[|\]|§|£|#|\$|%|>|<)/

  for (let i = 0; i <= tex.length; i += 1) {
    if (escapePattern.test(tex.slice(i))) {
      main = main.concat(tex[i + 1]);
      i += 1;
    } else if (mode === 'text') {
      if (i === tex.length) { pushText() }
      else if (tex[i] === '[') { pushText(); mode = 'math' }
      else if (tex[i] === '§') { pushText(); mode = 'textRef' }
      else if (tex[i] === '£') { pushText(); mode = 'derivation' }
      else if (tex[i] === '#') { pushText(); mode = 'table' }
      else if (tex[i] === '$') { pushText(); mode = 'highlight' }
      else if (tex[i] === '>') { pushText(); mode = 'bold' }
      else if (tex[i] === '<') { pushText(); mode = 'italic' }
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
    } else if (mode === 'derivation') {
      if (tex[i] === '£') { pushDerivation(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'table') {
      if (tex[i] === '#') { pushTable(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'highlight') {
      if (tex[i] === '$') { pushHighlight(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'bold') {
      if (tex[i] === '>') { pushBold(); mode = 'text' }
      else { main = main.concat(tex[i]) }
    } else if (mode === 'italic') {
      if (tex[i] === '<') { pushItalic(); mode = 'text' }
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
      <div key={uuid()} style={{ 'height': '25px' }}></div>
    )
  }

  function pushTextRef() {
    let content, refNum, subNum

    if (main.split(',').length === 1) {
      content = main
      refNum = Number(main.split('.')[0])
      subNum = Number(main.split('.')[1])
    } else {
      content = main.split(',')[0]
      refNum = Number(main.split(',')[1].split('.')[0])
      subNum = Number(main.split(',')[1].split('.')[1])
    }

    parsed.push(
      <Reference key={uuid()} refNum={refNum} subNum={subNum}>
        {content}
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
    let content = main.split(',')[0]
    let refNum = Number(main.split(',')[1].split('.')[0])
    let subNum = Number(main.split(',')[1].split('.')[1])

    parsed.push(
      <Reference key={uuid()} refNum={refNum} subNum={subNum}>
        <InlineMath>
          {content}
        </InlineMath>
      </Reference>
    )

    main = ''
  }

  function pushDerivation() {
    parsed.push(
      <Derivation key={uuid()} tex={main} />
    )

    main = ''
  }
  function pushTable() {
    parsed.push(
      <Table key={uuid()} tex={main} />
    )

    main = ''
  }

  function pushHighlight() {
    parsed.push(
      <Highlight key={uuid()} tex={main} />
    )

    main = ''
  }

  function pushBold() {
    parsed.push(
      <span key={uuid()} style={{ fontWeight: 'bold' }}>{main}</span>
    )

    main = ''
  }

  function pushItalic() {
    parsed.push(
      <span key={uuid()} style={{ fontStyle: 'italic' }}>{main}</span>
    )

    main = ''
  }

  return <div>{parsed}</div>
}