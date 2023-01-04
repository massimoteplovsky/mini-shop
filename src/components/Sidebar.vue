<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCategoryStore, useProductStore } from "@/stores";
import { onMounted } from "vue-demi";
import { capitalizeWord } from "@/utils/helpers";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const { categories, activeCategory, isLoading } = storeToRefs(categoryStore);
const { getAllCategories, changeActiveCategory } = categoryStore;
const { getProductsByCategory } = productStore;

onMounted(() => {
  getAllCategories();
});

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

      <v-card class="rounded-0" variant="outlined" title="Filter">
        <v-card-item>
          <div class="py-4">
            <h4 class="mb-4">Price</h4>
            <v-text-field
              type="number"
              min="0"
              hide-details
              density="compact"
              label="Min price"
              variant="outlined"
            />
            <v-text-field
              type="number"
              min="0"
              hide-details
              density="compact"
              label="Max price"
              variant="outlined"
            />
          </div>

          <v-divider></v-divider>

          <div class="py-4">
            <h4 class="mb-4">Category</h4>
            <v-checkbox
              hide-details
              density="compact"
              label="John"
              value="John"
            ></v-checkbox>
            <v-checkbox
              hide-details
              density="compact"
              label="Jacob"
              value="Jacob"
            ></v-checkbox>
          </div>
        </v-card-item>
      </v-card>
    </template>
  </v-col>
</template>
