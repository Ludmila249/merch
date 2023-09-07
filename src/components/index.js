import Vue from 'vue';

import MainBlock from './main.vue';
import ExampleBlock from './example/example.vue';
import AccordionItem from './accordion-item.vue';
import CardBlock from './card.vue';
import BreadCrumbs from './bread-crumbs.vue';
import CheckboxBlock from './checkbox.vue';
import SelectBlock from './select.vue';
import FilterBlock from './filter.vue';
import PaginationBlock from './pagination.vue';
import CommentsBlock from './comments.vue';
import QuestionBlock from './question.vue';
import BasketProduct from './basket-product.vue';

Vue.component('main-block', MainBlock);
Vue.component('example-block', ExampleBlock);
Vue.component('accordion-item', AccordionItem);
Vue.component('card-block', CardBlock);
Vue.component('bread-crumbs', BreadCrumbs);
Vue.component('checkbox-block', CheckboxBlock);
Vue.component('select-block', SelectBlock);
Vue.component('filter-block', FilterBlock);
Vue.component('pagination-block', PaginationBlock);
Vue.component('comments-block', CommentsBlock);
Vue.component('question-block', QuestionBlock);
Vue.component('basket-product', BasketProduct);
