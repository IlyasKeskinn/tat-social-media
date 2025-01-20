import { Grid, Text, VStack, Flex, Box, Icon } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";

import UserNotFoundPage from "../components/notfound/UserNotFoundPage";
import ProfilePagePost from "../components/post/ProfilePagePost";
import useGetUserProfile from "../hooks/useGetUserProfile";
import UserHeader from "../components/profile/UserHeader";
import Loading from "../components/shared/Loading";
import useShowToast from "../hooks/showToast";
import useFetch from "../hooks/useFetch";
import postAtom from "../atoms/postAtom";
import { API_BOOKMARK_ROUTES, API_POST_ROUTES } from "../constants/API_ROUTES";
import { MdBlock } from "react-icons/md";
import { PiGhost } from "react-icons/pi";


const Profile = () => {
  const userName = useParams().query;

  const URL = API_POST_ROUTES.GET_POSTS_BY_USER(userName);


  const [posts, setPosts] = useRecoilState(postAtom || []);
  const { responseData: user, isLoading, statusCode } = useGetUserProfile();
  const { ref, inView } = useInView();

  const showToast = useShowToast();
  const [tab, setTab] = useState("post");



  useEffect(() => {
    setTab("post");
  }, [userName, setTab]);

  useEffect(() => {
    if (tab === "post") {
      setPosts([]);
    }
  }, [tab, setPosts]);

  const { responseData, isLoading: fetchingPost, error } = useFetch(URL);

  useEffect(() => {
    if (statusCode === 200 && tab === "post") {
      setPosts(responseData.posts);
    }
  }, [responseData, error, statusCode, tab, setPosts, showToast, isLoading]);

  const fetchSavedPosts = async ({ pageParam = 1 }) => {
    try {
      const response = await fetch(
        API_BOOKMARK_ROUTES.FETCH_SAVED_POSTS(pageParam),
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      showToast("Error", error.message, "error");
      return [];
    }
  };

  const {
    data: savedPostsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: savedPostsStatus,
  } = useInfiniteQuery({
    queryKey: ["savedPosts"],
    queryFn: fetchSavedPosts,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    enabled: tab === "saved",
    onError: (err) => {
      showToast("Error", err.message, "error");
    },
  });

  useEffect(() => {
    if (inView && tab === "saved" && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, tab, hasNextPage, fetchNextPage]);

  if (statusCode === 404) {
    return <UserNotFoundPage />;
  }


  const handleSaved = () => {
    setTab("saved");
  };
  const handlePost = () => {
    setTab("post");
  };


  const displayedPosts =
    tab === "post" ? posts || [] : savedPostsData?.pages.flat() || [];


  const getEmptyStateContent = () => {
    if (tab === "post") {
      if (responseData.status === "blocked") {
        return {
          icon: MdBlock,
          text: "This user blocked.",
        };
      }
      if (responseData.status === "private") {
        return {
          icon: PiGhost,
          text: "This user's profile are private.",
        };
      }
      return {
        icon: null,
        text: `${userName} has no posts.`,
      };
    } else {
      return {
        icon: null,
        text: `${userName} has no saved posts.`,
      };
    }
  };

  const { icon: EmptyStateIcon, text: emptyStateText } = getEmptyStateContent();
  return isLoading || fetchingPost ? (
    <Loading />
  ) : (
    <VStack gap={0} flex={1}>
      <UserHeader
        posts={posts?.length}
        user={user}
        handlePost={handlePost}
        handleSaved={handleSaved}
        tab={tab}
      />
      {savedPostsStatus === "loading" ? (
        <Flex justifyContent="center" alignItems="center" height="200px">
          <Loading />
        </Flex>
      ) : displayedPosts.length === 0 ? (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt="5"
          textAlign="center"
        >
          {EmptyStateIcon && <Icon as={EmptyStateIcon} boxSize={12} mb={3} />}
          <Text fontSize={"lg"}>{emptyStateText}</Text>
        </Flex>
      ) : (
        <Grid w={"full"} templateColumns={"repeat(3, 1fr)"} gap={1}>
          {displayedPosts.map((post, index) => (
            <ProfilePagePost key={index} post={post} />
          ))}
          {isFetchingNextPage && <Loading />}
          {tab === "saved" && <Box ref={ref} />}
        </Grid>
      )}
    </VStack>
  );
};


export default Profile;
