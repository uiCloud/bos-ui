<script>
import ajax from './ajax'
import UploadDragger from './upload-dragger'

export default {
  inject: [ 'uploader' ],
  components: {
    UploadDragger
  },
  props: {
    // ====== style ======
    disabled: Boolean, // 是否禁用上传组件
    autoUpload: Boolean, // 是否自动上传
    drag: Boolean, // 是否启用拖拽上传
    // ====== user interface ======
    action: {
      type: String,
      required: true
    }, //上传的 url 地址
    limit: Number, // 允许上传的最大文件数
    name: {
      type: String,
      default: 'file'
    }, // 上传的文件名, 赋值给 input 原生参数
    accept: String, // 接受上传的类型，如 '.jpg,.jpeg,.png,.gif', 赋值给 input 原生参数
    multiple: Boolean, // 是否支持多选文件, 赋值给 input 原生参数
    fileList: Array, // 上传的文件列表
    // ====== post ====== //
    headers: Object, // 上传的请求头
    httpRequest: {
      type: Function,
      default: ajax
    }, // 默认覆盖的上传行为，可以自定义实习
    // ====== hooks ====== //
    onStart: Function,
    onExceed: Function,
    onRemove: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function
  },
  data() {
    return {
      reqs: {}
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null
        this.$refs.input.click()
      }
    },
    handleChange(event) {
      const files = event.target.files

      if (!files) {
        return
      }
      this.uploadFileList(files)
    },
    uploadFileList(files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList)
        return
      }
      // 将具有 length 属性的 arguments 转换为数组
      let postFiles = Array.prototype.slice.call(files)
      if (postFiles.length === 0) {
        return
      }
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1)
      }
      postFiles.forEach((file) => {
        this.onStart(file)
        if (this.autoUpload) {
          this.upload(file)
        }
      })
    },
    upload(file) {
      this.$refs.input.value = null
      // 没有定义 beforeUpload
      if (!this.beforeUpload) {
        return this.post(file)
      }

      const before = this.beforeUpload(file)
      // beforeUpload 存在并返回 promise
      if (before && before.then) {
        before.then((processedFile) => {
          const fileType = Object.prototype.toString.call(processedFile)
          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if (fileType === '[object Blob]') {
              processedFile = new File([ processedFile ], file.name, {
                type: file.type
              })
            }
            for (const property in file) {
              // eslint-disable-next-line no-prototype-builtins
              if (file.hasOwnProperty(property)) {
                processedFile[property] = file[property]
              }
            }
            this.post(processedFile)
          } else {
            this.post(file)
          }
        }, () => {
          this.onRemove(null, file)
        })
      }
      // 如果 beforeUpload 返回 true 则上传
      else if (before === true) {
        this.post(file)
      } else {
        // 如果 beforeUpload 返回 false 直接移除文件
        this.onRemove(null, file)
      }
    },
    post(file) {
      const { uid } = file
      const options = {
        headers: this.headers,
        file,
        filename: this.name,
        action: this.action,
        onProgress: (e) => {
          this.onProgress(e, file)
        },
        onSuccess: (res) => {
          this.onSuccess(res, file)
          delete this.reqs[uid]
        },
        onError: (err) => {
          this.onError(err, file)
          delete this.reqs[uid]
        }
      }
      const req = this.httpRequest(options)
      this.reqs[uid] = req
      if (req && req.then) {
        req.then(options.onSuccess, options.onError)
      }
    }
  },
  render(h) {
    const {
      accept,
      name,
      multiple,
      disabled,
      drag,
      handleChange,
      handleClick
    } = this
    return (
      <div
        class='b-upload'
        on-click={handleClick}
      >
        {
          drag
            ? <upload-dragger disabled={disabled}>{this.$slots.default}</upload-dragger>
            : this.$slots.default
        }
        <input
          on-change={handleChange}
          name={name}
          multiple={multiple}
          accept={accept}
          type='file'
          ref='input'
        />
      </div>
    )
  }
}
</script>
