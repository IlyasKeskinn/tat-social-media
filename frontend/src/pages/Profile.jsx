import { Grid, Text, VStack } from "@chakra-ui/react";

import UserHeader from "../components/UserHeader";
import ProfilePagePost from "../components/ProfilePagePost";

import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/showToast";

import useFetch from "../hooks/useFetch";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import UserNotFoundPage from "../components/UserNotFoundPage";
import Loading from "../components/Loading";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";

const Profile = () => {
  const [posts, setPosts] = useRecoilState(postAtom);
  const { responseData: user, isLoading, statusCode } = useGetUserProfile();
  const userName = useParams().query;
  const URL = `post/getuserPost/${userName}`;
  const showToast = useShowToast();

  useEffect(() => {
    setPosts([]);
  }, []);

  const {
    responseData,
    isLoading: fetchingPost,
    statusCode: postFetchStatusCode,
    error,
  } = useFetch(URL);

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
      setPosts([]);
    }
    if (statusCode == 200) {
      setPosts(responseData);
    }
  }, [responseData, error]);

  if (statusCode === 404) {
    return <UserNotFoundPage />;
  }

  return isLoading && fetchingPost ? (
    <Loading />
  ) : (
    <VStack flex={1}>
      <UserHeader posts={posts.length} user={user} />
      {!fetchingPost && !posts ? (
        <Text fontSize={"lg"} mt={"5"}>
          User has not posts.
        </Text>
      ) : (
        <Grid w={"full"} templateColumns={"repeat(3, 1fr)"} gap={1}>
          {posts.map((post, index) => {
            return <ProfilePagePost key={index} post={post} />;
          })}
        </Grid>
      )}
    </VStack>
  );
};

export default Profile;
