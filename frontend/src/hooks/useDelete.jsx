import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import useShowToast from "./showToast";
import userAtom from "../atoms/userAtom";

const useDelete = (req_body, URL, msg) => {

  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const fetchURL = `${API_URL}/${URL}`;
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
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
        setDeleted(true);
        showToast("Success", msg, "success");
        navigate(`/profile/${currentUser.userName}`)
      } else {
        showToast("Error", data.error || "Failed to delete post", "error");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
      setDeleted(false);
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, isLoading, deleted };
};

export default useDelete;
