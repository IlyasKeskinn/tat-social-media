import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
  const [responseData, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState("");
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const fetchURL = `${API_URL}/${url}`;

  const postData = (data) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
  };

  const putData = (data) => {
    setOptions({
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(fetchURL, { ...options });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error);
        }
        const data = await response.json();
        setStatus("ok");
        setData(data);
        setLoading(false);
        setError("")
      } catch (error) {
        setStatus("error")
        setLoading(false);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }
    if (method === "PUT" && options) {
      fetchData(options);
    }
  }, [fetchURL, options, method]);

  return {status,responseData, isLoading, error, postData, putData};
};

export default useFetch;
