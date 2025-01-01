import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useShowToast from "./showToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { API_USER_ROUTES } from "../constants/API_ROUTES";
const useFollowUnfollow = (user) => {
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [isUserFollowing, setUserFollowing] = useState(
    user.followers?.includes(currentUser._id)
  );
  const URL = API_USER_ROUTES.FOLLOW_UNFOLLOW(user._id);
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

