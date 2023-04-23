<script>
export default {
  name: 'bIcon',
  props: {
    type: String
  },
  render() {
    return <i class={this.type}></i>
  }
}
</script>
