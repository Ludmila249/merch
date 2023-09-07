<template>
  <div class="container">
    <div class="page-wishlist">
      <bread-crumbs class="page-wishlist__bread-crumbs" />
      <h1 class="page-wishlist__title">Избранное</h1>
      <div v-if="!wishlistProducts.length" class="page-wishlist__empty-block">
        <h2 class="page-wishlist__title-empty-block">Ещё не&nbsp;готовы к&nbsp;покупке?</h2>
        <p class="page-wishlist__text-empty-block">
          Жмите <img src="../../images/like.svg" alt="" /> на&nbsp;странице товара и&nbsp;добавляйте
          сюда&nbsp;то, что нравится.
        </p>
      </div>
      <div v-if="wishlistProducts.length" class="page-wishlist__wrap-card">
        <card-block
          v-for="card in wishlistProducts"
          :key="card.id"
          :card="card"
          class="page-wishlist__card"
          @clickCardProductInCatalog="clickCardProductInCatalog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'page-wishlist',
  computed: {
    ...mapState(['wishlistProducts']),
  },
  methods: {
    clickCardProductInCatalog(idProduct) {
      this.$router.push({ path: '/product-details', query: { product: idProduct } });
    },
  },
};
</script>

<style src="./page-wishlist.less" lang="less" />
