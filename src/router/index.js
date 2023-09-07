import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '../pages/main/page-main.vue';
import CatalogPage from '../pages/catalog/page-catalog.vue';
import ProductDetailsPage from '../pages/product-details/page-product-details.vue';
import WishlistPage from '../pages/wishlist/page-wishlist.vue';
import BasketPage from '../pages/basket/page-basket.vue';
import TermsUse from '../pages/terms-use/terms-use.vue';
import NotFoundPage from '../pages/not-found/page-not-found.vue';

Vue.use(Router);

const pathToRegexpOptions = {
  strict: true,
};

export default new Router({
  mode: 'history',
  // Все роуты должны иметь конфиг pathToRegexpOptions
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
      pathToRegexpOptions,
    },
    {
      path: '/catalog',
      name: 'Каталог',
      component: CatalogPage,
      pathToRegexpOptions,
    },
    {
      path: '/product-details',
      name: 'Информация о продукте',
      component: ProductDetailsPage,
      pathToRegexpOptions,
    },
    {
      path: '/my/wishlist',
      name: 'Избранное',
      component: WishlistPage,
      pathToRegexpOptions,
    },
    {
      path: '/basket',
      name: 'Корзина',
      component: BasketPage,
      pathToRegexpOptions,
    },
    {
      path: '/terms-use',
      name: 'Правила пользования торговой площадкой',
      component: TermsUse,
      pathToRegexpOptions,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage,
      pathToRegexpOptions,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});
