import {
  Flex,
  Text,
  Avatar,
  Box,
  Image,
  AspectRatio,
  Divider,
  Menu,
  MenuButton,
  Portal,
  MenuList,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import Actions from "./Actions";

import { formatDistanceToNow } from "date-fns";

import useFetch from "../hooks/useFetch";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/showToast";
import Loading from "./Loading";

import PostOwnerActions from "./PostOwnerActions";
import PostActions from "./PostActions";

const API_URL = import.meta.env.VITE_BASE_API_URL;

const UserPost = () => {
  const showToast = useShowToast();

  const currentUser = useRecoilValue(userAtom);
  const { postId } = useParams();

  const [postedBy, setPostedBy] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  const POST_URL = `post/getPost/${postId}`;

  const [post, setPost] = useState({});
  const [postOwner, setPostOwner] = useState(null);

  const {
    responseData,
    isLoading: postLoading,
    error: postError,
    statusCode: postStatusCode,
  } = useFetch(POST_URL);

  useEffect(() => {
    if (postStatusCode === 200 && responseData) {
      setPost(responseData);
    }
    if (postError) {
      showToast("Error", postError.message, "error");
    }
  }, [postStatusCode, responseData, postError, showToast]);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        setUserLoading(true);
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

    if (post.postedBy) {
      fetchUser(post.postedBy);
    }
  }, [post.postedBy, API_URL, currentUser?._id, showToast]);

  return (
    <>
      {postLoading && userLoading && <Loading />}
      {!postLoading && post?._id && postedBy && (
        <Flex gap={3} mb={4} py={5} w={"full"}>
          <Flex direction={"column"} alignItems={"center"}>
            <Flex gap={2} alignItems={"center"}>
              <Avatar
                size={"md"}
                name={postedBy?.fullName}
                src={postedBy?.profilePic}
              />
            </Flex>
            <Box w={"1px"} h={"full"} bg={"lightgrey"} my={2}></Box>
            <Box>
              <Text fontSize={"2xl"} align={"center"}>
                {post.tatmoji}
              </Text>
            </Box>
          </Flex>
          <Flex flex={1} direction={"column"} gap={2}>
            <Flex
              w={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex direction={"column"} alignItems={"start"}>
                <Text fontSize={{ base: "md" }} fontWeight={"bold"}>
                  {postedBy?.fullName}
                </Text>
                <Text fontSize={"xs"}>@{postedBy?.userName}</Text>
              </Flex>

              <Flex gap={4} alignItems={"center"}>
                <Text fontSize={"xs"}>
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </Text>
                <Menu>
                  <MenuButton>
                    <HiOutlineDotsHorizontal
                      cursor={"pointer"}
                      fontSize={"24px"}
                    />
                  </MenuButton>
                  <Portal>
                    <MenuList>
                      {postOwner ? (
                        <PostOwnerActions postId={postId} />
                      ) : (
                        <PostActions postId={postId} postedBy={postedBy} />
                      )}
                    </MenuList>
                  </Portal>
                </Menu>
              </Flex>
            </Flex>
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
                src={post.images[0]}
                w={"full"}
                h={"full"}
                objectFit={"cover"}
                objectPosition={"center"}
              />
            </AspectRatio>
            <Text className="nonSelectableText">{post.text}</Text>
            <Actions />
            <Divider />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default UserPost;
