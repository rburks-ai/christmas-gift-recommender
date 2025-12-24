export function scoreProduct(
  product: any,
  age: number,
  gender: string,
  budget: number
) {
  let score = 0;

  if (product.price <= budget) score += 2;

  if (age < 18 && product.category.includes("electronics")) score -= 1;
  if (age >= 18 && product.category.includes("electronics")) score += 2;

  if (gender === "female" && product.category.includes("jewelery")) score += 2;
  if (gender === "male" && product.category.includes("electronics")) score += 1;

  return score;
}
