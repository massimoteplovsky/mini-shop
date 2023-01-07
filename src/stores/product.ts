import { defineStore } from "pinia";
import { orderBy } from "lodash";
import useFiltersStore from "./filters";
import { ProductService } from "@/services";
import type { IProduct, ISortItem } from "@/utils/types";

interface IProductState {
  products: IProduct[];
  filteredProducts: IProduct[];
  sortItems: ISortItem[];
  activeSortItem: ISortItem;
  isLoading: boolean;
  isError: boolean;
}

const sortItems: ISortItem[] = [
  { label: "Price ascending", value: "price", order: "asc" },
  { label: "Price descending", value: "price", order: "desc" },
  { label: "Rating", value: "rating.rate", order: "desc" },
];

const useProductStore = defineStore("products", {
  state: (): IProductState => ({
    products: [],
    filteredProducts: [],
    sortItems,
    activeSortItem: sortItems[0],
    isLoading: false,
    isError: false,
  }),
  getters: {
    productsCount({ filteredProducts }): number {
      return filteredProducts.length;
    },
    productsList({ filteredProducts, activeSortItem }): IProduct[] {
      return orderBy(
        filteredProducts,
        [activeSortItem.value],
        [activeSortItem.order]
      );
    },
  },
  actions: {
    async getProducts() {
      const { setFilter } = useFiltersStore();

      this.isLoading = true;
      this.isError = false;
      try {
        const products = await ProductService.getProducts();

        this.products = products;
        setFilter();
      } catch (err) {
        console.log(err);
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
    getProductsByCategory(category: string) {
      const { setFilter, isFilterChanged } = useFiltersStore();

      const productsByCategory =
        category === "all"
          ? this.products
          : this.products.filter((product) => product.category === category);

      this.filteredProducts = productsByCategory;
      isFilterChanged && setFilter();
    },
    filterProducts() {
      const { minPrice, maxPrice, categories } = useFiltersStore();

      const filteredProducts = this.products.filter(({ price, category }) => {
        return (
          price >= minPrice &&
          price <= maxPrice &&
          (categories.length === 0 || categories.includes(category))
        );
      });

      this.filteredProducts = filteredProducts;
    },
    changeSortItem(item: ISortItem) {
      this.activeSortItem = item;
    },
  },
});

export default useProductStore;
