import { reactive } from "vue";
import { defineStore } from "pinia";
import { orderBy } from "lodash";
import useProductStore from "./product";
import useCategoryStore from "./categories";

// const useFiltersStore = defineStore("filters", {
//   state: () => initialState,
//   getters: {
//     filterState: (state) => state,
//   },
//   actions: {
//     setFilter() {
//       const { products } = useProductsStore();

//       const sortedFilteredProducts = orderBy(products, "price");
//       const minPrice = sortedFilteredProducts[0].price;
//       const maxPrice =
//         sortedFilteredProducts[sortedFilteredProducts.length - 1].price;

//       this.minPrice = minPrice;
//       this.maxPrice = maxPrice;
//       this.categories = [];
//       this.isFilterChanged = false;
//       const { filterProducts } = useProductsStore();
//       filterProducts();
//     },
//     changeFilter(key: keyof IFiltersState, value: number | string[]) {
//       const { changeActiveCategory } = useCategoryStore();
//       const { filterProducts } = useProductsStore();

//       this.$patch((state) => (state[key] = value));
//       this.isFilterChanged = true;
//       filterProducts();
//       changeActiveCategory("all");
//     },
//   },
// });

interface IFilterState {
  isFilterChanged: boolean;
  minPrice: number;
  maxPrice: number;
  categories: string[];
}

const useFilterStore = defineStore("filters", () => {
  const productStore = useProductStore();
  const categoryStore = useCategoryStore();

  // State
  const filter = reactive<IFilterState>({
    minPrice: 0,
    maxPrice: 0,
    categories: [],
    isFilterChanged: false,
  });

  // Actions
  const setFilter = () => {
    const sortedFilteredProducts = orderBy(productStore.products, "price");

    filter.minPrice = sortedFilteredProducts[0].price;
    filter.maxPrice =
      sortedFilteredProducts[sortedFilteredProducts.length - 1].price;
    filter.categories = [];
    filter.isFilterChanged = false;
    productStore.filterProducts();
  };

  const changeFilter = (
    key: keyof Omit<IFilterState, "isFilterChanged">,
    value: number | string[]
  ) => {
    filter[key] = value;
    filter.isFilterChanged = true;
    productStore.filterProducts();
    categoryStore.changeActiveCategory("all");
  };

  return {
    filter,
    setFilter,
    changeFilter,
  };
});

export default useFilterStore;
