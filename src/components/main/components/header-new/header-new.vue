<template>
  <div class="header-new">
    <div class="header-left">
      <img :src="maxLogo" key="max-logo" class="logo">
      <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    </div>
    <header-menu :menu-list="menuList" @on-select="handleSelect"></header-menu>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from "./sider-trigger";
import HeaderMenu from "./header-menu";
import "./header-new.less";
export default {
  name: "HeaderNew",
  components: {
    siderTrigger,
    HeaderMenu
  },
  props: {
    collapsed: Boolean,
    maxLogo: "",
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList;
    }
  },
  methods: {
    handleSelect(name) {
      this.$emit("on-select", name);
    },
    handleCollpasedChange(state) {
      this.$emit("on-coll-change", state);
    }
  }
};
</script>
<style scoped>
.header-left {
  width: 210px;
  float: left;
  height: 48px;
  overflow: hidden;
}
</style>
