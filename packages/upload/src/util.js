import {
  getFileExtension
} from '../../../src/util/file-util'
import { generateUUID } from '../../../src/util/algorithm'

const UPLOAD_FILE_STATUS = {
  HANDLE: 'ready', // 就绪 - 准备上传
  PAUSE: 'pause', // 暂停 - 暂停上传
  PROGRESS: 'uploading', // 处理 - 上传中
  SUCCESS: 'success', // 成功 - 上传成功
  FAIL: 'fail' // 失败 - 上传失败
}

/**
 * 判断当前 vue 实例 propsData 中是否有 prop 属性
 * 成功 - 返回 true
 * 失败 - 返回 false
 * @param instance
 * @param prop
 * @return {boolean}
 */
const hasProp = (instance, prop) => {
  const $options = instance.$options || {}
  const propsData = $options.propsData || {}
  return prop in propsData
}

/**
 * 获取 fileList 中的指定 file
 * 成功 - 返回匹配到的 file 数组
 * 失败 - 返回 null
 * @param file
 * @param fileList
 * @return {null|*}
 */
const getFileItem = (file, fileList) => {
  // 如果 uid 不存在，就按文件名匹配
  const matchKey = file.uid !== undefined ? 'uid' : 'name'
  return fileList.filter((item) => item[matchKey] === file[matchKey])[0]
}

/**
 * 删除 fileList 中的指定 file
 * 成功 - 返回删除后的 fileList
 * 失败 - 返回 null
 * @param file
 * @param fileList
 * @return {null|*}
 */
const removeFileItem = (file, fileList) => {
  // 如果 uid 不存在，就按文件名匹配
  const matchKey = file.uid !== undefined ? 'uid' : 'name'
  const removed = fileList.filter((item) => item[matchKey] !== file[matchKey])
  // 没有要删除的文件
  if (removed.length === fileList.length) {
    return null
  }
  return removed
}

const fileToObject = (file, status = UPLOAD_FILE_STATUS.HANDLE) => ({
  lastModified: file.lastModified,
  lastModifiedDate: file.lastModifiedDate,
  name: file.name,
  size: file.size,
  type: file.type || getFileExtension(file.name),
  uid: file.uid || generateUUID(),
  status,
  percent: 0,
  originFile: file
})

export {
  hasProp,
  getFileItem,
  removeFileItem,
  fileToObject,
  UPLOAD_FILE_STATUS
}
