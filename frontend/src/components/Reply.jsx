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

import ProfilePreviewPopover from "./ProfilePreviewPopover.jsx";
import ExpandableText from "./ExpandableText.jsx";
import { useState } from "react";
import { LikeButton } from "./Actions.jsx";
import useFormatShortDistanceToNow from "../hooks/useFormatShortDistanceToNow.jsx";

import PropTypes from "prop-types";

const Reply = ({ reply }) => {
  const [liked, setLiked] = useState(false);

  const handleLiked = () => {
    setLiked(!liked);
  };

  const navigate = useNavigate();
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
          0
        </Text>
      </Flex>
    </Flex>
  );
};

Reply.propTypes = {
  reply: PropTypes.object,
};

export default Reply;
