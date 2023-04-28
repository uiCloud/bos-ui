<template>
  <li class='b-menu-item' @click.stop='handleClick' :class="{'active': isActive}">
    <slot></slot>
  </li>
</template>

<script>
import emit from '../../../src/util/emit'

export default {
  name: 'bMenuItem',
  mixins: [ emit ],
  props: {
    name: [ String, Number ],
    to: String
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.$on('on-update-active-name', (name) => {
      if (name === this.name) {
        this.isActive = true
        this.dispatch('bSubmenu', 'item-click', this)
        this.isRoute()
      } else {
        this.isActive = false
      }
    })
  },
  methods: {
    handleClick(e) {
      this.dispatch('bMenu', 'item-click', this)
      this.$emit('click', this)
      this.isRoute()
    },
    isRoute() {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>
