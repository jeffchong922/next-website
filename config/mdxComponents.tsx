import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { MDXProviderComponents } from '@mdx-js/react'
import CodeBlock from '../components/Mdx/CodeBlock'

export interface Components extends MDXProviderComponents {
  [c: string]: ComponentType<any>
}

function makeComponents (localComponents: string[] = []) {
  const origin: Components = {
    pre: props => props.children,
    code: CodeBlock
  }

  const local = localComponents.reduce<Components>((components, component) => {
    return {
      ...components,
      [`${component}`]: dynamic(() => import(`../components/Mdx/${component}`))
    }
  }, {})

  return {
    ...origin,
    ...local
  }
}

export default makeComponents