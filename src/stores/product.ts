import { ref, computed, type ComputedRef } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { orderBy } from "lodash";
import useFilterStore from "./filters";
import { ProductService } from "@/services";
import type { IProduct, ISortItem } from "@/utils/types";

const sortItemsList: ISortItem[] = [
  { label: "Price ascending", value: "price", order: "asc" },
  { label: "Price descending", value: "price", order: "desc" },
  { label: "Rating", value: "rating.rate", order: "desc" },
];

const useProductStore = defineStore("products", () => {
  const filterStore = useFilterStore();

  // State
  const products = ref<IProduct[]>([]);
  const filteredProducts = ref<IProduct[]>([]);
  const sortItems = ref<ISortItem[]>(sortItemsList);
  const activeSortItem = ref<ISortItem>(sortItemsList[0]);
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);

  // Getters
  const productsCount: ComputedRef<number> = computed(
    () => filteredProducts.value.length
  );

  const productsList: ComputedRef<IProduct[]> = computed(() => {
    return orderBy(
      filteredProducts.value,
      [activeSortItem.value.value],
      [activeSortItem.value.order]
    );
  });

  // Actions
  const getProducts = async () => {
    isLoading.value = true;
    isError.value = false;
    try {
      const allProducts = await ProductService.getProducts();

      products.value = allProducts;
      filterStore.setFilter();
    } catch (err) {
      console.log(err);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const getProductsByCategory = (category: string) => {
    const productsByCategory =
      category === "all"
        ? products.value
        : products.value.filter((product) => product.category === category);

    filteredProducts.value = productsByCategory;
    filterStore.filter.isFilterChanged && filterStore.setFilter();
  };

  const filterProducts = () => {
    const newFilteredProducts = products.value.filter(({ price, category }) => {
      return (
        price >= filterStore.filter.minPrice &&
        price <= filterStore.filter.maxPrice &&
        (filterStore.filter.categories.length === 0 ||
          filterStore.filter.categories.includes(category))
      );
    });

    filteredProducts.value = newFilteredProducts;
  };

  const changeSortItem = (item: ISortItem) => {
    activeSortItem.value = item;
  };

  return {
    products,
    filteredProducts,
    sortItems,
    activeSortItem,
    isLoading,
    isError,
    productsCount,
    productsList,
    getProducts,
    getProductsByCategory,
    filterProducts,
    changeSortItem,
  };
});

export default useProductStore;
