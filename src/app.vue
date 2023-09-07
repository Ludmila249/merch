<template>
  <div class="app">
    <header-block />
    <router-view />
    <footer-block />
  </div>
</template>

<script>
import HeaderBlock from '@/layout/header.vue';
import FooterBlock from '@/layout/footer.vue';

export default {
  name: 'app',
  components: {
    HeaderBlock,
    FooterBlock,
  },
  data() {
    return {
      quantityHeaderIconBasket: 0,
    };
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', this.onWindowsResize);
    this.onWindowsResize();
    this.$store.commit('initializeStore');
  },
  methods: {
    onWindowsResize() {
      this.$store.commit('setCssVars', getComputedStyle(document.body));
    },
  },
};
</script>

<style src="./app.less" lang="less" />
