<template>
  <div>
    <h1>Page About</h1>
    <span>{{ $store.state.count }}</span>
    <button @click="handleCountClick">点击增加Count</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleCountClick () {
      this.$store.dispatch('add')
    }
  }
}
</script>