import { useState } from 'react';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'pydo48XhDNZ4Dhy78nlbCYtefiqMo2bLYt9zyUQJBg0';

export const useImageSearch = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchImage = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setImageUrl(data.results[0].urls.regular);
      } else {
        setImageUrl(null);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return { imageUrl, fetchImage, loading };
};
