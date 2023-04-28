<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/switch">Switch</router-link> |
      <router-link to="/upload">Upload</router-link> |
      <router-link to="/code-viewer">CodeViewer</router-link> |
      <router-link to="/menu">Menu</router-link> |
    </nav>
    <router-view/>
  </div>
</template>

<style lang="less">
</style>
