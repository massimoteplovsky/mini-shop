export const capitalizeWord = (word: string) =>
  word[0].toUpperCase() + word.substring(1);

export const sliceArrayByIndex = (arr: any[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
