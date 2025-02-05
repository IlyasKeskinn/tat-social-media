import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useEffect } from "react";

import { API_USER_ROUTES } from "../constants/API_ROUTES";
import useShowToast from "./showToast";
import useFetch from "./useFetch";


const useGetUserProfile = (userName) => {
  const { t } = useTranslation();
  let { query } = useParams();
  if (typeof userName !== "undefined") {
    query = userName;
  }
  const URL = API_USER_ROUTES.GET_PROFILE(query);
  

  const { responseData, isLoading, error, statusCode } = useFetch(URL);

  const showToast = useShowToast();

  useEffect(() => {
    if (error) {
      showToast(t("common.error"), error.message, "error");
    }
  }, [error, showToast, t]);

  return { responseData, isLoading, statusCode };
};

export default useGetUserProfile;
