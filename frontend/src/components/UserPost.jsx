import { Flex, Text, Box, Image, Divider } from "@chakra-ui/react";
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
  }, [postStatusCode, responseData, postError, showToast, setPosts]);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`${API_URL}/user/profile/${userId}`, {
          method: "GET",
          credentials: "include"
        });
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
  }, [currentPost, currentUser?._id, showToast]);

  if (postLoading || userLoading) return <Loading />;

  if (!currentPost) {
    return <NotFoundPage text={"Not found post!"} />;
  }

  return (
    <>
      {currentPost?._id && postedBy && (
        <Flex gap={3} w={"100%"}>
          <Flex direction={"column"} alignItems={"center"}>
            <PostAvatar postedBy={postedBy} />
            <Box w={"1px"} h={"full"} bg={"lightgrey"}></Box>
            <Box>
              <Text fontSize={"2xl"} align={"center"}>
                {currentPost.tatmoji}
              </Text>
            </Box>
          </Flex>
          <Flex flex={1} direction={"column"} alignItems={"center"} gap={2}>
            <PostInfo
              postOwner={postOwner}
              post={currentPost}
              postedBy={postedBy}
            />
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
                src={currentPost.images[0]}
                alt="Post Image"
                objectFit={"contain"} // Ensures the entire image is visible
                objectPosition={"center"}
                width="100%"
                height="100%"
                minHeight="300px" // Ensures a minimum height if image is too small
              />
            </Box>
            <Text className="nonSelectableText">{currentPost.text}</Text>
            <Actions currentPost={currentPost} />
            <Divider />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default UserPost;
