<template>
  <div class="container">
    <header class="header">
      <router-link to="/"><img src="../images/logo-div.svg" /></router-link>
      <div class="header__menu">
        <button :class="bem('header__burger', { openMenuMobile })" @click="clickBurger">
          <span class="header__burger-line header__burger-line_top" />
          <span class="header__burger-line" />
          <span class="header__burger-line header__burger-line_bottom" />
        </button>
        <div :class="bem('header__navigation-wrap', { openMenuMobile })">
          <nav :class="bem('header__navigation', { openMenuMobile })">
            <button class="header__button-close-mobile" @click="closeMenu">
              <div>
                <span class="header__close header__close_top" />
                <span class="header__close header__close_bottom" />
              </div>
            </button>
            <router-link
              v-for="item in menu"
              :key="item.text"
              class="header__link-nav"
              :to="item.href"
              @click="closeMenu"
              >{{ item.text }}
            </router-link>
          </nav>
        </div>
      </div>
      <div class="header__icon-tools">
        <div class="header__search-wrap">
          <input
            v-model="searchValue"
            :class="bem('header__search', { openSearch })"
            type="text"
            @keyup.enter="search(searchValue)"
          />
          <button :class="bem('header__search-clear', { openSearch })" @click="clearTextSearch">
            <img src="../images/cross.png" alt="" />
          </button>
          <button class="header__wrap-icon" @click="clickSearch">
            <img src="../images/search.svg" alt="" />
          </button>
        </div>
        <router-link to="/my/wishlist" class="header__wrap-icon">
          <img src="../images/like.svg" alt="" />
        </router-link>
        <a href="#" class="header__wrap-icon">
          <img src="../images/user.svg" alt="" />
        </a>
        <router-link to="/basket" class="header__wrap-icon header__wrap-icon_basket">
          <img src="../images/basket.svg" alt="" />
          <span v-if="cartItems.length">{{ quantityProductInHeader }}</span>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'header-block',
  data() {
    return {
      openMenuMobile: false,
      openSearch: false,
      searchValue: '',
      menu: [
        {
          text: 'Главная',
          href: '/',
        },
        {
          text: 'Коллекции',
          href: '/',
        },
        {
          text: 'Все товары',
          href: '/catalog',
        },
        {
          text: 'Категории',
          href: '/',
        },
      ],
    };
  },
  computed: {
    ...mapState(['cartItems']),
    ...mapGetters(['SEARCH_VALUE']),
    quantityProductInHeader() {
      let quantityHeader = [];
      if (this.cartItems.length) {
        for (const item of this.cartItems) {
          quantityHeader.push(item.quantity);
        }
        quantityHeader = quantityHeader.reduce((sum, el) => sum + el);
      }
      return quantityHeader;
    },
  },
  watch: {
    openMenuMobile(value) {
      this.scrollLock(value);
    },
  },
  methods: {
    ...mapActions(['GET_SEARCH_VALUE_TO_VUEX']),
    clickSearch() {
      this.openSearch = !this.openSearch;
    },
    clickBurger() {
      this.openMenuMobile = true;
    },
    closeMenu() {
      this.openMenuMobile = false;
    },
    search(value) {
      this.GET_SEARCH_VALUE_TO_VUEX(value);
      if (this.$route.path !== '/catalog') {
        this.$router.push('/catalog');
      }
    },
    clearTextSearch() {
      this.searchValue = '';
      this.GET_SEARCH_VALUE_TO_VUEX();
      if (this.$route.path !== '/catalog') {
        this.$router.push('/catalog');
      }
    },
    scrollLock(status) {
      // eslint-disable-next-line no-unused-expressions
      status
        ? document.querySelector('html').classList.add('scroll-lock')
        : document.querySelector('html').classList.remove('scroll-lock');
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 40px;

  @media @tablet {
    padding: 24px 20px;
  }

  &__burger {
    position: relative;
    display: none;
    width: 48px;
    height: 48px;
    background: #30f;
    box-shadow: 0 4px 11px rgba(0, 0, 0, 0.06);
    border-radius: 50%;
    cursor: pointer;

    @media @tablet {
      display: block;
    }
  }

  &__burger-line {
    position: absolute;
    top: calc((100% - 2px) / 2);
    left: calc((100% - 24px) / 2);
    width: 24px;
    height: 2px;
    background-color: #fff;
    transition: transform 0.3s ease-in-out;

    &_top {
      top: 17px;
    }

    &_bottom {
      top: 29px;
    }
  }

  &__button-close-mobile {
    display: none;
  }

  &__navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 427px;
  }

  &__link-nav {
    color: #000;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #0300a9;
      transform: scale(1.05);
    }
  }

  &__icon-tools {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
  }

  &__search {
    position: absolute;
    bottom: 0;
    left: 20px;
    background-color: inherit;
    height: 48px;
    width: 0;
    transition: 0.2s ease-in-out;
    font-size: 14px;
    color: #ccc;

    &_open-search {
      left: -207px;
      width: 256px;
      height: 48px;
      border-radius: 30px;
      padding-left: 20px;
      padding-right: 74px;
      background-color: #fff;

      // left: -214px;
      // width: 226px;
      // height: 40px;
      // padding-left: 6px;
      // padding-right: 38px;
      // background-color: inherit;
      // border-bottom: 1px solid #ccc;
      // outline: none;
    }
  }

  &__search-clear {
    position: absolute;
    top: 15px;
    width: 30px;
    left: -22px;
    background: inherit;

    img {
      width: 100%;
      opacity: 0;
      pointer-events: none;
      transition: 0.3s ease-in-out;
    }

    &_open-search {
      img {
        width: 100%;
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  &__wrap-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: inherit;
    border-radius: 50%;
    z-index: 2;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: #fff;
    }

    &_basket {
      position: relative;

      span {
        position: absolute;
        top: -5px;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #30f;
        color: #fff;
        font-size: 12px;
        line-height: 100%;
      }
    }
  }

  @media @tablet {
    flex-direction: row;

    &__logo-div {
      width: 100px;
      order: 0;
    }

    &__menu {
      position: relative;
      order: 2;
    }

    &__navigation-wrap {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      top: -24px;
      right: -20px;
      height: 100vh;
      width: 100vw;
      background: rgba(0, 0, 0, 0.41961);
      z-index: 3;

      &_open-menu-mobile {
        opacity: 1;
        pointer-events: all;
      }
    }

    &__navigation {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 300px;
      height: 100vh;
      background-color: #fff;
      margin-left: auto;
      z-index: 4;
      box-shadow: 0 2.76389px 82.9167px rgba(125, 162, 227, 0.25);
      transition: transform 0.2s ease-in-out;
      transform: translateX(100px);

      &_open-menu-mobile {
        transform: translateX(0);
      }
    }

    &__button-close-mobile {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      background-color: inherit;
    }

    &__button-close-mobile div {
      position: relative;
    }

    &__close {
      position: absolute;
      left: -12px;
      top: 0;
      width: 25px;
      height: 2px;
      background-color: #ccc;

      &_top {
        transform: rotate(45deg);
      }

      &_bottom {
        transform: rotate(-45deg);
      }
    }

    &__link-nav {
      line-height: 150%;
      font-size: 16px;
      padding: 5px 0;
    }
  }

  input[type='text'] {
    // -webkit-appearance: none;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  input[type='text']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-size: 100%;
    margin-left: 5px;
  }

  .router-link-exact-active {
    background-color: #fff;
  }
}
</style>
