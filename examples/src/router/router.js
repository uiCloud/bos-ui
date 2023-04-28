import SwitchView from '@/views/Switch'
import UploadView from '@/views/Upload'
import CodeViewerView from '@/views/CodeViewer'
import MenuView from '@/views/Menu'

const componentViews = [ {
  route: [ {
    path: '/switch',
    name: 'switch',
    meta: {
      text: 'Switch 开关'
    },
    component: SwitchView
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      text: 'Upload 上传'
    },
    component: UploadView
  },
  {
    path: '/code-viewer',
    name: 'code-viewer',
    meta: {
      text: 'Code Editor 代码编辑器'
    },
    component: CodeViewerView
  },
  {
    path: '/menu',
    name: 'menu',
    meta: {
      text: 'Menu 菜单'
    },
    component: MenuView
  } ]
} ]

export default componentViews
