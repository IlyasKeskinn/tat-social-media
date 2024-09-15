import { Flex, Box, Text, useDisclosure } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import postAtom from "../atoms/postAtom";
import useFetch from "../hooks/useFetch";
import useShowToast from "../hooks/showToast";
import UserListModal from "./UserListModal";
import Comments from "./Comments";
import { BookmarkSVG } from "./IconSvg";
import PropTypes from "prop-types";

const Actions = ({ currentPost }) => {
  const LIKE_URL = `post/likeUnlikePost/${currentPost._id}`;
  const BOOKMARK_URL = `bookmarks/postBookmark/${currentPost._id}`;

  const [user, setUser] = useRecoilState(userAtom);
  const showToast = useShowToast();

  const [liked, setLiked] = useState(currentPost.likes.includes(user?._id));
  const [posts, setPosts] = useRecoilState(postAtom);
  const [bookmarked, setBookmarked] = useState(
    user.bookmarksCollection?.includes(currentPost._id)
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenComment,
    onOpen: onOpenComment,
    onClose: onCloseComment,
  } = useDisclosure();

  const {
    isLoading: isLiking,
    error,
    putData,
  } = useFetch(LIKE_URL, "PUT");

  const {
    isLoading: isBookmarking,
    statusCode: bookmarkStatusCode,
    error: bookmarkError,
    responseData,
    postData,
  } = useFetch(BOOKMARK_URL, "POST");

  const handleLiked = () => {
    if (!user)
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );
    if (isLiking) {
      return;
    }
    putData();
    if (!liked) {
      const updatedPosts = posts.map((post) => {
        if (post._id === currentPost._id) {
          return { ...post, likes: [...post.likes, user._id] };
        }
        return post;
      });
      setPosts(updatedPosts);
    } else {
      const updatedPosts = posts.map((post) => {
        if (post._id === currentPost._id) {
          return { ...post, likes: post.likes.filter((id) => id !== user._id) };
        }
        return post;
      });
      setPosts(updatedPosts);
    }
    setLiked(!liked);
  };
  const handleBookmark = () => {
    if (!user) {
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );
    }
    if (isBookmarking) {
      return;
    }

    postData();

    if (!bookmarked) {
      setUser((prevUser) => {
        const updatedBookmarksCollection =
          prevUser.bookmarksCollection.includes(currentPost._id)
            ? prevUser.bookmarksCollection
            : [...prevUser.bookmarksCollection, currentPost._id];

        localStorage.setItem(
          "tatuser",
          JSON.stringify({
            ...prevUser,
            bookmarksCollection: updatedBookmarksCollection,
          })
        );

        return {
          ...prevUser,
          bookmarksCollection: updatedBookmarksCollection,
        };
      });
    } else {
      setUser((prevUser) => {
        const updatedBookmarksCollection = prevUser.bookmarksCollection.filter(
          (id) => id !== currentPost._id
        );

        localStorage.setItem(
          "tatuser",
          JSON.stringify({
            ...prevUser,
            bookmarksCollection: updatedBookmarksCollection,
          })
        );

        return {
          ...prevUser,
          bookmarksCollection: updatedBookmarksCollection,
        };
      });
    }

    setBookmarked(!bookmarked);
  };

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [error]);

  useEffect(() => {
    if (bookmarkError) {
      showToast("Error", "Something went wrong", "error");
    }
    if (bookmarkStatusCode === 200) {
      showToast("Succesfully", responseData.message, "success");
    }
  }, [bookmarkError, responseData]);

  return (
    <>
      <Flex direction={"column"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex gap={2}>
            <LikeButton liked={liked} handleLiked={handleLiked} />
            <Box my={2} cursor={"pointer"}>
              <svg
                aria-label="comment"
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="currentColor"
                onClick={onOpenComment}
              >
                <title>Comment</title>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>Comment</title>
                  <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Icon-Set"
                      transform="translate(-360.000000, -255.000000)"
                      fill="currentColor"
                    >
                      {" "}
                      <path
                        d="M390,277 C390,278.463 388.473,280 387,280 L379,280 L376,284 L373,280 L365,280 C363.527,280 362,278.463 362,277 L362,260 C362,258.537 363.527,257 365,257 L387,257 C388.473,257 390,258.537 390,260 L390,277 L390,277 Z M386.667,255 L365.333,255 C362.388,255 360,257.371 360,260.297 L360,277.187 C360,280.111 362.055,282 365,282 L371.639,282 L376,287.001 L380.361,282 L387,282 C389.945,282 392,280.111 392,277.187 L392,260.297 C392,257.371 389.612,255 386.667,255 L386.667,255 Z"
                        id="comment-5"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </Box>
          </Flex>
          <Flex gap={2}>
            <Box
              cursor={"pointer"}
              onClick={() => {
                handleBookmark();
              }}
              my={2}
            >
              <BookmarkSVG isActive={bookmarked} />
            </Box>
            <ShareSvg />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={2}>
          <Text
            onClick={onOpen}
            className="nonSelectableText"
            fontSize={"sm"}
            cursor={"pointer"}
          >
            {currentPost.likes.length} Likes
          </Text>
          <Box w={1} h={1} bg={"gray"} rounded={"full"}></Box>
          <Text
            onClick={onOpenComment}
            className="nonSelectableText"
            fontSize={"sm"}
            cursor={"pointer"}
          >
            {currentPost.comments.length} Comments
          </Text>
        </Flex>
      </Flex>

      {/* Like list */}
      <UserListModal
        isOpen={isOpen}
        onClose={onClose}
        likesArr={currentPost.likes}
      />
      {/* Comments */}
      <Comments
        onClose={onCloseComment}
        isOpen={isOpenComment}
        currentPost={currentPost}
      />
    </>
  );
};

export default Actions;

Actions.propTypes = {
  currentPost: PropTypes.object.isRequired,
}

export const ShareSvg = () => {
  return (
    <Box my={2} cursor={"pointer"}>
      <svg
        aria-label="send"
        fill="currentColor"
        width="24px"
        height="24px"
        viewBox="0 0 24.00 24.00"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#000000"
        strokeWidth="0.00024000000000000003"
        transform="matrix(1, 0, 0, 1, 0, 0)"
      >
        <title>Send</title>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.72"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M22.7,3.55a1,1,0,0,1,0,1.422L18.77,8.862a9.542,9.542,0,0,1-.682,12.849,1,1,0,0,1-1.406,0L11.5,16.59,9.046,21.451a1,1,0,0,1-.732.536.959.959,0,0,1-.16.013,1,1,0,0,1-.7-.289L1.3,15.624a1,1,0,0,1,.26-1.607l4.9-2.422L1.3,6.493a1,1,0,0,1,0-1.422,9.733,9.733,0,0,1,10.642-2.05,1,1,0,1,1-.773,1.843,7.748,7.748,0,0,0-7.7.964l5.388,5.33a1,1,0,0,1-.26,1.608L3.7,15.188l4.181,4.135,2.457-4.861a1,1,0,0,1,1.6-.26l5.406,5.347a7.541,7.541,0,0,0-.658-10.012,1,1,0,0,1,0-1.422l3.785-3.744a3.392,3.392,0,0,0-3.918.6L12.7,8.776a1,1,0,0,1-1.7-.607,1.051,1.051,0,0,1,.446-.967L15.143,3.55A5.4,5.4,0,0,1,22.7,3.55Z"></path>
        </g>
      </svg>
    </Box>
  );
};

export const LikeButton = ({ liked, handleLiked, size = 24 }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (liked) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [liked]);

  return (
    <Box my={2} cursor={"pointer"} onClick={handleLiked} position="relative">
      <svg
        aria-label="Like & Unlike"
        width={size}
        height={size}
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill={liked ? "rgb(237, 73, 86)" : "transparent"}
        xmlns="http://www.w3.org/2000/svg"
        className={liked && animate ? "fill-animation" : ""}
      >
        <title>Like</title>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          {liked !== true && (
            <path
              opacity="0.5"
              d="M12 5.50073L10.5 8.5001L14 11.0001L11 14.5001L13 16.5001L12 20.5001"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          )}
        </g>
      </svg>
    </Box>
  );
};

LikeButton.propTypes = {
  liked: PropTypes.bool.isRequired,
  handleLiked: PropTypes.func.isRequired,
  size: PropTypes.number,
};
