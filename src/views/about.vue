<template>
  <div>
    <span>预获取 count 数据（3s 后得到预获取数据）</span>
    <span>{{ $store.state.count }}</span>
    <button @click="handleCountClick">点击增加Count</button>
  </div>
</template>

<script>
export default {
  // 函数会在组件实例化之前调用，所以它无法访问 this
  asyncData ({ store, /* route */ }) {
    return store.dispatch('initCount')
  },
  methods: {
    handleCountClick () {
      this.$store.dispatch('add')
    }
  }
}
</script>