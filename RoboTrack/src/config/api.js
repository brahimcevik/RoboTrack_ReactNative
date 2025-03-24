// Backend IP Adresi
const API_BASE_URL = 'https://192.168.137.1:44315';

// API URL'si
export const API_URL = `${API_BASE_URL}/api`;

// API endpoint'leri
export const ENDPOINTS = {
  UGV_ROBOTS: `${API_URL}/UgvRobot`,
};

// API istekleri için yardımcı fonksiyonlar
export const fetchApi = async (endpoint, options = {}) => {
  try {
    console.log('Fetching from:', endpoint); // Debug için

    const fetchOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const response = await fetch(endpoint, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default fetchApi;