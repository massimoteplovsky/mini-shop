import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { CategoryService } from "@/services";

const useCategoryStore = defineStore("categories", () => {
  // State
  const categories = ref<string[]>([]);
  const activeCategory = ref<string>("all");
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);

  // Getters
  const categoriesCount = computed(() => categories.value.length);

  // Actions
  const changeActiveCategory = (category: string) => {
    activeCategory.value = category;
  };
  const getAllCategories = async () => {
    isLoading.value = true;
    isError.value = false;

    try {
      const allCategories = await CategoryService.getAllCategories();
      categories.value = ["all", ...allCategories];
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    categories,
    activeCategory,
    isLoading,
    isError,
    categoriesCount,
    changeActiveCategory,
    getAllCategories,
  };
});

export default useCategoryStore;
