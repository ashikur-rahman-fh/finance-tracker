import apiClient from "./apiClient";

export const api = {
  get: <T = unknown>(
    url: string,
    params: Record<string, unknown> = {},
    config: Record<string, unknown> = {}
  ) => requestWrapper<T>(() => apiClient.get(url, { ...config, params })),
  post: <T = unknown>(url: string, data = {}, config = {}) =>
    requestWrapper<T>(() => apiClient.post(url, data, config)),
  put: <T = unknown>(url: string, data = {}, config = {}) =>
    requestWrapper<T>(() => apiClient.put(url, data, config)),
  patch: <T = unknown>(url: string, data = {}, config = {}) =>
    requestWrapper<T>(() => apiClient.patch(url, data, config)),
  delete: <T = unknown>(url: string, config = {}) =>
    requestWrapper<T>(() => apiClient.delete(url, config)),
};

async function requestWrapper<T>(
  requestFn: () => Promise<unknown>
): Promise<T> {
  try {
    const response = await requestFn();
    return (response as { data: T }).data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
