import fs from 'fs'
import path from 'path'

type FileTools = {
  getAllFileNames: () => string[]
  getFileSource: (fileName: string) => string
  isFileExist: (fileName: string) => boolean
}

export default function makeFileTools (filesDir: string) {
  return Object.freeze<FileTools>({
    getAllFileNames,
    getFileSource,
    isFileExist
  })

  function getAllFileNames () {
    return fs.readdirSync(filesDir)
  }

  function getFileSource (fileName: string) {
    return fs.readFileSync(path.join(filesDir, fileName), 'utf-8')
  }

  function isFileExist (fileName: string) {
    return fs.existsSync(path.join(filesDir, fileName))
  }
}