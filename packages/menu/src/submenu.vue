<template>
  <li class="b-submenu" @click.stop="handleClick" :class="{'is-opened': isActive}">
    <div class="b-menu-title">
      <slot name="title"></slot>
      <i class="b-arrow" :class="{'is-active': isActive}"></i>
    </div>
    <slider-transition>
      <ul class="b-menu" v-show="isActive">
        <slot></slot>
      </ul>
    </slider-transition>
  </li>
</template>

<script>
import sliderTransition from '../../../packages/slider'

export default {
  name: 'bSubmenu',
  components: {
    sliderTransition
  },
  inject: [ 'rootMenu' ],
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.$on('item-click', (name) => {
      this.isActive = true
    })
    this.isActive = this.rootMenu.allOpend
  },
  methods: {
    handleClick() {
      this.$emit('click', this)
      if (this.rootMenu.uniqueOpened) {
        this.$parent.$children.forEach((item) => {
          if (item !== this) {
            item.isActive = false
          }
        })
      }
      this.isActive = !this.isActive
    }
  }
}
</script>
