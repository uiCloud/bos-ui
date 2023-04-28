<template>
  <li class='b-menu-group'>
    <div class='b-menu-title' v-if="title && title !== ''" @click.stop="">{{ title }}</div>
    <ul class='b-menu'>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'bMenuGroup',
  props: {
    title: String,
    default: ''
  }
}
</script>
