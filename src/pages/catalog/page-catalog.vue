<template>
  <div class="container">
    <div class="page-catalog">
      <div class="page-catalog__wrap-info">
        <bread-crumbs />
        <div class="page-catalog__wrap-select">
          <select-block
            v-model="selectShowItems"
            :items="showItems"
            class="page-catalog__select"
            @select="optionSelect"
            >Показать
            <p class="select__select-name">{{ selectedName }}</p></select-block
          >
          <select-block
            v-model="selectSortItems"
            class="page-catalog__select-sort"
            :items="sortingElements"
            @select="optionSelect"
            ><nobr>
              <p>{{ sortingBy }}</p>
            </nobr></select-block
          >
        </div>
      </div>
      <div class="page-catalog__catalog">
        <filter-block
          :sorting-by-quantity-card="selectedName"
          :sorting-by="sortingBy"
          :open-filter-mobile="openFilterMobile"
          @openFilter="openFilter"
          @closeFilter="closeFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-catalog',
  data() {
    return {
      selectShowItems: null,
      selectSortItems: null,
      selectedName: 24,
      sortingBy: 'Сортировка',
      openFilterMobile: false,
      showItems: [
        {
          parameter: 15,
        },
        {
          parameter: 24,
        },
        {
          parameter: 36,
        },
        {
          parameter: 48,
        },
        {
          parameter: 60,
        },
      ],
      sortingElements: [
        {
          parameter: 'По популярности',
        },
        {
          parameter: 'По возрастанию цены',
        },
        {
          parameter: 'По убыванию цены',
        },
        {
          parameter: 'Сначала выгодные',
        },
      ],
    };
  },
  methods: {
    optionSelect(item) {
      if (+item.parameter) {
        this.selectedName = item.parameter;
      } else {
        this.sortingBy = item.parameter;
      }
    },
    openFilter() {
      this.openFilterMobile = true;
    },
    closeFilter() {
      this.openFilterMobile = false;
    },
  },
};
</script>

<style src="./page-catalog.less" lang="less" />
