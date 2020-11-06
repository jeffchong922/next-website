/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'

export type Tag = {
  name: string
  count: number
}

export type TagsTableProps = {
  tags: Tag[]
}

const TagsTable: React.VFC<TagsTableProps> = ({
  tags
}) => {
  return (
    <table sx={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th sx={{ px: '6', py: '3', pt: '8', fontSize: 'sm', textAlign: 'left', width: '50%', borderWidth: 'px', borderColor: 'muted', borderBottomStyle: 'solid' }}>标签</th>
          <th sx={{ px: '6', py: '3', pt: '8', fontSize: 'sm', textAlign: 'left', width: '50%', borderWidth: 'px', borderColor: 'muted', borderBottomStyle: 'solid' }}>相关数量</th>
        </tr>
      </thead>
      <tbody>
        {
          tags.map(tag => (
            <tr key={tag.name}>
              <td sx={{ px: '6', py: '3', fontSize: 'sm', fontWeight: 'bold', borderWidth: 'px', borderColor: 'muted', borderBottomStyle: 'solid' }}>#{tag.name}</td>
              <td sx={{ px: '6', py: '3', fontSize: 'sm', borderWidth: 'px', borderColor: 'muted', borderBottomStyle: 'solid' }}>{tag.count}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default TagsTable
