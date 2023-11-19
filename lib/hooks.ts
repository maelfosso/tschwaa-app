import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useQueryString = () => {
  const searchParams = useSearchParams()!;
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
  
      return params.toString()
    },
    [searchParams]
  );

  const emptyQueryString = useCallback(
    () => {
      const params = new URLSearchParams(searchParams);
      for (const [key, value] of params.entries()) {
        params.delete(key);
      }
    },
    [searchParams]
  )

  return useMemo(() => ({
    createQueryString,
    emptyQueryString,
  }), [
    createQueryString,
    emptyQueryString,
  ]);

}