<template>
  <el-select @change="changeOption" :value="value" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  created () {
    this.getChannelOptions()
  },
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    changeOption (changeId) {
      if (changeId === '') changeId = null
      this.$emit('input', changeId)
    }
  }

}
</script>

<style lang="less" scoped>
</style>
