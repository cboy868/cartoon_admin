<template>
  <div class="header-new">
      <img :src="maxLogo" key="max-logo" class="logo"/>
    <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import './header-new.less'
export default {
  name: 'HeaderNew',
  components: {
    siderTrigger,
  },
  props: {
    collapsed: Boolean,
    maxLogo:''
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
