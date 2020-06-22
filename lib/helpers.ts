export const sum = (arr = [], currency = "$"): number =>
  currency === "$"
    ? arr.reduce((a, b) => a + parseFloat(b.price), 0).toFixed(2)
    : (arr.reduce((a, b) => a + parseFloat(b.price), 0) * 0.8).toFixed(2);
