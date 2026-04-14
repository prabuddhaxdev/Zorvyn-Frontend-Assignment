import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    try {
      const response = await cb(...args);
      setData(response);
      setError(null);

      return response;
    } catch (error) {
      setError(error);
      toast.error(error.message);

      return { success: false, error: error.message };  return
    }
  };

  return { data, error, fn, setData };
};

export default useFetch;
