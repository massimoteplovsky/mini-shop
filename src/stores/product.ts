import { defineStore } from "pinia";
import { orderBy } from "lodash";
import type { IProduct, ISortItem } from "@/utils/types";
import { ProductService } from "@/services";

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
    productsCount(): number {
      return this.filteredProducts.length;
    },
    productsList(): IProduct[] {
      return orderBy(
        this.filteredProducts,
        [this.activeSortItem.value],
        [this.activeSortItem.order]
      );
    },
  },
  actions: {
    async getProducts() {
      this.isLoading = true;
      this.isError = false;
      try {
        const products = await ProductService.getProducts();

        this.products = products;
        this.filteredProducts = products;
      } catch (err) {
        console.log(err);
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
    getProductsByCategory(category: string) {
      if (category === "all") {
        this.filteredProducts = this.products;
        return;
      }

      const productsByCategory: IProduct[] = this.products.filter(
        (product) => product.category === category
      );

      this.filteredProducts = productsByCategory;
    },
    changeSortItem(item: ISortItem) {
      this.activeSortItem = item;
    },
  },
});

export default useProductStore;
