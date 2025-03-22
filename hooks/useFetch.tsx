import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

interface FetchState<T> {
  data: T | null;
  loading: boolean | null;
  error: string | null;
}

const useFetch = <T,>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchDataFromApi(url, {})
      .then((res) => {
        setLoading(false);
        setData(res as T);
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
