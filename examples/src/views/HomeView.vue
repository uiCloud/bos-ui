<template>
  <div class="home">
    <p>This is home</p>
    <b-switch v-model="switchValue">
      <div slot="open">开</div>
      <div slot="close">关</div>
    </b-switch>
    <b-switch disabled type="info" v-model="switchValue">
      <div slot="open">开</div>
      <div slot="close">关</div>
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
      switchValue: true
    }
  },
  components: {}
}
</script>
