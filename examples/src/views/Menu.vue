<template>
  <div class="switch-viewer">
    <h1>This is an menu page</h1>
    <b-menu :all-opend="true">
      <b-menu-item name="1">
        <span>安装</span>
      </b-menu-item>
      <b-menu-item name="1">
        <span>快速开始</span>
      </b-menu-item>
      <b-submenu name="2">
        <template slot="title">
          <span>UI Elements</span>
        </template>
        <b-menu-group :title="menu.title" v-for="(menu, i) in nav" :key="i">
          <b-menu-item
              :name="i+'-'+k"
              :to="submenu.path"
              v-for="(submenu,k) in menu.route"
              :key="k"
          >{{ submenu.meta.text }}
          </b-menu-item>
        </b-menu-group>
      </b-submenu>
    </b-menu>
  </div>
</template>

<script>
import componentViews from '../router/router'

export default {
  name: 'MenuView',
  data() {
    return {
      nav: componentViews
    }
  },
  components: {}
}
</script>
