import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import useShowToast from "./showToast";
import postAtom from "../atoms/postAtom";
import userAtom from "../atoms/userAtom";

const useDelete = (req_body, URL, msg) => {
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const fetchURL = `${API_URL}/${URL}`;
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtom);
  const navigate = useNavigate();

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
        navigate(`/profile/${currentUser.userName}`)
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
