<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores";
import type { IOption } from "@/utils/types";

defineProps<{
  gridSizes: IOption[];
  activeGridSize: IOption;
}>();

const productStore = useProductStore();
const { activeSortItem, sortItems } = storeToRefs(productStore);
const { changeSortItem } = productStore;
</script>

<template>
  <v-row class="d-flex justify-space-between" no-gutters>
    <v-col cols="6">
      <v-select
        :items="sortItems"
        label="Sort by"
        :model-value="activeSortItem.label"
        item-title="label"
        return-object
        variant="outlined"
        @update:modelValue="changeSortItem"
      />
    </v-col>
    <v-col cols="5">
      <v-select
        :items="gridSizes"
        label="Show per row"
        :model-value="activeGridSize.label"
        item-title="label"
        return-object
        variant="outlined"
        @update:modelValue="(value) => $emit('change-active-size', value)"
      />
    </v-col>
  </v-row>
</template>
