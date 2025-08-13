const BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

const testApi = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export { testApi };
