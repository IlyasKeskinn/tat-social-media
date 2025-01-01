import {
  Flex,
  Text,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

import ProfilePreviewPopover from "../users/ProfilePreviewPopover.jsx";
import ExpandableText from "../shared/ExpandableText.jsx";
import { useEffect, useState } from "react";
import { LikeButton } from "../shared/Actions.jsx";
import useFormatShortDistanceToNow from "../../hooks/useFormatShortDistanceToNow.jsx";
import useShowToast from "../../hooks/showToast.jsx";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom.js";
import useFetch from "../../hooks/useFetch.jsx";

const Reply = ({ reply, postId, commentId }) => {
  const REPLY_LIKE_URL = `post/replylikeunlike/${postId}/${commentId}/${reply._id}`;

  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();

  const [liked, setLiked] = useState(
    reply.likes.includes(user?._id)
  );

  const {
    isLoading: isLiking,
    error,
    putData,
  } = useFetch(REPLY_LIKE_URL, "PUT");

  const handleLiked = () => {
    if (!user) {
      return showToast(
        "Error",
        "You must be logged in to like a reply",
        "error"
      );
    }

    if (isLiking) {
      return;
    }

    putData();

    if (!liked) {
      setLiked(true);
      reply.likes.push(user._id);
    } else {
      setLiked(false);
      reply.likes = reply.likes.filter((id) => id !== user._id);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [error]);

  return (
    <Flex w={"full"} key={reply._id} alignItems={"start"} mt={2} mb={4} pl={5}>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Avatar
            name={reply.replyBy.fullName}
            cursor={"pointer"}
            size={"sm"}
            src={reply.replyBy.profilePic}
            onClick={() => navigate(`/profile/${reply.replyBy.userName}`)}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <ProfilePreviewPopover userId={reply.replyBy._id} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex direction={"column"} alignItems={"start"} mx={5} flex={1}>
        <Flex
          cursor={"pointer"}
          gap={1}
          alignItems={"center"}
          onClick={() => navigate(`/profile/${reply.replyBy.userName}`)}
        >
          <Text fontWeight={"bold"} textTransform={"capitalize"}>
            {reply.replyBy.fullName}{" "}
          </Text>
          <Text
            fontWeight={"light"}
            fontSize={"sm"}
            color={"gray.500"}
            textTransform={"lowercase"}
          >
            @{reply.replyBy.userName}
          </Text>
        </Flex>
        <ExpandableText>{reply.reply}</ExpandableText>
        <Text fontSize={"sm"} color={"gray.500"} textAlign={"start"} w={"50px"}>
          {useFormatShortDistanceToNow(reply.createdAt)}
        </Text>
      </Flex>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LikeButton size={"14"} liked={liked} handleLiked={handleLiked} />
        <Text fontSize={"xs"} color={"gray.500"}>
          {reply.likes.length > 0 && reply.likes.length}
        </Text>
      </Flex>
    </Flex>
  );
};

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

export default Reply;
