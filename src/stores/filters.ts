import { defineStore } from "pinia";
import { orderBy } from "lodash";
import useProductsStore from "./product";
import useCategoryStore from "./categories";

interface IFiltersState {
  isFilterChanged: boolean;
  minPrice: number;
  maxPrice: number;
  categories: string[];
}

type Colors = keyof IFiltersState;

const initialState: IFiltersState = {
  isFilterChanged: false,
  minPrice: 0,
  maxPrice: 0,
  categories: [],
};

const useFiltersStore = defineStore("filters", {
  state: () => initialState,
  getters: {
    filterState: (state) => state,
  },
  actions: {
    setFilter() {
      const { products } = useProductsStore();

      const sortedFilteredProducts = orderBy(products, "price");
      const minPrice = sortedFilteredProducts[0].price;
      const maxPrice =
        sortedFilteredProducts[sortedFilteredProducts.length - 1].price;

      this.minPrice = minPrice;
      this.maxPrice = maxPrice;
      this.categories = [];
      this.isFilterChanged = false;
      const { filterProducts } = useProductsStore();
      filterProducts();
    },
    changeFilter(key: keyof IFiltersState, value: number | string[]) {
      const { changeActiveCategory } = useCategoryStore();
      const { filterProducts } = useProductsStore();

      this.$patch((state) => (state[key] = value));
      this.isFilterChanged = true;
      filterProducts();
      changeActiveCategory("all");
    },
  },
});

export default useFiltersStore;
