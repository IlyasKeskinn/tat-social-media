import { useState } from "react";
import useShowToast from "./showToast";

const useDelete = (req_body, URL, msg) => {
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const fetchURL = `${API_URL}/${URL}`;
  const showToast = useShowToast();

  const [isLoading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(fetchURL, {
        method: "DELETE",
        body: JSON.stringify(req_body),
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 200) {
        setDeleted(true);
        showToast("Success", msg, "success");
      } else {
        showToast("Error", data.error || "Failed to delete post", "error");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, isLoading, deleted };
};

export default useDelete;
