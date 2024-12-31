import {
  Flex,
  Text,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";



import ProfilePreviewPopover from "./ProfilePreviewPopover.jsx";
import ExpandableText from "./ExpandableText.jsx";
import { useEffect, useState } from "react";
import { LikeButton } from "./Actions.jsx";
import Reply from "./Reply.jsx";

import useFormatShortDistanceToNow from "../hooks/useFormatShortDistanceToNow.jsx";
import useShowToast from "../hooks/showToast.jsx";

import PropTypes from "prop-types";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
import useFetch from "../hooks/useFetch.jsx";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import CommentActions from "./CommentActions.jsx";
import commentAtom from "../atoms/commentAtom.js";
import useUpdate from "../hooks/useUpdate.jsx";


const Comment = ({ comment, post }) => {
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const FETCH_REPLIES = `post/getreplies/${comment._id}`;
  const COMMENT_LIKE_URL = `post/likeunlikecomment/${post._id}/${comment._id}`;
  const COMMENT_DELETE_URL = `post/deletecomment/${post._id}/${comment._id}`;
  const [comments, setComments] = useRecoilState(commentAtom);


  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();

  const [liked, setLiked] = useState(
    comment.likes?.includes(user?._id) || false
  );
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [fetchingReply, setFetchingReply] = useState(false);


  const {
    isLoading: isLiking,
    error,
    putData,
  } = useFetch(COMMENT_LIKE_URL, "PUT");

  const { handleUpdate: deleteComment, isLoading, updated: deletedComment } = useUpdate(
    comment._id,
    COMMENT_DELETE_URL,
    "Comment is successfully deleted!"
  );

  // const handleLiked = () => {
  //   if (!user) {
  //     return showToast(
  //       "Error",
  //       "You must be logged in to like a post",
  //       "error"
  //     );
  //   }

  //   if (isLiking) {
  //     return;
  //   }

  //   putData();

  //   if (!liked) {
  //     setLiked(true);
  //     comment.likes.push(user._id);
  //   } else {
  //     setLiked(false);
  //     comment.likes = comment.likes.filter((id) => id !== user._id);
  //   }
  // };


  const handleLiked = () => {
    if (!user) {
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );
    }

    if (isLiking) {
      return;
    }

    putData();

    // Immutable şekilde comment.likes'ı güncelleyin
    setComments((prevComments) =>
      prevComments.map((c) =>
        c._id === comment._id
          ? {
            ...c,
            likes: liked
              ? c.likes.filter((id) => id !== user._id)
              : [...c.likes, user._id],
          }
          : c
      )
    );

    setLiked(!liked);
  };


  const navigate = useNavigate();

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  useEffect(() => {
    if (showReplies) {
      setFetchingReply(true);
      const fetchReply = async () => {
        try {
          const response = await fetch(`${API_URL}/${FETCH_REPLIES}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setReplies(data);
        } catch (error) {
          showToast("Error", error.message, "error");
        } finally {
          setFetchingReply(false);
        }
      };
      fetchReply();
    }
  }, [showReplies]);

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [error]);


  const handleDelete = () => {
    if (isLoading) return;
    deleteComment();
  };

  const handleEdit = () => {
    console.log("Editing comment...");
  };

  const handleReport = () => {
    console.log("Reporting comment...");
  };


  useEffect(() => {
    if (deletedComment) {
      setComments(comments.filter((c) => c._id !== comment._id));
    }

  }, [deletedComment])

  return (
    <Flex mb={6} mt={2} w={"full"}>
      <Popover key={comment.commentBy._id} trigger="hover">
        <Flex direction={"column"} alignItems={"center"} w={"64px"}>
          <PopoverTrigger>
            <Avatar
              name={comment.commentBy.fullName}
              cursor={"pointer"}
              size={"md"}
              src={comment.commentBy.profilePic}
              onClick={() => navigate(`/profile/${comment.commentBy.userName}`)}
            />
          </PopoverTrigger>
          {comment.replies.length > 0 && (
            <>
              <Box w={"1px"} h={"full"} bg={"lightgrey"} my={2} />
              <Button
                size={"xs"}
                p={0}
                m={0}
                variant={"ghost"}
                colorScheme="blue"
                onClick={handleToggleReplies}
                w={"64px"}
                isLoading={fetchingReply}
              >
                {showReplies
                  ? "hide replies"
                  : `see replies (${comment.replies.length})`}
              </Button>
            </>
          )}
        </Flex>
        <PopoverContent>
          <PopoverBody>
            <ProfilePreviewPopover userId={comment.commentBy._id} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex flexDirection={"column"} w={"full"}>
        <Flex key={comment._id} alignItems={"start"}>
          <Flex direction={"column"} alignItems={"start"} mx={5} flex={1}>
            <Flex
              cursor={"pointer"}
              gap={1}
              alignItems={"center"}
              onClick={() => navigate(`/profile/${comment.commentBy.userName}`)}
            >
              <Text fontWeight={"bold"} textTransform={"capitalize"}>
                {comment.commentBy.fullName}{" "}
              </Text>
              <Text
                fontWeight={"light"}
                fontSize={"sm"}
                color={"gray.500"}
                textTransform={"lowercase"}
              >
                @{comment.commentBy.userName}
              </Text>
            </Flex>
            <ExpandableText>{comment.comment}</ExpandableText>
            <Flex w={"full"} gap={5} >
              <Flex>
                <Text
                  textAlign={"start"}
                  fontSize={"sm"}
                  color={"gray.500"}
                  minW={"50px"}
                >
                  {useFormatShortDistanceToNow(comment.createdAt)}
                </Text>
                {comment.replies.length > 0 && (
                  <Text
                    textAlign={"start"}
                    fontSize={"sm"}
                    color={"gray.500"}
                    minW={"50px"}
                  >
                    {comment.replies.length} reply
                  </Text>
                )}
              </Flex>
              <Menu>
                <MenuButton>
                  <HiOutlineDotsHorizontal cursor={"pointer"} fontSize={"16ßpx"} />
                </MenuButton>
                <MenuList>
                  <CommentActions
                    userId={user._id}
                    commentById={comment.commentBy._id}
                    postById={post.postedBy}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onReport={handleReport}
                  />
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <LikeButton size={"14"} liked={liked} handleLiked={handleLiked} />
            <Text fontSize={"xs"} color={"gray.500"}>
              {(comment.likes && comment.likes.length > 0) && comment.likes.length}
            </Text>
          </Flex>
        </Flex>
        {showReplies &&
          comment.replies.length > 0 &&
          replies.map((reply) => <Reply key={reply._id} reply={reply} postId={post._id} commentId={comment._id} />)}
      </Flex>
    </Flex>
  );
};

export default Comment;

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};
