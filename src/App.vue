<template>
  <div id="app">
    <header>
      <router-link :to="{ name: 'PAGE_HOME' }">Home</router-link>
      <router-link :to="{ name: 'PAGE_ABOUT' }">About</router-link>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>