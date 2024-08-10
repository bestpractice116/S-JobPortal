import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    // Update the debounce value after the delay
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // cleanup the function to clear the timeout on component unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
