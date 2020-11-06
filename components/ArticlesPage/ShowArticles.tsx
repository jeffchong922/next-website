import React from 'react'
import { Article } from '../../pages/articles'
import FlexGrid from '../shared/FlexGrid'
import Card from './Card'
import NoResource from './NoResource'

export type ShowArticlesProps = {
  articles: Article[]
}

const ShowArticles: React.VFC<ShowArticlesProps> = ({
  articles
}) => {
  return (
    <div>
      {
        articles.length <= 0
          ? <NoResource/>
          : <FlexGrid RenderItem={Card} resources={articles}/>
      }
    </div>
  )
}

export default ShowArticles
