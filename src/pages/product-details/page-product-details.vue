<template>
  <div class="container">
    <div class="page-product-details">
      <bread-crumbs class="page-product-details__bread-crumbs" />
      <div class="page-product-details__wrap">
        <div class="page-product-details__info">
          <div class="page-product-details__gallery">
            <div class="page-product-details__img">
              <img :src="product.src" alt="" />
            </div>
            <div class="page-product-details__photo-slider">
              <swiper
                :direction="'vertical'"
                :slides-per-view="4"
                :space-between="0"
                :update-on-window-resize="true"
                :grab-cursor="true"
                :auto-height="true"
                :navigation="{
                  prevEl: '.page-product-details__navigation_prev',
                  nextEl: '.page-product-details__navigation_next',
                }"
                class="page-product-details__slider"
              >
                <swiper-slide>
                  <div class="page-product-details__slide">
                    <img class="page-product-details__photo" :src="product.src" alt="" />
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="page-product-details__slide">
                    <img class="page-product-details__photo" :src="product.src" alt="" />
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="page-product-details__slide">
                    <img class="page-product-details__photo" :src="product.src" alt="" />
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="page-product-details__slide">
                    <img class="page-product-details__photo" :src="product.src" alt="" />
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="page-product-details__description">
            <div class="page-product-details__characteristics">
              <h3 class="page-product-details__name-product">
                {{ product.name }}

                <div
                  :class="bem('page-product-details__like', { favoritesProduct })"
                  @click="addedProductToFavorites(product)"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 5.5C14 3.84333 12.6007 2.5 10.8747 2.5C9.58467 2.5 8.47667 3.25067 8 4.322C7.52333 3.25067 6.41533 2.5 5.12467 2.5C3.4 2.5 2 3.84333 2 5.5C2 10.3133 8 13.5 8 13.5C8 13.5 14 10.3133 14 5.5Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </h3>
              <div class="page-product-details__text page-product-details__text_gender">
                {{ product.type }}
                <div class="page-product-details__gender">
                  <p
                    v-for="gender in product.gender"
                    :key="gender.index"
                    class="page-product-details__gender-text"
                  >
                    {{ gender }}
                  </p>
                </div>
              </div>
              <div class="page-product-details__paragraph">
                <p class="page-product-details__text">Цвет</p>
                <div class="page-product-details__wrap-color">
                  <span
                    v-for="color in formatColors"
                    :key="color.index"
                    :class="
                      bem('page-product-details__color', {
                        colorWhite: color.background === '#fff',
                        colorChecked: color.name === product.color,
                      })
                    "
                    :style="{ backgroundColor: color.background }"
                    @click="clickColorProduct(color.name)"
                  />
                </div>
              </div>
              <div class="page-product-details__paragraph page-product-details__paragraph_size">
                <p class="page-product-details__text">Размер</p>
                <div class="page-product-details__block-size">
                  <div
                    v-for="(size, index) in product.size"
                    :key="size.index"
                    class="page-product-details__wrap-size"
                    @click="sizeSelectionProduct(index)"
                  >
                    <input :id="size" :name="product.id" :value="size" type="radio" />
                    <label
                      :for="size"
                      class="page-product-details__form-size page-product-details__size"
                      >{{ size }}</label
                    >
                  </div>
                </div>
              </div>
              <div class="page-product-details__paragraph page-product-details__paragraph_button">
                <p>{{ product.price }}₽</p>
                <div v-if="!buttonBasket" class="page-product-details__block-after-adding">
                  <div class="page-product-details__count">
                    <button
                      class="page-product-details__button-quantity page-product-details__button-quantity_less"
                      @click="decrementItem(product)"
                    />
                    <p class="page-product-details__quantity">{{ product.quantity }}</p>
                    <button
                      class="page-product-details__button-quantity page-product-details__button-quantity_more"
                      @click="increaseItem(product)"
                    />
                  </div>
                  <router-link to="/basket" class="page-product-details__block-after-adding-button">
                    В&nbsp;корзину
                    <img src="../../images/arrow-right.svg" alt="" />
                  </router-link>
                </div>
                <button
                  v-if="buttonBasket"
                  class="page-product-details__button"
                  @click="addedCardToBasket(product)"
                >
                  <img src="../../images/PDP-icon-basket.svg" alt="" />
                  Добавить в&nbsp;корзину
                </button>
              </div>
            </div>
            <div class="page-product-details__characteristics">
              <h3 class="page-product-details__paragraph-title">Описание</h3>
              <p class="page-product-details__description">{{ product.description }}</p>
            </div>
            <div class="page-product-details__characteristics">
              <h3 class="page-product-details__paragraph-title">Характеристики</h3>
              <div class="page-product-details__params">
                <ul>
                  <li v-for="elem in product.characteristics" :key="elem.index">
                    <p class="page-product-details__params-type">{{ elem.type }}</p>
                    <p class="page-product-details__params-list">
                      {{ [...elem.params].join(', ') }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="listSimilarProducts.length" class="page-product-details__block-similar-products">
        <h3 class="page-product-details__title-block-similar-products">Похожие товары</h3>
        <div class="page-product-details__similar-products">
          <card-block
            v-for="card in listSimilarProducts.slice(0, 4)"
            :key="card.vendorCode"
            class="page-product-details__card"
            :card="card"
            @clickCardProductInCatalog="clickCardProductInCatalog"
          />
        </div>
      </div>
      <div v-if="listSimilarProducts.length" class="page-product-details__block-similar-products">
        <h3 class="page-product-details__title-block-similar-products">
          Товары из категории «{{ product.type }}»
        </h3>
        <div class="page-product-details__similar-products">
          <card-block
            v-for="card in listProductsCategory.slice(4, 8)"
            :key="card.vendorCode"
            class="page-product-details__card"
            :card="card"
            @clickCardProductInCatalog="clickCardProductInCatalog"
          />
        </div>
      </div>
      <div>
        <tabs class="tabs">
          <tab-item name="Отзывы">
            <div class="wrap-questions">
              <comments-block v-for="comment in comments" :key="comment.id" :comment="comment" />
            </div>
          </tab-item>
          <tab-item name="Вопросы">
            <question-block v-for="question in questions" :key="question.id" :question="question" />
          </tab-item>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { Navigation, Autoplay } from 'swiper';

import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2';
import { Tabs, TabItem } from 'vue-material-tabs';

SwiperCore.use([Navigation, Autoplay]);

export default {
  name: 'page-product-details',
  components: {
    Tabs,
    TabItem,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      selectedSize: null,
      sizeIdx: null,
      buttonBasket: true,
      favoritesProduct: false,
      comments: [
        {
          userName: 'name1',
          date: '14.22.1950',
          time: '20:19',
          textComments:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptate soluta magnam isteillum facere, hic possimus nemo culpa sed qui tempore itaque, suscipit repudiandae pariatur facilis totam! Accusamus vel obcaecati eum veritatis. Consequuntur minus animi maxime aliquam ut culpa.',
        },
        {
          userName: 'name2',
          date: '14.22.1950',
          time: '20:19',
          textComments:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit unde error consequuntur ducimus, iste optio eveniet distinctio autem, porro, inventore laborum eaque impedit harum veritatis?',
        },
        {
          userName: 'name3',
          date: '14.22.1950',
          time: '20:19',
          textComments:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit unde error consequuntur ducimus, iste optio eveniet distinctio autem, porro, inventore laborum eaque impedit harum veritatis?',
        },
      ],
      questions: [
        {
          userName: 'name1',
          date: '14.22.1950',
          time: '20:19',
          textQuestion:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptate soluta magnam isteillum facere, hic possimus nemo culpa sed qui tempore itaque, suscipit repudiandae pariatur facilis totam! Accusamus vel obcaecati eum veritatis. Consequuntur minus animi maxime aliquam ut culpa.',
          textAnswer:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis corporis aut exercitationem! Voluptatem nam accusamus at magni corrupti. Atque, nihil.',
        },
        {
          userName: 'name2',
          date: '14.22.1950',
          time: '20:19',
          textQuestion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, incidunt!',
          textAnswer:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem fugit illo.',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      filter: (state) => state.bunker.filter,
      catalog: (state) => state.bunker.catalog,
    }),
    ...mapState(['cartItems']),
    ...mapGetters(['selectedProductId', 'wishlistProducts']),
    product() {
      let result = {};
      const vm = this;
      this.catalog.map((item) => {
        if (item.id === vm.$route.query.product) {
          result = item;
        }
        return result;
      });
      return result;
    },
    // productId() {
    //   return this.selectedProductId;
    // },
    cartItem() {
      return this.cartItems;
    },
    formatColors() {
      const productColorDisplay = this.filter.find((elem) => elem.category === 'color');
      const productGroupId = this.catalog.filter((elem) => elem.groupId === this.product.groupId);
      const colorsProductGroupId = productGroupId.map((el) => el.color);
      return productColorDisplay.listItemFiltered.filter((el) => {
        return colorsProductGroupId.includes(el.name);
      });
      // return color.listItemFiltered.filter((el) => this.productId.color.includes(el.name));
    },
    listSimilarProducts() {
      const arraySimilarProducts = this.catalog.filter(
        (elem) => elem.groupId === this.product.groupId
      );
      return arraySimilarProducts.filter((elem) => elem.id !== this.product.id);
    },
    listProductsCategory() {
      const arraySimilarProducts = this.catalog.filter(
        (elem) => elem.category === this.product.category
      );
      return arraySimilarProducts.filter((elem) => elem.groupId !== this.product.groupId);
    },
  },
  watch: {},
  mounted() {
    this.checkedToCard();
    this.productInWishlist();
    console.log('sizeIdx', this.sizeIdx);
  },
  methods: {
    ...mapActions([
      'addedToCardWishlist',
      'addToCart',
      'DECREMENT_IN_PRODUCT_DETAILS',
      'INCREASE_IN_PRODUCT_DETAILS',
    ]),
    checkedToCard() {
      const object = this.cartItems.find((elem) => elem.id.includes(this.product.id)) || {};
      if (object?.id === this.product.id && object.sizeIdx === this.sizeIdx) {
        this.buttonBasket = false;
        console.log('object.sizeIdx', object.sizeIdx);
        console.log('this.sizeIdx', this.sizeIdx);
      } else {
        this.buttonBasket = true;
      }
      this.productInWishlist();
    },
    addedCardToBasket(product) {
      this.addToCart(product);
      this.checkedToCard();
      this.sizeSelectionProduct();
    },
    clickColorProduct(color) {
      const routeProductColor = this.catalog.filter(
        (elem) => elem.groupId === this.product.groupId
      );
      const routerLinkProduct = routeProductColor.find((elem) => elem.color === color);
      if (routerLinkProduct.id !== this.product.id) {
        this.$router.push({ path: '/product-details', query: { product: routerLinkProduct.id } });
      }

      this.checkedToCard();
    },
    clickCardProductInCatalog(idProduct) {
      this.$router.push({ path: '/product-details', query: { product: idProduct } });
    },
    addedProductToFavorites(product) {
      this.addedToCardWishlist(product);
      this.favoritesProduct = !this.favoritesProduct;
    },

    decrementItem(itemProductPDP) {
      this.DECREMENT_IN_PRODUCT_DETAILS(itemProductPDP);
      this.checkedToCard();
    },
    increaseItem(itemProductPDP) {
      this.INCREASE_IN_PRODUCT_DETAILS(itemProductPDP);
    },

    sizeSelectionProduct(index) {
      this.sizeIdx = index;
      this.product.sizeIdx = index;
      const objSize = this.cartItems.find((elem) => elem.id.includes(this.product.id)) || {};

      objSize.sizeIdx = index;

      if (objSize?.id === this.product.id && objSize.sizeIdx === this.sizeIdx) {
        this.buttonBasket = false;
        console.log('objSize.sizeIdx', objSize.sizeIdx);
        console.log('this.sizeIdx', this.sizeIdx);
      } else {
        this.buttonBasket = true;
      }

      console.log('objSize', objSize);
    },

    productInWishlist() {
      const variable = this.wishlistProducts.find((elem) => elem.id === this.product.id);

      if (variable) {
        this.favoritesProduct = true;
      } else {
        this.favoritesProduct = false;
      }
    },
  },
};
</script>

<style src="./page-product-details.less" lang="less" />
