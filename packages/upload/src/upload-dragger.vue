<template>
  <div
    class='upload-dragger'
    :class="{ 'is-dragover': dragover }"
    @drop.prevent='onDrop'
    @dragover.prevent='dragover = !disabled'
    @dragenter.prevent='dragover = true'
    @dragleave.prevent='dragover = false'
  >
    <slot></slot>
  </div>
</template>

<script>
import { getFileExtension } from '../../../src/util/file-util'

export default {
  name: 'UploadDragger',
  props: {
    disabled: Boolean
  },
  inject: {
    uploader: {
      default: ''
    }
  },
  data() {
    return {
      dragover: false
    }
  },
  methods: {
    /**
     * 拖入文件时
     */
    onDrop(e) {
      if (this.disabled || !this.uploader) {
        return
      }
      this.dragover = false
      // 接受任何类型的文件
      const accept = this.uploader.accept
      if (!accept) {
        this.$emit('file', e.dataTransfer.files)
        return
      }
      // 仅接受部分类型的文件
      this.$emit('file', [].slice.call(e.dataTransfer.files).filter((file) => {
        const { type, name } = file
        const extension = getFileExtension(name)
        // 如 `image/*`, 替换为 `image`
        const baseType = type.replace(/\/.*$/, '')
        return accept.split(',')
          .map((acceptType) => acceptType.trim())
          // 过滤 undefined, null
          .filter((acceptType) => acceptType)
          // 任一条件满足时即接受上传
          .some((acceptType) => {
            // 检测 `.` + 任意字符，如 `.pdf`
            // extension 为 pdf 时满足
            if (/\..+$/.test(acceptType)) {
              return extension === acceptType.toLowerCase()
            }
            // 检测 `/*`，如 `image/*`, 同时替换为 `image`
            // baseType 为 image 时满足
            if (/\/\*$/.test(acceptType)) {
              return baseType === acceptType.replace(/\/\*$/, '')
            }
            // 检测 非`/`字符 + `/` + 非`/`字符，如 `application/zip`、`text/plain`
            // 常见于 File 自带的 type
            if (/^[^/]+\/[^/]+$/.test(acceptType)) {
              return type === acceptType
            }
            return false
          })
      }))
    }
  }
}
</script>
