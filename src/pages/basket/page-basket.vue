<template>
  <div class="container">
    <div class="page-basket">
      <bread-crumbs class="basket__bread-crumbs" />
      <div v-if="cartItems.length === 0" class="basket-empty page-basket__basket-empty">
        <h2 class="basket-empty__title">В&nbsp;корзине пока пусто</h2>
        <p class="basket-empty__text">
          Загляните в&nbsp;каталог, чтобы выбрать товары или найдите нужное в&nbsp;поиске
        </p>
        <router-link class="basket-empty__button" to="/catalog">Перейти в каталог</router-link>
      </div>
      <div v-else class="basket page-basket__basket">
        <div class="basket__list-product">
          <h1 class="basket__title">Корзина</h1>
          <basket-product
            v-for="(item, index) in cartItems"
            :key="item.id"
            :item="item"
            @deleteProductFromBasket="deleteProductFromBasket(index)"
            @decrement="decrement(index)"
            @increase="increase(index)"
          />
        </div>
        <div class="basket__price">
          <div class="basket__row">
            <p class="basket__text">Товары, {{ quantityProductInBasket }} шт.</p>
            <p class="basket__text">{{ cardTotalCost }} ₽</p>
          </div>
          <div class="basket__row">
            <p class="basket__emphasis">Итого</p>
            <p class="basket__emphasis basket__total-price">{{ cardTotalCost }} ₽</p>
          </div>
          <button class="basket__button">Заказать</button>
          <div class="basket__checkbox">
            <span class="basket__checked" />
            <p class="basket__checkbox-text">
              Соглашаюсь с&nbsp;<router-link class="basket__rules" to="/terms-use"
                >правилами пользования интернет-магазина
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'page-basket',
  data() {
    return {
      sumPriceProduct: 0,
    };
  },
  computed: {
    ...mapState(['cartItems']),
    cardTotalCost() {
      let result = [];
      if (this.cartItems.length) {
        for (const item of this.cartItems) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce((sum, el) => {
          return sum + el;
        });
      }

      return result;
    },
    quantityProductInBasket() {
      let quantity = [];
      if (this.cartItems.length) {
        for (const item of this.cartItems) {
          quantity.push(item.quantity);
        }
        quantity = quantity.reduce((sum, el) => sum + el);
      }
      return quantity;
    },
  },
  mounted() {},
  methods: {
    ...mapActions(['deleteFromBasket', 'DECREMENT_ITEM_CARD', 'INCREASE_ITEM_CARD']),
    deleteProductFromBasket(index) {
      this.deleteFromBasket(index);
    },
    decrement(index) {
      this.DECREMENT_ITEM_CARD(index);
    },
    increase(index) {
      this.INCREASE_ITEM_CARD(index);
    },
  },
};
</script>

<style src="./page-basket.less" lang="less" />
