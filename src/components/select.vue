<template>
  <div :class="bem('select', { open })">
    <div class="select__header" @click="openMenuSelect">
      <slot /><img src="../images/arrow.svg" class="select__arrow" />
    </div>
    <div v-if="openItemSelect" class="select__main">
      <div v-for="item in items" :key="item.index" class="select__item" @click="selectOption(item)">
        <p>{{ item.parameter }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-block',
  components: {},
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      open: false,
      openItemSelect: false,
      selectItem: null,
    };
  },
  // mounted() {
  //   document.addEventListener('click', this.hideSelect.bind(this), true);
  // },
  // destroyed() {
  //   document.removeEventListener('click', this.hideSelect.bind);
  // },
  methods: {
    openMenuSelect() {
      this.openItemSelect = !this.openItemSelect;
      this.open = !this.open;
    },
    selectOption(item) {
      this.$emit('select', item);
      this.openItemSelect = false;
    },
    hideSelect() {
      this.openItemSelect = false;
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.select {
  // box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.15);

  &_open {
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    overflow: hidden;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    color: #000;
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    border-radius: 8px;
    border: 1px solid #f2f2f2;
    cursor: pointer;
    overflow: hidden;
  }

  &__select-name {
    color: #b3b3b3;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
    margin-left: 4px;
  }

  &__arrow {
    display: block;
    margin-left: 15px;
    transform: rotate(90deg);
  }

  &__main {
    height: 100px;
    overflow-y: scroll;
    width: 100%;
    background-color: #fff;

    -ms-overflow-style: none;
    scrollbar-width: 5px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    color: #000;
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    line-height: 100%;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
    }
  }

  &__without-transfer {
    overflow: scroll;
    white-space: nowrap;
  }
}
</style>
