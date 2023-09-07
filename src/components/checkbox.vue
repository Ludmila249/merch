<template>
  <div class="checkbox">
    <div v-if="themeCheckbox === 'typeSize'" class="size">
      <div class="size__size-distance">
        <label class="size__type-size">
          <input
            :id="elem.name"
            :name="elem.name"
            :value="elem.name"
            type="checkbox"
            @change="checkedItem(elem)"
          />
          <span>{{ elem.size }}</span>
        </label>
      </div>
    </div>
    <div v-else-if="themeCheckbox === 'typeColor'" class="color">
      <div class="color__color">
        <label class="color__color-check-box">
          <input
            :id="elem.name"
            :name="elem.name"
            :value="elem.name"
            type="checkbox"
            @change="checkedItem(elem)"
          />
          <span
            :class="bem('color__checkbox', { white: elem.background === '#fff' })"
            :style="{ backgroundColor: elem.background }"
          />
        </label>
      </div>
    </div>
    <div v-else class="standard">
      <label :for="elem.name" class="standard__standard">
        <input
          :id="elem.name"
          :name="elem.name"
          :value="elem.name"
          type="checkbox"
          @change="checkedItem(elem)"
        />
        <span />
        <p>{{ elem.label }}</p>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkbox-block',
  props: {
    elem: {
      type: Object,
      default: () => {},
    },
    listItem: {
      type: Object,
      default: () => {},
    },
    themeCheckbox: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    checkedItem(elem) {
      this.$emit('parameterToFilter', elem.name, this.listItem.category);
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.size {
  &__type-size input[type='checkbox'] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  &__type-size {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 12px;
    line-height: 12px;
  }

  &__type-size span {
    width: 62px;
    border: 1px solid #f2f2f2;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 0;
    color: #000;
    text-align: center;
    font-size: 12px;
    line-height: 12px;
  }
}

.standard {
  &__standard input[type='checkbox'] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  &__standard {
    display: flex;
    align-items: center;
    padding: 6px 0;
    color: #b3b3b3;
    font-size: 12px;
    line-height: 12px;
  }

  &__standard span {
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border-radius: 4px;
    background: #f2f2f2;
    margin-right: 10px;

    &::after {
      content: '';
      position: absolute;
      display: none;
      top: 4px;
      left: 4px;
      width: 10px;
      height: 5px;
      border-bottom: 2px solid #fff;
      border-left: 2px solid #fff;
      transform: rotate(-45deg);
    }
  }

  &__standard input:checked + span {
    background-color: #000;
  }

  &__standard input:checked + span::after {
    display: block;
  }

  &__standard input:checked + span + p {
    color: #000;
  }
}

.size {
  &__type-size input:checked + span {
    background-color: #f2f2f2;
  }
}

.color {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;

  &__color-check-box input[type='checkbox'] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  &__checkbox {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-right: 8px;
    cursor: pointer;
    border: none;

    &::after {
      content: '';
      position: absolute;
      display: none;
      top: 8px;
      left: 7px;
      width: 10px;
      height: 5px;
      border-bottom: 2px solid #fff;
      border-left: 2px solid #fff;
      transform: rotate(-45deg);
    }

    &_white {
      border: 1px solid #d1cece;

      &::after {
        border-bottom: 2px solid #000;
        border-left: 2px solid #000;
      }
    }
  }

  &__color-check-box input:checked + span::after {
    display: block;
  }
}
</style>
