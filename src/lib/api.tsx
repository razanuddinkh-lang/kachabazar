
import type { MarketProduct } from "@/types/product";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

// Get all products
export async function getProducts(): Promise<MarketProduct[]> {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return data as MarketProduct[];
  }

  if (data && typeof data === "object") {
    const result = data as {
      products?: MarketProduct[];
      data?: MarketProduct[];
      results?: MarketProduct[];
    };

    if (Array.isArray(result.products)) return result.products;
    if (Array.isArray(result.data)) return result.data;
    if (Array.isArray(result.results)) return result.results;
  }

  return [];
}

// Get one product by slug
export async function getProduct(
  slug: string
): Promise<MarketProduct | null> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}

// Get all categories
export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Categories could not be loaded");
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) return data;

  if (data && typeof data === "object") {
    const result = data as {
      categories?: unknown[];
      data?: unknown[];
      results?: unknown[];
    };

    if (Array.isArray(result.categories)) return result.categories;
    if (Array.isArray(result.data)) return result.data;
    if (Array.isArray(result.results)) return result.results;
  }

  return [];
}

// Get products belonging to one category
export async function getCategoryProducts(
  slug: string
): Promise<MarketProduct[]> {
  const products = await getProducts();

  return products.filter((product) => product.category === slug);
}
