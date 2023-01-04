import { api } from "./../api";
import type { IProduct } from "./../utils/types";
import { ApiRoute } from "./../utils/consts";

const ProductService = {
  async getProducts() {
    const data = await api.get<IProduct[]>(ApiRoute.PRODUCTS);
    return data;
  },
};

export default ProductService;
