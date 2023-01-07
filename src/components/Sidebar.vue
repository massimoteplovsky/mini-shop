<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useCategoryStore, useProductStore } from "@/stores";
import { onMounted } from "vue-demi";
import { capitalizeWord } from "@/utils/helpers";

// Components
import Filter from "./Filter.vue";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const { categories, activeCategory, isLoading } = storeToRefs(categoryStore);
const { getAllCategories, changeActiveCategory } = categoryStore;

const { products } = storeToRefs(productStore);
const { getProductsByCategory } = productStore;

onMounted(() => {
  getAllCategories();
});

const isProductsListLoaded = computed(() => !!products.value.length);

const handleChangeActiveCategory = (category: string) => {
  if (category === activeCategory.value) return false;
  changeActiveCategory(category);
  getProductsByCategory(category);
};
</script>

<template>
  <v-col md="3">
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
      model-value="20"
      :size="40"
    />

    <template v-else>
      <v-card class="mb-6 rounded-0" variant="outlined" title="Categories">
        <v-list variant="plain" density="comfortable">
          <v-list-item
            v-for="item in categories"
            :key="item"
            :value="item"
            :active="item === activeCategory"
            active-color="primary"
            @click="handleChangeActiveCategory(item)"
          >
            {{ capitalizeWord(item) }}
          </v-list-item>
        </v-list>
      </v-card>

      <Filter v-if="isProductsListLoaded" />
    </template>
  </v-col>
</template>
