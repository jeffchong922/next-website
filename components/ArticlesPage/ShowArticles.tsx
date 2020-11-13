import React from 'react'
import ArticleCard, { ArticleCardProps } from '../shared/ArticleCard'
import FlexGrid from '../shared/FlexGrid'
import NoResource from '../shared/NoResource'

export type ShowArticlesProps = {
  articles: ArticleCardProps[]
}

const ShowArticles: React.VFC<ShowArticlesProps> = ({
  articles
}) => {
  return (
    <div>
      {
        articles.length <= 0
          ? <NoResource/>
          : <FlexGrid RenderItem={ArticleCard} resources={articles}/>
      }
    </div>
  )
}

export default ShowArticles
