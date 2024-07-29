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
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

import ProfilePreviewPopover from "./ProfilePreviewPopover.jsx";
import ExpandableText from "./ExpandableText.jsx";
import { useEffect, useState } from "react";
import { LikeButton } from "./Actions.jsx";
import Reply from "./Reply.jsx";

import useFormatShortDistanceToNow from "../hooks/useFormatShortDistanceToNow.jsx";
import useShowToast from "../hooks/showToast.jsx";

const Comment = ({ comment }) => {
  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const FETCH_REPLIES = `post/getreplies/${comment._id}`;

  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [fetchingReply, setFetchingReply] = useState(false);

  const showToast = useShowToast();

  const handleLiked = () => {
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
          console.log(data);
        } catch (error) {
          showToast("Error", error.message, "error");
        } finally {
          setFetchingReply(false);
        }
      };
      fetchReply();
    }
  }, [showReplies]);

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
            <Flex>
              <Text
                textAlign={"start"}
                fontSize={"sm"}
                color={"gray.500"}
                w={"50px"}
              >
                {useFormatShortDistanceToNow(comment.createdAt)}
              </Text>
              {comment.replies.length > 0 && (
                <Text
                  textAlign={"start"}
                  fontSize={"sm"}
                  color={"gray.500"}
                  w={"100px"}
                >
                  {comment.replies.length} reply
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <LikeButton size={"14"} liked={liked} handleLiked={handleLiked} />
            <Text fontSize={"xs"} color={"gray.500"}>
              0
            </Text>
          </Flex>
        </Flex>
        {showReplies &&
          comment.replies.length > 0 &&
          replies.map((reply) => <Reply key={reply._id} reply={reply} />)}
      </Flex>
    </Flex>
  );
};

export default Comment;
