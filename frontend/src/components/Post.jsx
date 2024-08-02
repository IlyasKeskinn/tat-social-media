import { Flex, Text, Box, Image, AspectRatio, Divider } from "@chakra-ui/react";

import Actions from "./Actions";

import { Link as LinkRouter } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import PostInfo from "./PostInfo";
import PostAvatar from "./PostAvatar";
import postAtom from "../atoms/postAtom";

import { memo } from "react";
import PostSkeleton from "./PostSkeleton";

const Post = memo(({ post }) => {
  const [user, setUser] = useState(null);
  const [postOwner, setPostOwner] = useState(null);
  const [posts, setPosts] = useRecoilState(postAtom);

  const URL = `user/profile/${post?.postedBy}`;
  const postID = post._id;

  const { responseData, isLoading, error, statusCode } = useFetch(URL);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    if (statusCode === 200) {
      setUser(responseData);
      if (!currentUser) {
        setPostOwner(false);
      } else {
        if (currentUser._id === user) {
          setPostOwner(true);
        } else {
          setPostOwner(false);
        }
      }
    }
  }, [statusCode, responseData, error, setPostOwner]);

  return (
    <>
      {isLoading && <PostSkeleton />}
      {user && post && (
        <Flex gap={3} mb={4} py={5} w={"full"}>
          <Flex direction={"column"} alignItems={"center"}>
            <PostAvatar postedBy={user} />
            <Box w={"1px"} h={"full"} bg={"lightgrey"} my={2}></Box>
            <Box>
              <Text fontSize={"2xl"} align={"center"}>
                {post.tatmoji}
              </Text>
            </Box>
          </Flex>
          <Flex flex={1} direction={"column"} gap={2}>
            <PostInfo postOwner={postOwner} post={post} postedBy={user} />
            <LinkRouter style={{ width: "100%" }} to={`/post/${postID}`}>
              <AspectRatio
                ratio={4 / 3}
                border={"1px solid"}
                borderColor={"gray.light"}
                borderRadius={6}
                overflow={"hidden"}
                h={{ sm: "600px", md: "650px", lg: "500px" }}
                w={"100%"}
              >
                <Image
                  src={post.images[0]}
                  w={"full"}
                  h={"full"}
                  objectFit={"cover"}
                  objectPosition={"center"}
                />
              </AspectRatio>
            </LinkRouter>
            <Text className="nonSelectableText">{post.text}</Text>
            <Actions currentPost={post} />
            <Divider />
          </Flex>
        </Flex>
      )}
    </>
  );
});

export default Post;
