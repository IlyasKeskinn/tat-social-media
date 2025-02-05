import { useRecoilState, useSetRecoilState } from "recoil";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { API_NOTIFICATION_ROUTES, API_POST_ROUTES } from "../constants/API_ROUTES";
import SuggestedUsers from "../components/users/SuggestedUsers";
import notificationAtom from "../atoms/notificationAtom";
import CreatePost from "../components/post/CreatePost";
import Loading from "../components/shared/Loading";
import TopBar from "../components/menu/TopBar";
import useShowToast from "../hooks/showToast";
import Post from "../components/post/Post";
import useFetch from "../hooks/useFetch";
import postAtom from "../atoms/postAtom";


const fetchFeedPosts = async ({ pageParam = 1 }) => {
  try {
    const response = await fetch(
      API_POST_ROUTES.FEED_POSTS(pageParam),
      { credentials: "include" }
    );

    if (!response.ok) {
      // Detailed error handling
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetching posts failed: ${error.message}`);
  }
};

const Feed = () => {
  const { t } = useTranslation();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtom);
  const setUnreadNotifications = useSetRecoilState(notificationAtom);
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["feedPosts"],
    queryFn: fetchFeedPosts,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    onError: (err) => {
      showToast("Error", err.message, "error");
    },
  });

  const { responseData, statusCode } = useFetch(API_NOTIFICATION_ROUTES.GET_UNREAD_NOTIFICATIONS);

  useEffect(() => {
    if (data) {
      // Flatten and set posts
      setPosts(data.pages.flat());
    }
  }, [data, setPosts]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (statusCode === 200) {
      setUnreadNotifications(responseData);
      
    }
  }, [statusCode, setUnreadNotifications, responseData]);

  return (
    <>
      <Flex flex={2} alignItems={"center"} flexDirection={"column"}>
        <TopBar />
        <CreatePost />
        {status === "loading" && <Loading />}
        {status === "error" && (
          <Text size={"lg"}>{t("common.errorOccurred")}: {error.message}</Text>
        )}
        {status === "success" && (
          <>
            {posts.length === 0 && (
              <Text size={"lg"}>
                {t("feed.noPosts")}
              </Text>
            )}
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
            {isFetchingNextPage && <Loading />}
            {!isFetchingNextPage && hasNextPage && <Box ref={ref} />}
          </>
        )}
      </Flex>
      <Flex flex={2} display={{ base: "none", lg: "flex" }} flexDirection={"column"} alignItems={"center"} alignContent={"center"}>
        <SuggestedUsers />
      </Flex>
    </>
  );
};

export default Feed;
