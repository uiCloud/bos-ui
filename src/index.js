import Switch from '../packages/switch'
import Upload from '../packages/upload'
import CodeViewer from '../packages/code-viewer'
import Menu from '../packages/menu'

const components = {
  bSwitch: Switch,
  bUpload: Upload,
  CodeViewer,
  Menu
}

const install = function(Vue, options = {}) {

  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })

  // Vue.prototype.$message = Message;
}

// 通过 script 标签引入时，在组件内部完成组件注册
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  Switch,
  Upload,
  CodeViewer,
  Menu
}
