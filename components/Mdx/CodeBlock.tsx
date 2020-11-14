// https://github.com/mdx-js/mdx/blob/master/examples/syntax-highlighting/src/components/CodeBlock.js
import dynamic from 'next/dynamic'
import HighLight, { defaultProps, Language } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'
import { Styled } from 'theme-ui'

const LivePreview = dynamic(() => import('react-live').then(mode => mode.LivePreview))
const LiveEditor = dynamic(() => import('react-live').then(mode => mode.LiveEditor))
const LiveError = dynamic(() => import('react-live').then(mode => mode.LiveError))
const LiveProvider = dynamic(() => import('react-live').then(mode => mode.LiveProvider))

export type CodeBlockProps = {
  children: string
  className: string
  live?: string
  line: string
}

const aliases = {
  js: 'javascript',
  sh: 'bash',
}

/**
 * 解析高亮代码行号
 * @param lineInfo 传递的值，{1}、{1, 2}、{1, 2-3, 4}
 */
function paseActiveLines (lineInfo: string): number[] {
  let activeLines: number[] = []
  const linesPattern = /^\{(.*)\}$/
  const dashPattern = /^(\d+)\-(\d+)$/

  const linesMatches = linesPattern.exec(lineInfo)
  
  if (linesMatches) {
    activeLines = linesMatches[1].split(',')
      .reduce<number[]>((arr, nextVal) => {
        if (dashPattern.test(nextVal)) {  
          const matches = dashPattern.exec(nextVal)
          const num1 = parseInt(matches[1])
          const num2 = parseInt(matches[2])
          const max = Math.max(num1, num2)
          let currentMin = Math.min(num1, num2)
          const storage: number[] = []
          do {
            storage.push(currentMin)
            currentMin++
          } while (currentMin <= max)
          return arr.concat(storage)
        }

        return arr.concat(parseInt(nextVal))
      }, [])
  }

  return activeLines
}

const CodeBlock: React.FC<CodeBlockProps> = (props) => {
  const {
    children,
    className: outerClassName,
    live = 'false',
    line = '',
    ...otherProps
  } = props

  const activeLines = paseActiveLines(line)

  let lang: Language = undefined
  if (outerClassName) {
    const [language] = outerClassName.replace(/language-/, '').split(' ')
    lang = (aliases[language] || language) as Language
  }

  if (live === 'true') {
    return (
      <div style={{}}>
        <LiveProvider code={children.trim()} theme={dracula}>
          <LiveEditor style={{ backgroundColor: '#011627' }}/>
          <LiveError style={{ whiteSpace: 'pre-wrap', border: '1px solid #011627', borderTop: 'none', borderBottom: 'none', backgroundColor: '#d00', color: 'white', padding: '0.5rem', margin: '0' }}/>
          <LivePreview style={{ border: '1px solid #011627', borderTop: 'none', padding: '0.5rem' }}/>
        </LiveProvider>
      </div>
    )
  }

  return (
    <HighLight {...defaultProps} code={children.trim()} language={lang} theme={undefined} {...otherProps}>
      {({ className, style, tokens, getLineProps, getTokenProps}) => (
        <Styled.pre className={`${outerClassName} ${className}`} style={style}>
          {/* 适配父节点 padding 样式 */}
          <code style={{ display: 'inline-block', minWidth: '100%' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i,
                className: activeLines.includes(i) ? 'active-line' : ''
              })}>
                {line.map((token, key) => (
                  <span style={{ display: 'inline-block' }} key={key} {...getTokenProps({token, key})}/>
                ))}
              </div>
            ))}
          </code>
        </Styled.pre>
      )}
    </HighLight>
  )
}

export default CodeBlock