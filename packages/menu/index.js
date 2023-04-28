import Menu from './src/menu'
import MenuGroup from './src/menu-group'
import MenuItem from './src/menu-item'
import Submenu from './src/submenu'

Menu.install = function(Vue) {
  Vue.component(Menu.name, Menu)
}

MenuGroup.install = function(Vue) {
  Vue.component(MenuGroup.name, MenuGroup)
}

MenuItem.install = function(Vue) {
  Vue.component(MenuItem.name, MenuItem)
}

Submenu.install = function(Vue) {
  Vue.component(Submenu.name, Submenu)
}

export default {
  Menu,
  MenuGroup,
  MenuItem,
  Submenu
}
