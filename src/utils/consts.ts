export const ApiRoute = {
  PRODUCTS: "/",
  PRODUCTS_BY_CATEGORY: (category: string) => `/category/${category}`,
  CATEGORIES: "/categories",
};
