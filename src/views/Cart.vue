<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores";

// Components
import Layout from "@/components/Layout.vue";

const cartStore = useCartStore();
const { cartProducts, totalCartPrice } = storeToRefs(cartStore);
const { deleteFromCart, addToCart, deleteItem } = cartStore;
</script>

<template>
  <Layout :with-sidebar="false">
    <h1>Shopping cart</h1>
    <div v-if="cartProducts.length">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Product</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Total price</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartProducts" :key="item.id">
            <td class="d-flex align-center">
              <img
                class="mr-4"
                :src="item.image"
                :alt="item.title"
                width="30"
              />
              {{ item.title }}
            </td>
            <td>{{ item.price }}$</td>
            <td>
              <v-btn
                color="success"
                density="compact"
                elevation="0"
                icon
                @click="deleteItem(item.id)"
              >
                <v-icon>mdi-minus-circle-outline</v-icon>
              </v-btn>
              <span class="mx-2">{{ item.quantity }}</span>
              <v-btn
                color="success"
                density="compact"
                elevation="0"
                icon
                @click="addToCart(item)"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </td>
            <td>{{ item.totalPrice }}$</td>
            <td class="text-right">
              <v-btn
                class="cursor-pointer"
                elevation="0"
                color="error"
                density="compact"
                @click="deleteFromCart(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <h2 class="mt-4">Total price: {{ totalCartPrice }}$</h2>
    </div>
    <p v-else>The cart is empty! Start your shopping...</p>
  </Layout>
</template>
