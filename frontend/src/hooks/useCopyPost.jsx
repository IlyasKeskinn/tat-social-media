import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import useShowToast from "./showToast";


const useCopyPost = () => {
  const { t } = useTranslation();
  const BASE_URL = import.meta.env.VITE_FRONTEND_URL;
  const showToast = useShowToast();
  const copyPost = useCallback(
    (postID) => {
      const postURL = `${BASE_URL}/#/post/${postID}`;
      navigator.clipboard.writeText(postURL).then(() => {
        showToast(
          t("common.copiedToClipboard"),
          t("common.URLHasBeenCopiedSuccessfully"),
          "success"
        );
      });
    },
    [BASE_URL, showToast]
  );
  return copyPost;
};

export default useCopyPost;
