import { useState, useEffect } from "react";

type LoaderState = "idle" | "loading" | "success" | "error";

export const useDataLoader = <T> (
  getDataFn: () => Promise<T>,
  defaultValue: T | null
) => {
  const [state, setState] = useState<LoaderState>("idle");
  const [data, setData] = useState<T | null>(defaultValue);

  useEffect(() => {
    (async () => {
      try {
        setState("loading");
        const result = await getDataFn();
        setData(result);
        setState("success");
      } catch (error) {
        console.error(error);
        setState("error");
      }
    })();
  }, [getDataFn]);

  const reload = async () => {
    try {
      setState("loading");
      const result = await getDataFn();
      setData(result);
      setState("success");
    } catch (error) {
      console.log(error);
      setState("error");
    }
  };

  return {data, state, reload};
};
