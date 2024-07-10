import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useShowToast from "./showToast";

import { useRecoilValue } from "recoil";

import userAtom from "../atoms/userAtom";

const useFollowUnfollow = (user) => {
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [isUserFollowing, setUserFollowing] = useState(
    user.followers?.includes(currentUser._id)
  );
  const URL = `user/followUnfollow/${user._id}`;
  const { statusCode, isLoading, error, putData, responseData } = useFetch(
    URL,
    "PUT"
  );

  const handleFollowUnfollow = () => {
    putData();
  };

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
    if (statusCode === 200) {
      if (isUserFollowing) {
        user.followers.pop();
      } else {
        user.followers.push(currentUser._id);
      }
      setUserFollowing(!isUserFollowing);
    }
  }, [error, responseData]);

  return { handleFollowUnfollow, isLoading, isUserFollowing };
};

export default useFollowUnfollow;
