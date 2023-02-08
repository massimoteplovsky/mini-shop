<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores";

const cartStore = useCartStore();
const { cartProductsLength } = storeToRefs(cartStore);
</script>

<template>
  <v-row no-gutters>
    <v-col class="py-4 d-flex justify-space-between" cols="12">
      <RouterLink
        to="/"
        class="d-flex align-center text-decoration-none text-md"
      >
        Mini Shop
      </RouterLink>
      <RouterLink
        to="/cart"
        class="d-flex align-center text-decoration-none text-md"
      >
        Cart <span v-if="cartProductsLength">({{ cartProductsLength }})</span
        ><v-icon class="ml-1 text-sm" icon="mdi-cart" />
      </RouterLink>
    </v-col>
  </v-row>
</template>
