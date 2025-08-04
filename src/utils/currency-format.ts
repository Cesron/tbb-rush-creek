export const currencyFormat = (
  number: number,
  options: Intl.NumberFormatOptions = {}
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  });

  return formatter.format(number);
};
