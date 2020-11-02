import CommonLink from "../CommonLink"
import EmptyArticles from "./EmptyArticles"
import Tag from "./Tag"

export type Article = {
  id: string
  title: string
  desc: string
  tags: string[]
}

export type ArticleListProps = {
  articleList: Article[]
}

const ArticleList: React.VFC<ArticleListProps> = ({
  articleList
}) => {

  return (
    articleList.length <= 0
      ? <EmptyArticles/>
      : (
          <ul>
            {/* 遍历每一个文章信息 */}
            {
              articleList.map(article => (
                <li key={article.id} className='flex flex-col text-2xl lg:text-3xl pb-4'>
                  {/* 链接 */}
                  <CommonLink href={`/articles/${article.id}`}>{article.title}</CommonLink>
                  {/* 描述 */}
                  <p className='text-sm text-gray-600'>{article.desc}</p>
                  {/* tags */}
                  <div className='flex flex-wrap'>
                    {
                      article.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))
                    }
                  </div>
                </li>
              ))
            }
          </ul>
        )
  )
}

export default ArticleList
