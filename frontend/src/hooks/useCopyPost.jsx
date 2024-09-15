import { useCallback } from "react";
import useShowToast from "./showToast";

const useCopyPost = () => {
  const BASE_URL = import.meta.env.VITE_FRONTEND_URL;
  const showToast = useShowToast();
  const copyPost = useCallback(
    (postID) => {
      const postURL = `${BASE_URL}/#/post/${postID}`;
      navigator.clipboard.writeText(postURL).then(() => {
        showToast(
          "Copied to clipboard",
          "Post URL has been copied successfully.",
          "success"
        );
      });
    },
    [BASE_URL, showToast]
  );
  return copyPost;
};

export default useCopyPost;
