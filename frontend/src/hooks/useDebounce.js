import { useEffect, useState } from "react";

const useDebounce = (value, delay ) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(debounceHandler);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
