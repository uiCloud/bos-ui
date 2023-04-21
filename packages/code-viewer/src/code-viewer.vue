<template>
  <div class='code-viewer'>
    <div ref="codeContainer" class="monaco-editor">
    </div>
  </div>
</template>

<script>
// https://github.com/microsoft/monaco-editor/blob/main/samples/browser-esm-webpack-monaco-plugin/index.js
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution'
import 'monaco-editor/esm/vs/basic-languages/go/go.contribution'
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution'
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'

export default {
  name: 'CodeViewer',
  props: {
    width: {
      type: [ String, Number ],
      default: '100%'
    },
    height: {
      type: [ String, Number ],
      default: '100%'
    },
    code: {
      type: String,
      default: '// This is custom editor \n'
    },
    language: {
      type: String,
      default: 'javascript'
    },
    theme: {
      type: String,
      default: 'vs'
    },
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      supportLanguages: [ 'javascript', 'java', 'sql', 'css', 'cpp', 'go', 'html' ],
      editorModel: null,
      defaultOptions: {
        foldingStrategy: 'indentation', // 代码可分小段折叠
        overviewRulerBorder: false, // 不要滚动条的边框
        renderLineHighlight: 'gutter', // 当前行突出显示方式
        contextmenu: true, // 启用上下文菜单
        copyWithSyntaxHighlighting: false, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
        cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
        lineNumbers: 'on', // 控制行号的出现on | off
        scrollbar: { // 滚动条设置
          verticalScrollbarSize: 4, // 竖滚动条
          horizontalScrollbarSize: 6 // 横滚动条
        },
        readOnly: false, // 是否只读 Defaults to false | true
        minimap: { // 关闭小地图
          enabled: true
        },
        cursorStyle: 'line', // 光标样式
        fontSize: 14, // 字体大小
        tabSize: 2, // tab缩进长度
        automaticLayout: true, // 自动布局
        autoIndent: true, // 自动缩进
        roundedSelection: true, // 选区是否有圆角
        scrollBeyondLastLine: false // 是否可以滚到最后一行之后
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMonaco()
    })
  },
  destroyed() {
    if (typeof this.editorModel !== 'undefined') {
      this.editorModel.dispose()
    }
  },
  methods: {
    initMonaco() {
      if (this.$refs.codeContainer) {
        // 初始化编辑器，确保dom已经渲染
        this.editorModel = monaco.editor.create(this.$refs.codeContainer, this.editorOptions)
      }
    }
  },
  computed: {
    editorOptions() {
      return Object.assign({}, this.defaultOptions, this.options, {
        value: this.code, // 编辑器初始显示文字
        language: this.language, // 高亮语言
        theme: this.theme // 官方自带三种主题vs, hc-black, or vs-dark
      })
    }
  },
  watch: {
    // originFile: {
    //   handler(newVal) {
    //     console.info(newVal)
    //     this.monacoEditor.setValue(newVal.text)
    //     this.monacoEditor.updateOptions({
    //       language: newVal.language
    //     })
    //     this.monacoEditor.focus()
    //     this.monacoEditor.setPosition({
    //       lineNumber: 0,
    //       column: 0
    //     })
    //     // this.monacoEditor.setScrollPosition(0)
    //     this.monacoEditor.revealLine(0)
    //   }
    // }
  }
}
</script>
