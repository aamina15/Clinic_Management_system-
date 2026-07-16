import { API_BASE_URL } from "@/lib/constants";

export type ApiClientConfig = {
  baseUrl?: string;
  getToken?: () => string | null;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function createApiClient(config: ApiClientConfig = {}) {
  const baseUrl = config.baseUrl ?? API_BASE_URL;

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const token = config.getToken?.();
    const headers = new Headers(init?.headers);

    if (!headers.has("Content-Type") && init?.body) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => undefined);
      throw new ApiError(response.status, response.statusText, data);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  return { request };
}

export const apiClient = createApiClient();
