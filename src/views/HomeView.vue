<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore, useCategoryStore } from "@/stores";
import { capitalizeWord } from "@/utils/helpers";
import type { IOption } from "@/utils/types";

// Components
import Layout from "@/components/Layout.vue";
import ProductBar from "@/components/ProductBar.vue";

const gridSizes: IOption[] = [
  { label: "1", value: 12 },
  { label: "2", value: 6 },
  { label: "3", value: 4 },
  { label: "4", value: 3 },
];

const activeGridSize = ref(gridSizes[2]);

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const { productsList, isLoading, productsCount } = storeToRefs(productStore);
const { activeCategory } = storeToRefs(categoryStore);
const { getProducts } = useProductStore();

const changeActiveSize = (value: IOption) => {
  activeGridSize.value = value;
};

onMounted(() => {
  getProducts();
});

const listTitle = computed(() => {
  return `${
    activeCategory.value === "all"
      ? "All products"
      : capitalizeWord(activeCategory.value)
  }`;
});
</script>

<template>
  <main>
    <Layout>
      <div v-if="isLoading" class="d-flex justify-center align-center">
        <v-progress-circular
          indeterminate
          color="primary"
          model-value="20"
          :size="40"
        />
      </div>

      <template v-else>
        <div class="mb-10">
          <h1 class="text-h3 mb-1">{{ listTitle }}</h1>
          <p class="text-md">Total products - {{ productsCount }}</p>
        </div>

        <ProductBar
          :grid-sizes="gridSizes"
          :active-grid-size="activeGridSize"
          @change-active-size="changeActiveSize"
        />

        <v-row>
          <v-col
            v-for="item in productsList"
            :key="item.id"
            class="d-flex"
            :cols="activeGridSize.value"
          >
            <div class="d-flex flex-column flex-grow-1 pa-4 border">
              <v-img
                class="align-end flex-grow-0 mb-2"
                aspect-ratio="1.5"
                :src="item.image"
                contain
              />
              <p class="text-overline">{{ item.category }}</p>
              <h5 class="mb-4">{{ item.title }}</h5>
              <div class="mt-auto">
                <div class="text-caption d-flex flex-column">
                  <p class="mb-2 font-weight-bold text-green">
                    {{ item.price }}$
                  </p>
                  <div
                    class="d-flex flex-wrap justify-space-between align-center mb-4"
                  >
                    <v-rating
                      :model-value="item.rating.rate"
                      color="warning"
                      density="compact"
                      half-increments
                      readonly
                    />
                    <p class="text-md">
                      {{ item.rating.rate }} ({{ item.rating.count }})
                    </p>
                  </div>
                </div>

                <div class="mt-auto">
                  <v-btn color="success" variant="outlined">Buy</v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
    </Layout>
  </main>
</template>
