import { useState } from 'react';

export const useImageSearch = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchImage = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.VITE_UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&client_id=${process.env.VITE_UNSPLASH_ACCESS_KEY}`);
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
