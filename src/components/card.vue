<template>
  <div class="card" @click="clickCardProductInCatalog">
    <img class="card__photo-product" :src="card.src" alt="" />
    <div>
      <p class="card__type-product">{{ card.type }}</p>
      <p class="card__name" v-html="card.name" />
      <p class="card__price">{{ card.price }} ₽</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-block',
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    clickCardProductInCatalog() {
      this.$emit('clickCardProductInCatalog', this.card.id);
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 24px;
  border: 1px solid #f2f2f2;
  background: #fff;
  padding: 32px;
  transition: 0.2s ease-in-out;

  @media (max-width: 550px) {
    padding: 15px;
  }

  &__photo-product {
    width: 100%;
    margin: 0 auto;
  }

  &__type-product {
    color: #b3b3b3;
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 4px;
  }

  &__name {
    color: #000;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 12px;

    @media @tablet {
      font-size: 16px;
    }

    @media (max-width: 550px) {
      font-size: 14px;
    }
  }

  &__price {
    color: #a6a6a6;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    transition: 0.2s ease-in-out;

    @media @tablet {
      font-size: 16px;
    }

    @media (max-width: 550px) {
      font-size: 14px;
    }
  }

  &:hover,
  &:focus {
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.08);

    .card__price {
      color: #30f;
    }
  }
}
</style>
