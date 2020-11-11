import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const imagesDirectory = path.join(process.cwd(), 'public/images')

function getImgPath (fileName: string): string {
  return path.join(imagesDirectory, fileName)
}

function getImgType (fileName: string): string {
  const ext = fileName.split('.').pop()
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'gif':
      return 'image/gif'
    case 'png':
      return 'image/png'
    case 'svg':
      return 'image/svg+xml'
    default:
      throw Error('Not Supported')
  }
}

export default async function imagesHandler (req: NextApiRequest, res: NextApiResponse) {
  const {
    method: requestMethod,
    query: { file }
  } = req

  switch (requestMethod) {
    case 'GET':
      try {
        const data = await fs.promises.readFile(getImgPath(file as string))
        res.setHeader('Content-Type', getImgType(file as string))
        res.setHeader('Cache-Control', `public, max-age=${60 * 60 * 24 * 7}`)
        res.send(data)
      } catch (error) {
        res.status(404).send('Not Found')
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${requestMethod} Not Allowed`)
  }
}