import { defineStore } from "pinia";
import { CategoryService } from "@/services";

interface ICategoryState {
  categories: string[];
  activeCategory: string;
  isLoading: boolean;
  isError: boolean;
}

const useCategoryStore = defineStore("categories", {
  state: (): ICategoryState => ({
    categories: [],
    activeCategory: "all",
    isLoading: false,
    isError: false,
  }),
  getters: {
    categoriesCount(): number {
      return this.categories.length - 1;
    },
  },
  actions: {
    changeActiveCategory(category: string) {
      this.activeCategory = category;
    },
    async getAllCategories() {
      this.isLoading = true;
      this.isError = false;

      try {
        const categories = await CategoryService.getAllCategories();
        this.categories = ["all", ...categories];
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useCategoryStore;
