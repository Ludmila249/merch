<template>
  <div class="page-not-found">
    <div class="container">
      <div class="page-not-found__block">
        <img src="../../images/page-not-found.png" alt="" />
        <h2 class="page-not-found__title">Такой страницы не&nbsp;существует</h2>
        <router-link to="/" class="page-not-found__router">Вернуться на главную</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-not-found',
};
</script>

<style src="./page-not-found.less" lang="less" />
