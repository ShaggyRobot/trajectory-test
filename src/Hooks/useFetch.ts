import { useEffect, useState } from "react";

const useFetch = <DTOType>(url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<DTOType>();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(res.status + res.statusText);
      }

      const data: DTOType = await res.json();

      setData(data);
      setIsLoading(false);
    } catch (e) {
      setError(e as Error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
