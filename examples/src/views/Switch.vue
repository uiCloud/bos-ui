<template>
  <div class="about">
    <h1>This is an switch page</h1>
    <b-switch v-model="switchValue">
      <div slot="open">open</div>
      <div slot="close">close</div>
    </b-switch>
    <b-switch disabled type="info" v-model="switchValue">
      <div slot="open">打开123</div>
      <div slot="close">关闭123</div>
    </b-switch>
    <b-switch type="info" v-model="switchValue"></b-switch>
    <b-switch v-model="switchValue"></b-switch>
    <b-switch disabled v-model="switchValue"></b-switch>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      switchValue: false
    }
  },
  watch: {
    switchValue: {
      handler(val) {
        console.info(val)
      }
    }
  },
  components: {}
}
</script>
