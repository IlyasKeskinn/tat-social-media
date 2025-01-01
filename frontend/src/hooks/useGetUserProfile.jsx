import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useEffect } from "react";
import useShowToast from "./showToast";
import { API_USER_ROUTES } from "../constants/API_ROUTES";

const useGetUserProfile = (userName) => {
  let { query } = useParams();
  if (typeof userName !== "undefined") {
    query = userName;
  }
  const URL = API_USER_ROUTES.GET_PROFILE(query);
  

  const { responseData, isLoading, error, statusCode } = useFetch(URL);

  const showToast = useShowToast();

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [error, showToast]);

  return { responseData, isLoading, statusCode };
};

export default useGetUserProfile;
