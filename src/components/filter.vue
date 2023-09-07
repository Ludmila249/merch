<template>
  <div class="catalog">
    <button class="filter__open-filter-mobile" @click="openedFilterMobile">
      <img class="filter__icon-filter" src="../images/filter-icon.jpg" alt="" />
    </button>
    <div :class="bem('catalog__filter-wrap', { openFilterMobile })" @click.self="closedFilter">
      <button class="filter__close-filter-mobile" @click="closedFilter">
        <img src="../images//cross.png" alt="" />
      </button>
      <div :class="bem('catalog__filter filter', { openFilterMobile })">
        <div class="filter__chapter">
          <p class="filter__chapter-title">Цена</p>
          <div class="filter__price">
            <p class="filter__price-input">
              от<input
                :value="valueRange[0]"
                type="number"
                step="1"
                @change="handlerInput($event, 'min')"
              />₽
            </p>
            <p class="filter__price-input">
              до<input
                :value="valueRange[1]"
                type="number"
                step="1"
                @change="handlerInput($event, 'max')"
              />₽
            </p>
          </div>
          <el-slider v-model="valueRange" range :show-tooltip="false" :min="100" :max="24000" />
        </div>
        <div v-for="item in filter" :key="item.title" class="filter__section">
          <p class="filter__section-title">{{ item.title }}</p>
          <div
            :class="
              bem('filter__wrap-item', {
                itemsRow: item.themeCheckbox === 'typeSize' || item.themeCheckbox === 'typeColor',
              })
            "
          >
            <checkbox-block
              v-for="elem in item.listItemFiltered"
              :key="elem.name"
              :elem="elem"
              :list-item="item"
              :theme-checkbox="item.themeCheckbox"
              :class="bem('checkbox-block', { size: item.themeCheckbox === 'typeSize' })"
              @parameterToFilter="listChecked"
            />
          </div>
        </div>
        <div class="catalog__button">
          <button type="button" class="catalog__button-reset" @click="filterReset">Сбросить</button>
        </div>
      </div>
    </div>
    <div class="catalog__list-product">
      <div v-if="!sortedProducts.length" class="catalog__no-products">
        <p>Ничего не найдено</p>
      </div>
      <div class="catalog__list-wrap">
        <card-block
          v-for="card in paginationProduct"
          :key="card.vendorCode"
          class="catalog__card"
          :card="card"
          @clickCardProductInCatalog="clickCardProductInCatalog"
        />
      </div>
      <div class="catalog__catalog-pagination">
        <button
          class="catalog__catalog-pagination-button catalog__catalog-pagination-button_prev"
          :class="{ disable: pageNumberActive === 1 }"
          @click="paginationPrev"
        >
          <img src="../images/arrow.svg" alt="" />
        </button>
        <div
          v-for="page in pages"
          :key="page.page"
          class="page"
          :class="{ pageSelected: page === pageNumberActive }"
          @click="paginationPageClick(page)"
        >
          {{ page }}
        </div>
        <button
          class="catalog__catalog-pagination-button catalog__catalog-pagination-button_next"
          :class="{ disable: pageNumberActive === pages }"
          @click="paginationNext"
        >
          <img src="../images/arrow.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'filter-block',
  props: {
    sortingByQuantityCard: {
      type: Number,
      default: 12,
    },
    sortingBy: {
      type: String,
      default: 'Сортировка',
    },
    openFilterMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      minPrice: 100,
      maxPrice: 24000,
      valueRange: [100, 24000],
      sortedProducts: [],

      productPerPage: 12,
      pageNumberActive: 1,

      number: 0,
      arrayChecked: {
        color: [],
        size: [],
        gender: [],
        category: [],
      },
    };
  },
  computed: {
    ...mapState({
      catalog: (state) => state.bunker.catalog,
      filter: (state) => state.bunker.filter,
    }),
    ...mapGetters(['SEARCH_VALUE', 'selectedProductId']),
    pages() {
      return Math.ceil(this.sortedProducts.length / this.sortingByQuantityCard);
    },
    paginationProduct() {
      const from = (this.pageNumberActive - 1) * this.sortingByQuantityCard;
      const to = from + this.sortingByQuantityCard;
      return this.sortedProducts.slice(from, to);
    },
  },
  watch: {
    SEARCH_VALUE() {
      this.sortProductsBySearchValue(this.SEARCH_VALUE);
    },
    valueRange() {
      this.listChecked();
    },
    sortingBy() {
      this.listChecked();
    },
    sortingByQuantityCard() {
      this.pageNumberActive = 1;
      this.$router.push(`/catalog?page=${this.pageNumberActive}`);
    },
  },
  mounted() {
    this.sortedProducts = [...this.catalog];
    this.sortProductsBySearchValue(this.SEARCH_VALUE);
  },
  methods: {
    clickCardProductInCatalog(idProduct) {
      this.$router.push({ path: '/product-details', query: { product: idProduct } });
    },
    paginationPageClick(page) {
      this.pageNumberActive = page;
      this.$router.push(`/catalog?page=${this.pageNumberActive}`);
    },
    paginationPrev() {
      if (this.pageNumberActive > 1) {
        this.pageNumberActive -= 1;
        this.$router.push(`/catalog?page=${this.pageNumberActive}`);
      }
    },
    paginationNext() {
      if (this.pages > this.pageNumberActive) {
        this.pageNumberActive += 1;
        this.$router.push(`/catalog?page=${this.pageNumberActive}`);
      }
    },
    handlerInput(event, type) {
      const valueInp = +event.target.value;
      if (valueInp >= this.minPrice && valueInp <= this.maxPrice) {
        if (type === 'min') {
          this.valueRange = [valueInp, this.valueRange[1]];
        } else {
          this.valueRange = [this.valueRange[0], valueInp];
        }
      }
    },
    // handlerClick(index) {
    //   this.page = index - 1;
    // },
    listChecked(value, category) {
      this.sortedProducts = [...this.catalog];

      this.sortedProducts = this.sortedProducts.filter((item) => {
        return item.price >= this.valueRange[0] && item.price <= this.valueRange[1];
      });

      if (value && category) {
        const itemIndex = this.arrayChecked[category].indexOf(value);
        if (itemIndex !== -1) {
          this.arrayChecked[category].splice(itemIndex, 1);
        } else {
          this.arrayChecked[category].push(value);
        }
      }

      if (this.arrayChecked.color.length) {
        this.sortedProducts = this.sortedProducts.filter((elem) =>
          this.arrayChecked.color.some((e) => elem.color.includes(e))
        );
      }

      if (this.arrayChecked.size.length) {
        this.sortedProducts = this.sortedProducts.filter((elem) =>
          this.arrayChecked.size.some((e) => elem.size.includes(e))
        );
      }

      if (this.arrayChecked.category.length) {
        this.sortedProducts = this.sortedProducts.filter((elem) =>
          this.arrayChecked.category.some((e) => elem.category.includes(e))
        );
      }

      if (this.arrayChecked.gender.length) {
        this.sortedProducts = this.sortedProducts.filter((elem) =>
          this.arrayChecked.gender.some((e) => elem.gender.includes(e))
        );
      }

      if (this.sortingBy === 'По возрастанию цены') {
        this.sortedProducts = this.sortedProducts.sort((a, b) => a.price - b.price);
      }
      if (this.sortingBy === 'По убыванию цены') {
        this.sortedProducts = this.sortedProducts.sort((a, b) => b.price - a.price);
      }

      if (this.sortingBy === 'Сначала выгодные') {
        this.sortedProducts = this.sortedProducts.sort((a, b) => a.price - b.price);
      }

      if (this.sortingBy === 'По популярности') {
        this.sortedProducts = this.sortedProducts.sort(() => Math.random() - 0.5);
      }

      this.pageNumberActive = 1;
    },
    filterReset() {
      this.sortedProducts = [...this.catalog];
      this.arrayChecked.length = 0;
    },
    openedFilterMobile() {
      this.$emit('openFilter', this.openFilterMobile);
    },
    closedFilter() {
      this.$emit('closeFilter', this.openFilterMobile);
    },
    sortProductsBySearchValue(value) {
      this.sortedProducts = [...this.catalog];
      if (value) {
        this.sortedProducts = this.sortedProducts.filter(function (item) {
          return item.type.toLowerCase().includes(value.toLowerCase());
        });
      }
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.catalog {
  width: 100%;
  display: flex;

  @media @tablet {
    display: block;
  }

  &__filter-wrap {
    @media @tablet {
      position: fixed;
      top: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.41961);
      width: 100%;
      z-index: 3;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      opacity: 0;
      pointer-events: none;

      &_open-filter-mobile {
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  &__filter {
    @media @tablet {
      display: block;
      width: 100%;
      margin-left: auto;
    }
  }

  &__list-product {
    width: 100%;
    height: 100%;
  }

  &__list-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &__button {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 340px;
    padding: 32px;
    border: 1px solid #f2f2f2;
    background-color: #fff;
    border-radius: 24px;

    @media @tablet {
      margin-left: auto;
      border-radius: 0;
    }
  }

  &__button-reset {
    width: 100%;
    background-color: #000;
    font-size: 15px;
    line-height: 110%;
    font-weight: 500;
    color: #fff;
    padding: 20px 40px;
    transition: background 0.2s ease-in-out;

    &:hover {
      background-color: #30f;
    }
  }

  &__card {
    width: calc(100% / 3);

    @media (max-width: 1250px) {
      width: calc(100% / 2);
    }

    @media @tablet {
      width: calc(100% / 3);
    }

    @media (max-width: 720px) {
      width: calc(100% / 2);
    }

    @media (max-width: 400px) {
      width: 100%;
    }
  }

  &__no-products {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      display: block;
      padding: 200px 0;
      font-size: 36px;
      line-height: 100px;
      font-weight: 700;
      color: #b3b3b3;
    }
  }

  &__pagination {
    width: fit-content;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #000;
    backdrop-filter: blur(100px);

    &:hover {
      color: #fff;
    }
  }

  &__catalog-pagination {
    display: flex;
    width: fit-content;
    margin: 0 auto;
    align-items: center;
    margin-top: 32px;
  }

  &__catalog-pagination-button,
  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin: 0 5px;
    border-radius: 50%;
    color: #000;
    background-color: #f2f2f2;
    backdrop-filter: blur(100px);
    cursor: pointer;

    img {
      width: 12px;
      height: 20px;
    }

    &_prev {
      transform: rotate(180deg);
    }
  }

  .disable {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pageSelected {
    background-color: #000;
    pointer-events: none;
    color: #fff;
  }
}

.filter {
  @media @tablet {
    display: block;
    width: 100%;
    max-width: 340px;
    margin-left: auto;
    transform: translateX(100px);
    transition: 0.2s ease-in-out;
    box-shadow: 0 2.76389px 82.9167px rgba(125, 162, 227, 0.25);

    &_open-filter-mobile {
      transform: translateX(0);
    }
  }

  &__section {
    width: 340px;
    padding: 32px;
    border-radius: 24px;
    border: 1px solid #f2f2f2;
    background-color: #fff;

    @media @tablet {
      margin-left: auto;
      border-radius: 0;
    }
  }

  &__open-filter-mobile {
    display: none;

    @media @tablet {
      position: absolute;
      top: 41px;
      right: 20px;
      width: 32px;
      height: 32px;
      background-color: #fff;
      border: 1px solid #f2f2f2;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
  }

  &__icon-filter {
    width: 100%;
    background: #fff;
    background-color: #fff;
  }

  &__close-filter-mobile {
    display: none;

    @media @tablet {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 30px;
      height: 30px;
      display: flex;
      background-color: #fff;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }
  }

  &__section-title {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 24px;
  }

  &__wrap-item {
    &_items-row {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__chapter {
    width: 100%;
    max-width: 340px;
    padding: 32px;
    border-radius: 24px;
    border: 1px solid #f2f2f2;
    background-color: #fff;

    @media @tablet {
      margin-left: auto;
      border-radius: 0;
      padding-top: 40px;
    }
  }

  &__chapter-title {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 24px;
  }

  &__price-input {
    display: flex;
    width: fit-content;
  }

  &__price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__range-slider {
    width: 100%;
    margin: auto 16px;
    text-align: center;
    position: relative;
  }

  &__range-slider svg,
  &__range-slider input[type='range'] {
    position: absolute;
    left: -15px;
    bottom: -15px;
    width: 100%;
    background-color: #000;
    color: #000;
    height: 3px;
    margin: 0;
  }

  input[type='number'] {
    width: 70px;
    font-size: 16px;
    font-weight: 400;
  }

  input[type='range']::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 3px;
    -webkit-appearance: none !important;
    background-color: #000;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin-top: -7px;
    border: none;
  }

  input[type='range']::-moz-range-thumb {
    z-index: 2;
    position: relative;
    top: 3px;
    -webkit-appearance: none !important;
    background-color: #000;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin-top: -7px;
    border: none;
  }

  &__check-box {
    display: flex;
    align-items: center;
    padding: 6px 0;
    color: #b3b3b3;
    font-size: 12px;
    line-height: 12px;
  }

  &__check-box span {
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

  &__size-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  &__size-distance {
    margin-right: 8px;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  &__size-check-box {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 12px;
    line-height: 12px;
  }

  &__size-check-box input[type='checkbox'],
  &__check-box input[type='checkbox'],
  &__color-check-box[type='checkbox'] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  &__size-check-box span {
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

  &__color-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  &__checkbox {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-right: 8px;
    cursor: pointer;

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
}

.checkbox-block {
  &_size {
    margin-right: 8px;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}

.el-tooltip.el-slider__button {
  border: none;
  background-color: #000;
}

.el-slider__bar {
  background-color: #000;
  height: 3px;
}

.el-slider__runway {
  height: 3px;
}

.el-slider__button-wrapper {
  height: 16px;
  width: 16px;
  top: -11px;
}

.el-slider__button:hover {
  transform: none !important;
}

.el-slider__stop {
  display: none;
}

.el-pager {
  display: flex;
}
</style>
