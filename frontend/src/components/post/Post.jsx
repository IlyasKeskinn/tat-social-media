import { Flex, Text, Box, Image, Divider } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import { memo } from "react";

import userAtom from "../../atoms/userAtom";
import useFetch from "../../hooks/useFetch";
import PostSkeleton from "./PostSkeleton";
import Actions from "../shared/Actions";
import PostAvatar from "./PostAvatar";
import PostInfo from "./PostInfo";


const Post = memo(({ post }) => {
  const [user, setUser] = useState(null);
  const [postOwner, setPostOwner] = useState(null);

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
              <Box
                borderRadius={6}
                overflow={"hidden"}
                w={"100%"}
                maxW="700px" // Adjust based on your design needs
                maxH="700px" // Adjust based on your design needs
                position="relative"
                height="auto"
              >
                <Image
                  src={post.images[0]}
                  alt="Post Image"
                  objectFit={"contain"} // Ensures the entire image is visible
                  objectPosition={"center"}
                  width="100%"
                  height="100%"
                  minHeight="300px" // Ensures a minimum height if image is too small
                />
              </Box>
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
Post.displayName = "Post";
Post.propTypes = {
  post: PropTypes.object.isRequired,
};
export default Post;
