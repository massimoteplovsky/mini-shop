import { api } from "@/api";
import { ApiRoute } from "./../utils/consts";

const CategoryService = {
  async getAllCategories() {
    const { data } = await api.get<string[]>(ApiRoute.CATEGORIES);
    return data;
  },
};

export default CategoryService;
