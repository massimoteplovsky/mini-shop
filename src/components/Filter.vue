<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { storeToRefs } from "pinia";
import { useFilterStore, useCategoryStore } from "@/stores";
import { capitalizeWord } from "@/utils/helpers";

const filterStore = useFilterStore();
const categoryStore = useCategoryStore();

const {
  isFilterChanged,
  minPrice,
  maxPrice,
  categories: filterCategories,
} = storeToRefs(filterStore);
const { changeFilter, setFilter } = filterStore;

const { categories } = storeToRefs(categoryStore);

const selectedCategories: Ref<string[]> = ref([]);

const changeFilterCategories = () => {
  changeFilter("categories", selectedCategories.value);
};

watch(filterCategories, (newFilterCategories) => {
  if (!newFilterCategories.length) selectedCategories.value = [];
});
</script>

<template>
  <v-card class="rounded-0" variant="outlined" title="Filter">
    <v-card-item>
      <div class="py-4">
        <h4 class="mb-4">Price</h4>
        <v-text-field
          class="mb-4"
          type="number"
          :min="0"
          :placeholder="String(minPrice)"
          hide-details
          density="compact"
          label="Min price"
          variant="outlined"
          :model-value="minPrice"
          @update:modelValue="
            (value) => changeFilter('minPrice', Number(value))
          "
        />
        <v-text-field
          type="number"
          :min="0"
          :placeholder="String(maxPrice)"
          hide-details
          density="compact"
          label="Max price"
          variant="outlined"
          validate-on="blur"
          :model-value="maxPrice"
          @update:modelValue="
            (value) => changeFilter('maxPrice', Number(value))
          "
        />
      </div>

      <v-divider></v-divider>

      <div class="py-4">
        <h4>Category</h4>
        <v-checkbox
          v-for="category in categories.slice(1)"
          :key="category"
          hide-details
          density="compact"
          :label="capitalizeWord(category)"
          :value="category"
          v-model="selectedCategories"
          @input="changeFilterCategories"
        ></v-checkbox>
      </div>

      <v-btn
        v-if="isFilterChanged"
        color="success"
        variant="outlined"
        @click="setFilter"
      >
        Reset filter
      </v-btn>
    </v-card-item>
  </v-card>
</template>
