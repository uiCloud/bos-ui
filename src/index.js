import Switch from '../packages/switch'

const components = {
  bSwitch: Switch
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
  Switch
}
