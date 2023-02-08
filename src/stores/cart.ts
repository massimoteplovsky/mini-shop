import { ref, computed, type ComputedRef } from "vue";
import { defineStore } from "pinia";
import { countBy, uniqBy, findIndex } from "lodash";
import { sliceArrayByIndex } from "@/utils/helpers";
import type { IProduct, ICartProduct } from "@/utils/types";

const useProductStore = defineStore("cart", () => {
  // State
  const products = ref<IProduct[]>([]);

  // Getters
  const cartProductsLength: ComputedRef<number> = computed(
    () => products.value.length
  );

  const cartProducts: ComputedRef<ICartProduct[]> = computed(() => {
    const countedProducts = countBy(products.value, "title");

    const extendedProducts = products.value.map((product) => ({
      ...product,
      quantity: countedProducts[product.title],
      totalPrice: (countedProducts[product.title] * product.price)
        .toFixed(2)
        .replace("00", ""),
    }));

    return uniqBy(extendedProducts, "title");
  });

  const totalCartPrice: ComputedRef<string> = computed(() => {
    return cartProducts.value
      .reduce((acc, product) => {
        return acc + Number(product.totalPrice);
      }, 0)
      .toFixed(2)
      .replace("00", "");
  });

  // Actions
  const addToCart = (product: IProduct) => {
    products.value = [...products.value, product];
  };

  const deleteItem = (id: number) => {
    const productIndex = findIndex(products.value, { id: id });

    if (productIndex !== -1) {
      products.value = sliceArrayByIndex(products.value, productIndex);
    }
  };
  const deleteFromCart = (id: number) => {
    products.value = products.value.filter((product) => product.id !== id);
  };

  return {
    products,
    cartProductsLength,
    cartProducts,
    totalCartPrice,
    addToCart,
    deleteItem,
    deleteFromCart,
  };
});

export default useProductStore;
