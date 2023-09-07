<template>
  <div class="basket-product">
    <div class="basket-product__wrap-product">
      <img class="basket-product__img-product" :src="item.src" alt="" />
      <div class="basket-product__container">
        <div class="basket-product__column">
          <p class="basket-product__name-product">{{ item.type }}</p>
          <p class="basket-product__params">{{ item.color }}</p>
          <p class="basket-product__params">{{ item.size[item.sizeIdx] }}</p>
          <p class="basket-product__params">{{ item.id }}</p>
          <p class="basket-product__params">Оплата онлайн</p>
        </div>
        <div class="basket-product__count">
          <button
            class="basket-product__button-quantity basket-product__button-quantity_less"
            @click="decrementItem(item.quantity)"
          />
          <p class="basket-product__quantity">{{ item.quantity }}</p>
          <button
            class="basket-product__button-quantity basket-product__button-quantity_more"
            @click="increaseItem"
          />
        </div>
        <div class="basket-product__wrap-info">
          <p class="basket-product__price">{{ item.price }} ₽</p>
          <button class="basket-product__delete" @click="deleteProductFromBasket">
            <span />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'basket-product',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions(['addToCart']),
    deleteProductFromBasket() {
      this.$emit('deleteProductFromBasket');
    },
    decrementItem() {
      this.$emit('decrement');
    },
    increaseItem() {
      this.$emit('increase');
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.basket-product {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media @tablet {
    display: block;
  }

  &__list-product {
    width: 75%;
    background-color: #fff;
    border-radius: 32px;
    padding: 25px 40px;

    @media @tablet {
      width: auto;
      margin: 0 20px;
      margin-bottom: 20px;
      padding: 25px 20px;
    }
  }

  &__name-product {
    font-size: 20px;
    font-weight: 500;
    line-height: 100%;
    margin-bottom: 30px;
  }

  &__quantity {
    font-size: 18px;
    color: #868695;
  }

  &__wrap-product {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  &__img-product {
    max-width: 100px;
    border-radius: 20px;
    width: 100%;
    margin-right: 30px;
  }

  &__container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__count {
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__button-quantity {
    position: relative;
    width: 18px;
    height: 18px;
    border: 1px solid #ccc;
    background-color: inherit;
    border-radius: 3px;
    cursor: pointer;

    &_less::before {
      content: '';
      position: absolute;
      top: calc((100% - 2px) / 2);
      left: calc((100% - 10px) / 2);
      width: 10px;
      height: 2px;
      background-color: #868695;
    }

    &_more::after,
    &_more::before {
      content: '';
      position: absolute;
      top: calc((100% - 2px) / 2);
      left: calc((100% - 10px) / 2);
      width: 10px;
      height: 2px;
      background-color: #868695;
    }

    &_more::after {
      transform: rotate(90deg);
    }
  }

  &__info-product {
    width: 100%;
  }

  &__column {
    width: 30%;
    height: auto;
    margin-bottom: 8px;
  }

  &__price {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  &__params {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 100%;
    color: #868695;
  }

  &__wrap-info {
    width: 20%;
    text-align: right;
  }

  &__delete {
    background-color: #fff;
    cursor: pointer;
    margin-top: 10px;
    width: 30px;
    height: 30px;

    span {
      display: block;
      width: 20px;
      height: 25px;
      background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2218%22%20height%3D%2219%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.545%200h5.182c.954%200%201.727.773%201.727%201.727v.864h2.591c.954%200%201.728.773%201.728%201.727v1.727c0%20.954-.774%201.728-1.727%201.728h-.07l-.794%209.5c0%20.954-.774%201.727-1.727%201.727H4.818c-.954%200-1.727-.773-1.724-1.656l-.798-9.571h-.069A1.727%201.727%200%200%201%20.5%206.045V4.318c0-.954.773-1.727%201.727-1.727h2.591v-.864C4.818.773%205.591%200%206.545%200ZM4.818%204.318h-2.59v1.727h13.817V4.318H4.818Zm9.425%203.455H4.03l.79%209.5h8.636l.003-.072.785-9.428Zm-2.516-6.046v.864H6.545v-.864h5.182Z%22%20fill%3D%22%23BDBDCB%22%2F%3E%3C%2Fsvg%3E);
      background-size: 100%;
      background-color: #fff;
      background-repeat: no-repeat;
    }
  }
}
</style>
