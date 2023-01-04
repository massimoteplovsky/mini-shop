import { defineStore } from "pinia";

export const useCounterStore = defineStore("products", {
  state: () => ({ counter: 0 as number }),
  getters: {
    doubleCount: (state) => state.counter + 2,
  },
  actions: {
    increment() {
      this.counter += 1;
    },
    decrement() {
      this.counter -= 1;
    },
  },
});
