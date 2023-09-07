<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li>
        <button class="pagination__button pagination__button_prev">
          <img src="../images/arrow.svg" />
        </button>
      </li>
      <li v-for="item in itemNumbers" :key="item">
        <button
          :class="{ pagination__button: true, 'active-page': numbers }"
          @click="handlerClick(item)"
        >
          {{ item }}
        </button>
      </li>
      <li>
        <button class="pagination__button pagination__button_next">
          <img src="../images/arrow.svg" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'pagination-block',
  components: {},
  props: {
    numbers: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    itemNumbers() {
      return this.numbers;
    },
  },
  methods: {
    handlerClick(index) {
      this.$emit('clickOnNumber', index);
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.pagination {
  width: fit-content;

  &__list {
    display: flex;
    align-items: center;
  }

  &__button {
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #f2f2f2;
    background-color: inherit;
    color: #b3b3b3;
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    margin-right: 8px;
    display: flex;
    cursor: pointer;

    &_prev {
      transform: rotate(180deg);
    }

    &_active {
      box-shadow: 0 0 24px rgba(0, 0, 0, 0.08);
      color: #000;
    }
  }
}

.active-page {
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.2);
  color: #000;
}
</style>
