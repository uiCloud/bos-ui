import { fileExtensionMap } from '../model/constant/fileExtension'

/**
 * 判断是否是已知的文件后缀
 * @param fileExtension 文件后缀
 * @returns {boolean}
 */
const isKnownExtension = (fileExtension) => {
  for (const fileExtensionList of fileExtensionMap.values()) {
    if (fileExtensionList.includes(fileExtension)) {
      return true
    }
  }
  return false
}

/**
 * 根据文件名获取文件后缀
 * @param fileName
 * @returns {string}
 */
const getFileExtension = (fileName) => {
  if (!fileName || typeof fileName !== 'string') {
    return 'unknown'
  }
  if (fileName.indexOf('.') === -1) {
    return 'directory'
  }
  const fileExtension = (fileName.split('.').pop() || '').toLowerCase()
  return isKnownExtension(fileExtension) ? fileExtension : 'unknown'
}

// eslint-disable-next-line valid-typeof
const isFile = (file) => typeof file === 'File'

// eslint-disable-next-line valid-typeof
const isDirectory = (file) => typeof file === 'DirectoryEntry'


/**
 * buffer 形式读取文件内容
 * @param file
 * @returns {Promise<unknown>}
 */
export async function readBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (loadEvent) => resolve(loadEvent.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 将 buffer 转为 utf8 文本
 * @param buffer
 * @returns {Promise<unknown>}
 */
export async function bufferToText(buffer) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (loadEvent) => resolve(loadEvent.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsText(new Blob([ buffer ]), 'utf-8')
  })
}

export { isKnownExtension, getFileExtension, isFile, isDirectory }
