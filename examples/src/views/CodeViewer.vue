<template>
  <div class="code-viewer-view">
    <h1>This is an code viewer page</h1>
    <b-upload
        drag
        action="#"
        :file-list="fileList"
        :on-change="handleChange"
    ></b-upload>
    <code-viewer :origin-file="originFile"></code-viewer>
  </div>
</template>

<script>
import { bufferToText, getFileExtension, readBuffer } from '../../../src/util/file-util'

export default {
  name: 'CodeViewerView',
  data() {
    return {
      originFile: {},
      fileList: []
    }
  },
  updated() {
    console.info(this.fileList)
  },
  methods: {
    async previewFile(fileObject) {
      try {
        const arrayBuffer = await readBuffer(fileObject)
        const text = await bufferToText(arrayBuffer)
        const language = getFileExtension(fileObject.name)
        this.originFile = {
          fileName: fileObject.name,
          rawFile: fileObject,
          text,
          language
        }
      } catch (e) {
        console.error(e)
      }
    },
    handleChange(file, fileList) {
      this.originFile = file.originFile
      console.info(file, fileList)
      this.previewFile(this.originFile)
    }
  },
  watch: {},
  components: {}
}
</script>
