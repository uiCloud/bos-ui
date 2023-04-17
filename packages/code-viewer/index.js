import CodeViewer from './code-viewer'

CodeViewer.install = function(Vue) {
  Vue.component(CodeViewer.name, CodeViewer)
}

export default CodeViewer
