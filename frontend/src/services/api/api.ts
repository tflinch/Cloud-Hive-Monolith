const BASE_URL = 'http://localhost:5000';

interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

const testApi = async <T>(
  endpoint: string,
  p0: { method: string; body: FormData }
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: p0.method,
      body: p0.body,
      // Do not set Content-Type header for FormData; browser will set it automatically
    });
    const data: T = await response.json();
    return { data };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { data: null, error: errorMessage };
  }
};

async function uploadFile(file: File) {
  const form = new FormData();
  form.append('file', file); // field name must be 'file'

  const res = await fetch('/api/upload', { method: 'POST', body: form });

  // Don’t assume JSON if it failed—log the raw text to see HTML errors
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${res.status} ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    // In case server replied with plain text JSON-ish
    return text;
  }
}

export { testApi, uploadFile };
