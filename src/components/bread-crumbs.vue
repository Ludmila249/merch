<template>
  <nav class="bread-crumbs">
    <ul class="bread-crumbs__list-link">
      <li>
        <router-link to="/">Главная</router-link>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="index" class="bread-crumbs__delimiter">
        <span class="bread-crumbs__separator" />
        <router-link :to="crumb.path">{{ crumb.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'bread-crumbs',
  components: {},
  computed: {
    crumbs() {
      const routes = this.$route.matched;
      return routes.map((route) => ({
        name: route.name,
        path: route.path,
      }));
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.bread-crumbs {
  display: flex;
  align-items: center;

  &__list-link {
    display: flex;
    align-items: center;
    margin: 0;
  }

  &__item {
    color: #b3b3b3;
    text-align: center;
    font-size: 12px;
    line-height: 12px;

    &_active {
      color: #000;
    }
  }

  &__arrow {
    margin: 0 5px;
    width: 15px;
    height: 15px;
    border: none;

    path {
      stroke: #b3b3b3;
    }
  }

  &__separator {
    display: block;
    width: 5px;
    height: 5px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    margin: 0 7px;
    transform: rotate(-45deg);
    margin-bottom: -2px;
  }

  &__delimiter {
    display: flex;
    align-items: center;
  }
}
</style>
