import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import useShowToast from "./showToast";

const useGetUserProfile = () => {
  const query = useParams().query;
  const URL = `user/profile/${query}`;

  const { responseData, isLoading, error,statusCode } = useFetch(URL);

  const showToast = useShowToast();

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [error, showToast]);

  return { responseData, isLoading,statusCode };
};

export default useGetUserProfile;
