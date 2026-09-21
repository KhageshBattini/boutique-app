const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080/api';

export class ApiError extends Error {}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('authToken');
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    });
  } catch {
    throw new ApiError('Cannot reach the backend at http://localhost:8080. Start MySQL and the Java API, then try again.');
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(body.message ?? 'Something went wrong. Please try again.');
  }
  return response.status === 204 ? (undefined as T) : response.json();
}
