import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
  const [responseData, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const fetchURL = `${API_URL}/${url}`;

  const postData = (data) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
  };

  const putData = (data) => {
    setOptions({
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(fetchURL, { ...options });

        setStatusCode(response.status);

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || "An error occurred");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
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

  return {
    responseData,
    statusCode,
    isLoading,
    error,
    postData,
    putData,
  };
};

export default useFetch;
