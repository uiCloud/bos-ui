<script>
import { fileToObject, getFileItem, UPLOAD_FILE_STATUS } from './util'
import { generateUUID } from '../../../src/util/algorithm'
import Upload from './upload'

function noop() {
}

export default {
  name: 'bUpload',
  components: {
    Upload
  },
  provide() {
    return {
      uploader: this
    }
  },
  props: {
    // ====== style ======
    disabled: Boolean,
    autoUpload: Boolean,
    drag: Boolean,
    // ====== user interface ======
    action: {
      type: String,
      required: true
    },
    limit: Number,
    name: {
      type: String,
      default: 'file'
    },
    accept: String,
    multiple: Boolean,
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    // ====== post ======
    headers: Object,
    httpRequest: Function,
    // ====== hooks ======
    onProgress: {
      type: Function,
      default: noop
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onExceed: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      uploadFileList: []
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler(fileList) {
        // 清洗文件数据，如果没有 uid，就加上 uid
        this.uploadFileList = fileList.map((item) => {
          item.uid = item.uid || generateUUID()
          return item
        })
      }
    }
  },
  methods: {
    handleStart(file) {
      const fileObj = fileToObject(file)
      this.uploadFileList.push(fileObj)
      this.onChange(fileObj, this.uploadFileList)
    },
    handleProgress(event, file) {
      const fileObj = getFileItem(file, this.uploadFileList)
      this.onProgress(event, fileObj, this.uploadFileList)
      fileObj.status = UPLOAD_FILE_STATUS.PROGRESS
      fileObj.percent = event.percent || 0
    },
    handleSuccess(res, file) {
      const fileObj = getFileItem(file, this.uploadFileList)
      if (fileObj) {
        fileObj.status = UPLOAD_FILE_STATUS.SUCCESS
        fileObj.response = res
        this.onSuccess(res, fileObj, this.uploadFileList)
        this.onChange(fileObj, this.uploadFileList)
      }
    },
    handleError(error, file) {
      const fileObj = getFileItem(file, this.uploadFileList)
      fileObj.status = UPLOAD_FILE_STATUS.FAIL

      this.onError(error, fileObj, this.uploadFileList)
      this.onChange(fileObj, this.uploadFileList)
    }
  },
  beforeDestroy() {
    this.uploadFileList.forEach((file) => {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url)
      }
    })
  },
  submit() {
    this.uploadFileList
      .filter((file) => file.status === UPLOAD_FILE_STATUS.HANDLE)
      .forEach((file) => {
        this.$refs['upload-inner'].upload(file.originFile)
      })
  },
  render(h) {
    const uploadData = {
      props: {
        // ====== style ======
        disabled: this.disabled,
        autoUpload: this.autoUpload,
        drag: this.drag,
        // ====== user interface ======
        action: this.action,
        limit: this.limit,
        name: this.name,
        accept: this.accept,
        multiple: this.multiple,
        fileList: this.uploadFileList,
        // ====== post ======
        headers: this.headers,
        httpRequest: this.httpRequest,
        // ====== hooks ======
        onExceed: this.onExceed,
        onStart: this.handleStart,
        onProgress: this.handleProgress,
        onSuccess: this.handleSuccess,
        onError: this.handleError
      },
      ref: 'upload-inner'
    }
    // 触发文件选择框的内容
    const trigger = this.$slots.trigger || this.$slots.default
    const uploadComponent = <upload {...uploadData}>{trigger}</upload>
    return (
      <div>
        {
          this.$slots.trigger
            ? [ uploadComponent, this.$slots.default ]
            : uploadComponent
        }
        {this.$slots.tip}
      </div>
    )
  }
}
</script>
