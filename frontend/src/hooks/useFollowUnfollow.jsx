import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { API_USER_ROUTES } from "../constants/API_ROUTES";
import userAtom from "../atoms/userAtom";
import useShowToast from "./showToast";
import useFetch from "./useFetch";


const useFollowUnfollow = (user) => {
  const { t } = useTranslation();
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();

  // Check if the current user is following the given user
  const [isUserFollowing, setUserFollowing] = useState(
    user.followers?.includes(currentUser._id)
  );
  const [isRequestSent, setIsRequestSent] = useState(false); // Track if a request is sent

  const URL = API_USER_ROUTES.FOLLOW_UNFOLLOW(user._id); // API endpoint for follow/unfollow
  const { statusCode, isLoading, error, putData, responseData } = useFetch(
    URL,
    "PUT"
  );
  const handleFollowUnfollow = () => {
    putData(); // Trigger the follow/unfollow API request
  };
  useEffect(() => {
    if (error) {
      showToast(t("common.error"), error.message, "error"); // Show error notification
    }
    if (statusCode === 201) {
      showToast(t("common.success"), t("notifications.followRequestSent"), "success"); // Show follow request success notification
      setIsRequestSent(true);
    }
    if (statusCode === 200) {
      // Update local state when follow/unfollow succeeds
      if (isUserFollowing) {
        user.followers.pop();  // Remove current user from followers
      } else {
        user.followers.push(currentUser._id); // Add current user to followers
      }
      setUserFollowing(!isUserFollowing);
      setIsRequestSent(false);

    }
  }, [error, responseData]); // Re-run effect when error or response data changes
  return { handleFollowUnfollow, isLoading, isUserFollowing, isRequestSent };
};
export default useFollowUnfollow;

