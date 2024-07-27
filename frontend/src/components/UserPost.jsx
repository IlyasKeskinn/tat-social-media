import {
  Flex,
  Text,
  Avatar,
  Box,
  Image,
  AspectRatio,
  Divider,
} from "@chakra-ui/react";

import Actions from "./Actions";
import PostInfo from "./PostInfo";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/showToast";
import Loading from "./Loading";
import PostAvatar from "./PostAvatar";
import postAtom from "../atoms/postAtom";
import NotFoundPage from "./NotFoundPage";

const API_URL = import.meta.env.VITE_BASE_API_URL;

const UserPost = () => {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const { postId } = useParams();

  const [postedBy, setPostedBy] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  const POST_URL = `post/getPost/${postId}`;
  const [posts, setPosts] = useRecoilState(postAtom);
  const [postOwner, setPostOwner] = useState(null);

  const currentPost = posts[0];

  useEffect(() => {
    setPosts([]);
  }, []);

  const {
    responseData,
    isLoading: postLoading,
    error: postError,
    statusCode: postStatusCode,
  } = useFetch(POST_URL);

  useEffect(() => {
    if (postStatusCode === 200 && responseData) {
      setPosts([responseData]);
    }
    if (postError) {
      showToast("Error", postError.message, "error");
    }
  }, [postStatusCode, responseData, postError, showToast]);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`${API_URL}/user/profile/${userId}`);
        if (response.status === 200) {
          const data = await response.json();
          setPostedBy(data);
          setPostOwner(currentUser?._id === data._id);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setUserLoading(false);
      }
    };

    if (currentPost?.postedBy) {
      fetchUser(currentPost?.postedBy);
    } else {
      setUserLoading(false);
    }
  }, [currentPost, API_URL, currentUser?._id, showToast]);

  if (postLoading || userLoading) return <Loading />;

  if (!currentPost) {
    return <NotFoundPage text={"Not found post!"} />;
  }

  return (
    <>
      {currentPost?._id && postedBy && (
        <Flex gap={3} mb={4} py={5} w={"full"}>
          <Flex direction={"column"} alignItems={"center"}>
            <PostAvatar postedBy={postedBy} />
            <Box w={"1px"} h={"full"} bg={"lightgrey"} my={2}></Box>
            <Box>
              <Text fontSize={"2xl"} align={"center"}>
                {currentPost.tatmoji}
              </Text>
            </Box>
          </Flex>
          <Flex flex={1} direction={"column"} gap={2}>
            <PostInfo
              postOwner={postOwner}
              post={currentPost}
              postedBy={postedBy}
            />
            <AspectRatio
              ratio={4 / 3}
              border={"1px solid"}
              borderColor={"gray.light"}
              borderRadius={6}
              overflow={"hidden"}
              h={{ sm: "600px", md: "650px", lg: "700px" }}
              w={"100%"}
            >
              <Image
                src={currentPost.images[0]}
                w={"full"}
                h={"full"}
                objectFit={"cover"}
                objectPosition={"center"}
              />
            </AspectRatio>
            <Text className="nonSelectableText">{currentPost.text}</Text>
            <Actions />
            <Divider />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default UserPost;
