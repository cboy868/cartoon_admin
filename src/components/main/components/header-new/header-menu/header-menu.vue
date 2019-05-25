<template>
  <Menu
    ref="menu"
    mode="horizontal"
    :theme="'dark'"
    :active-name="activeName"
    class="header-menu"
    @on-select="handleSelect"
  >
    <template v-for="item in menuList">
      <menu-item :key="`menu-${item.name}`" :name="item.name" :parent-item="item"><span>{{ showTitle(item) }}</span></menu-item>
      <!-- <menu-item :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
        <span>{{ showTitle(item) }}</span>
      </menu-item> -->
    </template>
  </Menu>
</template>
<script>
import "./header-menu.less";
import mixin from "../mixin";
import { getUnion } from "@/libs/tools";
export default {
  name: "HeaderMenu",
  mixins: [mixin],
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
    activeName: {
      type: String,
      default: ""
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openedNames: []
    };
  },
  methods: {
    handleSelect(name) {
      this.$emit("on-select", name);
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched
        .map(item => item.name)
        .filter(item => item !== name);
    },
    updateOpenName(name) {
      if (name === this.$config.homeName) this.openedNames = [];
      else this.openedNames = this.getOpenedNamesByActiveName(name);
    }
  },
  watch: {
    activeName(name) {
      if (this.accordion)
        this.openedNames = this.getOpenedNamesByActiveName(name);
      else
        this.openedNames = getUnion(
          this.openedNames,
          this.getOpenedNamesByActiveName(name)
        );
    },
    openNames(newNames) {
      this.openedNames = newNames;
    },
    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    }
  },
  mounted() {
    this.openedNames = getUnion(
      this.openedNames,
      this.getOpenedNamesByActiveName(name)
    );
  }
};
</script>