
const API_BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export type Product = {
  id: string | number;
  name?: string;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  images?: string[];
  price?: number | string;
  category?: string;
  [key: string]: unknown;
};

export type Category = {
  id: string | number;
  name?: string;
  title?: string;
  slug?: string;
  image?: string;
  [key: string]: unknown;
};

async function fetchApi<T>(endpoint: string): Promise<T> {
  let lastError: unknown;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `Unable to fetch ${endpoint} from either BazarDor API.`,
    { cause: lastError }
  );
}

function getList<T>(result: unknown, keys: string[]): T[] {
  if (Array.isArray(result)) {
    return result as T[];
  }

  if (result && typeof result === "object") {
    const object = result as Record<string, unknown>;

    for (const key of keys) {
      if (Array.isArray(object[key])) {
        return object[key] as T[];
      }
    }

    if (object.data && typeof object.data === "object") {
      return getList<T>(object.data, keys);
    }
  }

  throw new Error("Unexpected API response: expected a list.");
}

function getItem<T>(result: unknown, key: string): T {
  if (result && typeof result === "object" && !Array.isArray(result)) {
    const object = result as Record<string, unknown>;

    if (object[key] && typeof object[key] === "object") {
      return object[key] as T;
    }

    if (object.data && typeof object.data === "object") {
      return getItem<T>(object.data, key);
    }
  }

  return result as T;
}

export async function getProducts(
  category?: string
): Promise<Product[]> {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  const result = await fetchApi<unknown>(`/products${query}`);

  return getList<Product>(result, ["products", "items", "results"]);
}

export async function getProduct(
  id: string | number
): Promise<Product> {
  const result = await fetchApi<unknown>(
    `/products/${encodeURIComponent(String(id))}`
  );

  return getItem<Product>(result, "product");
}

export async function getCategories(): Promise<Category[]> {
  const result = await fetchApi<unknown>("/categories");

  return getList<Category>(result, ["categories", "items", "results"]);
}

export async function getCategory(
  slug: string
): Promise<Category> {
  const result = await fetchApi<unknown>(
    `/categories/${encodeURIComponent(slug)}`
  );

  return getItem<Category>(result, "category");
}