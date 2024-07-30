import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useInView } from "react-intersection-observer";

import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import Loading from "../components/Loading";
import postAtom from "../atoms/postAtom";
import useShowToast from "../hooks/showToast";

const API_URL = import.meta.env.VITE_BASE_API_URL;

const fetchFeedPosts = async ({ pageParam = 1 }) => {
  try {
    const response = await fetch(
      `${API_URL}/post/feedPosts?page=${pageParam}&limit=10`,
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
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtom);
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
  }, [inView]);

  return (
    <>
      <Flex flex={2} alignItems={"center"} flexDirection={"column"}>
        <CreatePost />
        {status === "loading" && <Loading />}
        {status === "error" && (
          <Text size={"lg"}>An error occurred: {error.message}</Text>
        )}
        {status === "success" && (
          <>
            {posts.length === 0 && (
              <Text size={"lg"}>
                There are no posts. See more posts by following new people.
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
      <Flex flex={2} display={{ base: "none", lg: "flex" }}>
        {/* <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
          provident beatae fugiat?
        </Text> */}
      </Flex>
    </>
  );
};

export default Feed;
