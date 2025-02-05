import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { useState } from "react";

import userAtom from "../atoms/userAtom";
import useShowToast from "./showToast";


const useDelete = (req_body, URL, msg) => {
  const { t } = useTranslation();
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL, {
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
        showToast(t("common.error"), data.error || t("common.failedToDelete"), "error");
      }
    } catch (error) {
      showToast(t("common.error"), error.message, "error");
      setDeleted(false);
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, isLoading, deleted };
};

export default useDelete;
