import { useState } from "react";
import useShowToast from "./showToast";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";

const useDelete = (req_body, URL, msg) => {
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const fetchURL = `${API_URL}/${URL}`;
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtom);

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
        setPosts(posts.filter((p) => p._id !== req_body));
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
