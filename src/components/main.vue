<template>
  <div class="container">
    <main class="main">
      <div>
        <swiper
          :direction="'horizontal'"
          :slides-per-view="1"
          :centered-slides="true"
          :space-between="0"
          :update-on-window-resize="true"
          :pagination="{
            clickable: true,
            el: '.main__pagination-swiper',
            type: 'bullets',
          }"
          :autoplay="{
            delay: 3500,
            disableOnInteraction: false,
          }"
          class="main__slider"
        >
          <swiper-slide class="main__slide">
            <div class="main__block-advertisement">
              <p class="main__banner-title">Новая коллекция «дизайнер с душой».</p>
              <p class="main__text-banner">В продаже с 2024 года</p>
              <router-link class="main__link-catalog" to="/catalog">
                <img src="../images/PDP-icon-basket.svg" alt="" /> Оформить предзаказ</router-link
              >
            </div>
          </swiper-slide>
          <swiper-slide class="main__slide">
            <div class="main__block-advertisement">
              <p class="main__banner-title">Новая. В продаже с 2024 года</p>
              <p class="main__text-banner">В продаже с 2024 года</p>
              <router-link class="main__link-catalog" to="/catalog">
                <img src="../images/PDP-icon-basket.svg" alt="" /> Оформить предзаказ</router-link
              >
            </div>
          </swiper-slide>
          <swiper-slide class="main__slide">
            <div class="main__block-advertisement">
              <p class="main__banner-title">Оформить предзаказ, Оформить предзаказ</p>
              <p class="main__text-banner">Оформить предзаказ</p>
              <router-link class="main__link-catalog" to="/catalog">
                <img src="../images/PDP-icon-basket.svg" alt="" /> Оформить предзаказ</router-link
              >
            </div>
          </swiper-slide>
        </swiper>
        <div class="main__pagination-swiper">
          <span class="main__pagination-bullet" />
        </div>
        <section>
          <svg
            id="animation"
            class="animation"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="border-radius: 50%"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
              fill="none"
              stroke="blue"
              stroke-dashoffset="50"
              stroke-dasharray="0"
              stroke-width="16px"
            />
          </svg>
          <h2 class="main__title-category">Популярные категории</h2>
          <div class="main__description-shop">
            <div
              v-for="card in popularCategory"
              :key="card.textCategory"
              class="main__category-wrap"
            >
              <img :src="card.src" alt="" />
              <p>{{ card.textCategory }}</p>
            </div>
          </div>
          <router-link class="main__popular-categories-link" to="/catalog"
            >Все категории</router-link
          >
        </section>
        <section class="main__section-product">
          <div class="main__product-chapter main__product-chapter_man">
            <img src="/man-bg.jpg" alt="" />
            <button class="main__button">Мужское</button>
          </div>
          <div class="main__product-chapter">
            <img src="/woman-bg.jpg" alt="" />
            <button class="main__button">Женское</button>
          </div>
        </section>
        <section class="main__new">
          <h2 class="main__new-title">Новые поступления</h2>
          <div class="main__new-wrap">
            <card-block
              v-for="card in productOnMAin"
              :key="card.index"
              class="main__card-block"
              :card="card"
              @clickCardProductInCatalog="clickCardProductInCatalog"
            />
          </div>
        </section>
        <div class="main__wrap-info">
          <div class="main__description-shop">
            <div class="main__map-wrap">
              <div class="main__map" style="position: relative; overflow: hidden">
                <a
                  href="https://yandex.ru/maps/36/stavropol/?utm_medium=mapframe&utm_source=maps"
                  style="color: #eee; font-size: 12px; position: absolute; top: 0px"
                  >Ставрополь</a
                ><a
                  href="https://yandex.ru/maps/36/stavropol/house/ulitsa_45_ya_parallel_6/YEgYfwZpQU0EQFpufXV4eXhqZA==/?from=mapframe&ll=41.919842%2C44.998289&utm_medium=mapframe&utm_source=maps&z=19.37"
                  style="color: #eee; font-size: 12px; position: absolute; top: 14px"
                  >Улица 45-я Параллель, 6 — Яндекс Карты</a
                ><iframe
                  class="main__iframe"
                  src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=41.919842%2C44.998289&mode=whatshere&whatshere%5Bpoint%5D=41.919868%2C44.998554&whatshere%5Bzoom%5D=17&z=19.37"
                  width="560"
                  height="400"
                  frameborder="1"
                  allowfullscreen="true"
                  style="position: relative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation, Autoplay, Pagination } from 'swiper';

// eslint-disable-next-line import/no-extraneous-dependencies
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2';
import { gsap } from '@/libs/gsap';
import { DrawSVGPlugin } from '@/libs/gsap/DrawSVGPlugin';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/swiper.less';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/components/effect-fade';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/components/navigation/navigation.less';

SwiperCore.use([Navigation, Autoplay, Pagination]);

export default {
  name: 'main-block',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      productOnMAin: [
        {
          id: '40985885898',
          src: '/Recombinate.png',
          type: 'Футболка',
          name: 'Recombinate',
          price: '3 400',
          color: ['Grandma s apples', 'Intense yellow-green'],
          size: ['XS', 'S', 'M', 'L'],
        },
        {
          groupId: 'Sweater-group-1',
          id: '617811979876',
          src: '/Maxaquin.png',
          type: 'Кофта',
          name: 'Maxaquin',
          price: '6 000',
          color: 'black',
          size: ['S', 'M', 'XL', '3XL'],
        },
        {
          id: '98789879878',
          src: '/Calquence.png',
          type: 'Купальник',
          name: 'Calquence',
          price: '1 200',
          color: ['White', 'black'],
          size: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        },
        {
          id: '123123123123',
          src: '/Dtic-Dome.png',
          type: 'Платье',
          name: 'Dtic-Dome',
          price: '16 000',
          color: ['Bananamania', 'Cadet Blue Crayola'],
          size: ['S', 'M', 'L'],
        },
        {
          id: '852258852258',
          src: '/Opsumit.png',
          type: 'Бомбер',
          name: 'Opsumit',
          price: '19 100',
          color: ['Light bluish green', 'Asparagus Crayola', 'Dark salmon', 'Light grey-blue'],
          size: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        },
        {
          id: '159159159159',
          src: '/Radiogardase.png',
          type: 'Топ',
          name: 'Radiogardase',
          price: '3 600',
          color: ['Brilliant blue', 'Cadet Blue Crayola', 'pastel turquoise', 'White'],
          size: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        },
        {
          id: '369963369963',
          src: '/Altace.png',
          type: 'Носки',
          name: 'Altace',
          price: '2 400',
          color: ['Brilliant blue', 'Cadet Blue Crayola', 'pastel turquoise', 'White'],
          size: ['S', 'M', 'L', '2XL'],
        },
        {
          id: '45669874587',
          src: '/Tafinlar.png',
          type: 'Штаны',
          name: 'Tafinlar',
          price: '9 800',
          color: ['amaranth', 'Moderate purple red', 'sky blue', 'Persian indigo'],
          size: ['L', 'XL', '3XL'],
        },
      ],
      popularCategory: [
        {
          src: '/socks.png',
          textCategory: 'Носки',
        },
        {
          src: '/hoodies.png',
          textCategory: 'Толстовки',
        },
        {
          src: '/jackets.png',
          textCategory: 'Куртки',
        },
        {
          src: '/pants.png',
          textCategory: 'Трусы',
        },
        {
          src: '/t-shirts.png',
          textCategory: 'Футболки',
        },
        {
          src: '/bracelets-main.png',
          textCategory: 'Украшения',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      catalog: (state) => state.bunker.catalog,
    }),
  },
  mounted() {
    gsap.registerPlugin(DrawSVGPlugin);
    gsap.fromTo(
      '#path',
      {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 2,
      }
    );
  },
  methods: {
    clickCardProductInCatalog(idProduct) {
      this.$router.push({ path: '/product-details', query: { product: idProduct } });
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.main {
  width: 100%;
  background-color: #fff;
  border-radius: 32px;
  border-bottom-right-radius: 32px;
  padding: 40px;

  @media @tablet {
    padding: 40px 20px;
  }

  &__slider {
    border-radius: 24px;
    position: relative;
    width: 100%;
    height: auto;
    margin: 0 auto;
    margin-bottom: 24px;
  }

  .swiper-pagination {
    position: absolute;
    bottom: -20px;
    margin: 0 auto;
    width: fit-content;
    display: flex;
    height: 10px;
    z-index: 2;
  }

  .swiper-pagination-bullet {
    display: block;
    width: 12px;
    height: 12px;
    background-color: #f2f2f2;
    border-radius: 50%;
    margin: 0 5px;
  }

  .swiper-pagination-bullet-active {
    width: 16px;
    height: 16px;
    background-color: #30f;
  }

  &__pagination-swiper {
    width: fit-content;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 40px;
  }

  &__slide {
    display: block;
    width: 100%;
    margin: 0 auto;
    padding: 160px 40px;
    background-image: url('/public/slider-img.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    @media @tablet {
      width: 100%;
    }
  }

  &__block-advertisement {
    max-width: 500px;
    width: 100%;
    padding: 48px 32px;
    background-color: #fff;
    backdrop-filter: blur(22px);
    border-radius: 22px;
    border: 1px solid #f2f2f2;
    margin: 0 auto;
  }

  &__text-banner {
    color: #b3b3b3;
    font-size: 32px;
    font-weight: 700;
    line-height: 36px;
    margin-bottom: 32px;
    text-align: center;
  }

  &__banner-title {
    color: #000;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 112.5%;
  }

  &__title-category {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    line-height: 112%;
  }

  &__category-wrap {
    width: calc(100% / 6);
    padding: 32px 48px;
    border-radius: 24px;
    border: 1px solid #f2f2f2;
    background: #fff;

    img {
      width: 100%;
      margin-bottom: 24px;
    }

    p {
      text-align: center;
      color: #000;
      font-size: 18px;
      font-weight: 500;
      line-height: 111.111%;
    }
  }

  &__link-category {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1000px;
    background-color: #fff;
    border: 1px solid #d6ccff;
    padding: 16px 24px;
    color: #30f;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 40px;
  }

  &__link-catalog {
    width: fit-content;
    display: flex;
    align-items: center;
    padding: 28px 80px;
    background-color: #30f;
    border-radius: 1000px;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    line-height: 100%;
    margin: 0 auto;
    z-index: 1;

    @media @tablet {
      left: 45px;
    }

    img {
      margin-right: 8px;
    }
  }

  &__popular-categories-link {
    display: flex;
    width: fit-content;
    margin: 0 auto;
    color: #30f;
    font-size: 18px;
    font-weight: 500;
    line-height: 111%;
    padding: 16px 24px;
    border-radius: 1000px;
    border: 1px solid #d6ccff;
    margin-bottom: 40px;
  }

  &__description-shop {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 40px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 40px;

    @media (max-width: 1300px) {
      width: 100%;
    }

    &:first-child {
      margin-top: 30px;
    }

    &:nth-child(3) {
      border-bottom: 1px solid #ccc;
    }

    &_direction {
      flex-direction: column;
    }
  }

  &__description-title {
    font-size: 32px;
    font-style: normal;
    font-weight: 300;
    line-height: 100%;
    margin-bottom: 24px;
  }

  &__description-text {
    width: 100%;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    text-indent: 30px;
    margin-bottom: 10px;
  }

  &__wrap-img {
    margin-left: 50px;
  }

  &__img {
    width: 100%;
  }

  &__merch-preview {
    width: 80%;
    margin: 0 auto;
  }

  &__slider-product {
    position: relative;
    width: 79%;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  &__section-product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 40px;
  }

  &__product-chapter {
    position: relative;
    width: calc((100% - 40px) / 2);

    img {
      width: 100%;
      border-radius: 24px;
    }
  }

  &__button {
    position: absolute;
    bottom: 6px;
    left: calc((100% - 99%) / 2);
    width: 99%;
    padding: 24px 0;
    margin: 0 auto;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(22px);
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 117%;
    z-index: 1;
  }

  &__new-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  &__new-title {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    line-height: 113%;
    margin-bottom: 32px;
  }

  &__new-product {
    width: calc(100% / 4);
    padding: 32px 24px;
    border-radius: 24px;
    border: 1px solid #f2f2f2;
    background: #fff;

    img {
      width: 100%;
    }
  }

  &__card-block {
    width: calc(100% / 4);
  }

  &__map-wrap {
    width: 100%;
    height: 350px;
    margin-top: 20px;
  }

  &__map {
    height: 100%;
  }

  &__iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  li {
    font-size: 17px;
    list-style: auto;
    margin-bottom: 8px;
  }
}

.card-on-main {
  &__type {
    color: #b3b3b3;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 100%;
  }

  &__brand {
    color: #000;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 111%;
  }

  &__price {
    color: #a6a6a6;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 111%;
  }
}

.navigation {
  position: absolute;
  left: -18px;
  top: calc((100% - 47px) / 2);
  width: 103%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  pointer-events: none;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    pointer-events: all;

    &:hover {
      box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.2);
    }
  }

  &__button-prev {
    transform: rotate(180deg);
  }

  &__arrow {
    width: 12px;
    height: 15px;
  }
}

.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  opacity: 0.4;
  font-weight: bold;
  color: var(--swiper-theme-color);
  cursor: pointer;
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: var(--swiper-theme-color);
  fill: none;
  stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}

.swiper-wrapper {
  height: auto;
}

.swiper-button-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.animation {
  path {
    stroke-dashoffset: 50;
  }
}

@keyframes animation {
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 0 !important;
    transition: 1s ease-in-out;
  }
}
</style>
