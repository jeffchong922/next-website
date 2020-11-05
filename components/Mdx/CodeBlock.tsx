// https://github.com/mdx-js/mdx/blob/master/examples/syntax-highlighting/src/components/CodeBlock.js

import HighLight, { defaultProps, Language } from 'prism-react-renderer'
import { Styled } from 'theme-ui'

export type CodeBlockProps = {
  children: string
  className: string
  live?: string
}

const aliases = {
  js: 'javascript',
  sh: 'bash',
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className: outerClassName,
  live,
  ...otherProps
}) => {
  let lang: Language = undefined
  if (outerClassName) {
    const [language] = outerClassName.replace(/language-/, '').split(' ')
    lang = (aliases[language] || language) as Language
  }

  return (
    <HighLight {...defaultProps} code={children.trim()} language={lang} theme={undefined} {...otherProps}>
      {({ className, style, tokens, getLineProps, getTokenProps}) => (
        <Styled.pre className={`${outerClassName} ${className}`} style={style}>
          {/* 适配父节点 padding 样式 */}
          <code style={{ display: 'inline-block' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
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