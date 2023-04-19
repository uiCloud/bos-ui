<template>
  <div class="about">
    <h1>This is an upload page</h1>
    <b-upload action="#">
      <button>上传</button>
    </b-upload>
    <b-upload drag action="#">
    </b-upload>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  watch: {
  },
  components: {}
}
</script>
