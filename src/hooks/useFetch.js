import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from a URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {object} { data, loading, error }
 */
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'An unexpected error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};
