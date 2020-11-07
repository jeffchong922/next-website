import React, { useEffect, useState } from 'react'
import { Box, Flex, useColorMode } from 'theme-ui'
import { Article } from '../../pages'
import ArticleCard from '../shared/ArticleCard'
import BBBox from '../shared/BBBox'
import FlexGrid from '../shared/FlexGrid'
import HighlightLink from '../shared/HighlightLink'

export type LatestRecordsProps = {
  articles: Article[]
}

const LatestRecords: React.VFC<LatestRecordsProps> = ({
  articles
}) => {
  const [mode] = useColorMode()
  const [first, setFirst] = useState<Article>(undefined)
  const [tow, setTow] = useState<Article[]>([])

  // 获取相应文章
  useEffect(() => {
    const firstArticle = articles.slice(0, 1)[0]
    const towArticles = articles.slice(1, 3)
    setFirst(firstArticle)
    setTow(towArticles)
  }, [articles])

  return (
    <Box>
      
      {/* 单独一篇 */}
      <BBBox>
        <Box sx={{
          px: '10', py: '32',
          background: `url(/images/${ mode === 'deep' ? 'home-fixed-bg-black.svg' : 'home-fixed-bg-white.svg'})`,
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: '200px 200px'
        }}>
          <Box sx={{
            bg: 'background', borderStyle: 'solid', borderWidth: 'px', borderColor: 'text',
            width: ['full', '2/3', '1/2'],
            boxShadow: '1rem 1rem 2rem rgb(37, 78, 219, 0.5)',
            transition: 'all .3s',
            ":hover": {
              transform: 'translateY(-3px) scale(1.001)',
              boxShadow: '1rem 1rem 2rem rgb(37, 78, 219, 0.5), 0.5rem 0.5rem 0.6rem 0px rgb(37, 78, 219, 0.7)',
            }
          }}>
            {
              first
                ? <ArticleCard {...first} showDesc={true}/>
                : <div style={{ padding: '5rem', fontSize: '1.5rem' }}>还没有记录任何内容🤦‍♂️</div>
            }
          </Box>
        </Box>
      </BBBox>

      {/* 其余两篇 */}
      {
        tow.length > 0 && (
          <FlexGrid RenderItem={ArticleCard} resources={tow.map(article => ({
            ...article,
            showDesc: true
          }))} />
        )
      }

      {/* 查找更多 */}
      <BBBox>
        <Flex sx={{ justifyContent: 'flex-end', p: '3' }}>
          <Box sx={{
            width: ['full', '4/12'],
            bg: 'background', borderStyle: 'solid', borderWidth: 'px', borderColor: 'text', borderBottomStyle: 'none',
          }}>
            <HighlightLink href='/articles'>
              查看更多记录
            </HighlightLink>
          </Box>
        </Flex>
      </BBBox>

    </Box>
  )
}

export default LatestRecords
