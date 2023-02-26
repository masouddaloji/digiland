import { useState, useEffect } from "react";

const useFetch = (requestConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          requestConfig.url, 
          {
          method: requestConfig.method.length ? requestConfig.method : "Get",
          headers: requestConfig.headers.length ? requestConfig.headers : {},
          body: requestConfig.body.length ? JSON.stringify(requestConfig.body) : null,
        });
        if (response.ok) {
          const datas=await response.json();
          setAllData(datas.data)
          setIsLoading(false);
        } else {
          throw new Error("دریافت اطلاعات با مشکل مواجه شد");
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return {
    isLoading,
    error,
    allData
  };
};
export default useFetch;

