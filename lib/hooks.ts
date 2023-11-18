import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useQueryString = (searchParams: URLSearchParams) => {
  // const searchParams = useSearchParams()!;
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
  
      return params.toString()
    },
    [searchParams]
  );

  return useMemo(() => ({
    createQueryString,
  }), [
    createQueryString
  ]);

}