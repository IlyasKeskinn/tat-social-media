import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { Flex, Text } from "@chakra-ui/react";
import CreatePost from "../components/CreatePost";

import useFetch from "../hooks/useFetch";
import useShowToast from "../hooks/showToast";
import Loading from "../components/Loading";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";

const Feed = () => {
  const URL = `post/feedPosts`;

  const { responseData, statusCode, error, isLoading } = useFetch(URL);

  const showToast = useShowToast();

  const [posts, setPosts] = useRecoilState(postAtom);

  useEffect(() => {
    setPosts([]);
  }, []);

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
      setPosts([]);
    }
    if (statusCode === 200) {
      setPosts(responseData);
    }
  }, [responseData, error, setPosts]);

  return (
    <>
      <Flex flex={2} alignItems={"center"} flexDirection={"column"}>
        <CreatePost />
        {!isLoading && posts.length === 0 && (
          <Text size={"lg"}>
            There are no posts. See more posts by following new people.
          </Text>
        )}
        {isLoading && <Loading />}
        {posts.map((post, index) => {
          return <Post key={index} post={post} postedBy={post.postedBy} />;
        })}
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
