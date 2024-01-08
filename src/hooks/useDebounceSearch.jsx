import { useEffect, useState } from 'react';

function useDebounceSearch(query) {
  const [debounceValue, setDebounceValue] = useState(query);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(query);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return debounceValue;
}

export default useDebounceSearch;