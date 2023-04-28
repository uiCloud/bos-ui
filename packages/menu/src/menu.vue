<script>
import emit from '../../../src/util/emit'

export default {
  name: 'bMenu',
  mixins: [ emit ],
  data() {
    return {
      currentActiveName: this.activeName
    }
  },
  provide() {
    return {
      rootMenu: this
    }
  },
  props: {
    activeName: {
      type: String,
      default: ''
    },
    uniqueOpened: {
      type: Boolean,
      default: false
    },
    allOpend: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$on('item-click', this.handleItemClick)
    this.updateActiveName()
  },
  watch: {
    currentActiveName(val) {
      this.updateActiveName()
    }
  },
  methods: {
    updateActiveName() {
      this.broadcast('bSubmenu', 'on-update-active-name', false)
      this.broadcast('bMenuItem', 'on-update-active-name', this.currentActiveName)
    },
    handleItemClick(item) {
      this.currentActiveName = item.name
      this.updateActiveName()
    }
  },
  render() {
    return <ul class='b-menu'>{this.$slots.default}</ul>
  }
}
</script>
