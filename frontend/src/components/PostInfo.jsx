import {
  Flex,
  Text,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { formatDistanceToNow } from "date-fns";

import PostOwnerActions from "./PostOwnerActions";
import PostActions from "./PostActions";

import { useState } from "react";
import ProfilePreviewPopover from "./ProfilePreviewPopover";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const PostInfo = ({ post, postedBy, postOwner }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const navigateProfile = () => {
    navigate(`/profile/${postedBy.userName}`);
  };
  return (
    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
      <Popover
        trigger="hover"
        onOpen={handlePopoverOpen}
        onClose={handlePopoverClose}
      >
        <PopoverTrigger>
          <Flex
            cursor={"pointer"}
            onClick={navigateProfile}
            direction={"column"}
            alignItems={"start"}
          >
            <Text fontSize={{ base: "md" }} fontWeight={"bold"}>
              {postedBy?.fullName}
            </Text>
            <Text fontSize={"xs"}>@{postedBy?.userName}</Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            {isPopoverOpen && <ProfilePreviewPopover userId={postedBy._id} />}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex gap={4} alignItems={"center"}>
        <Text fontSize={"xs"}>
          {formatDistanceToNow(new Date(post.createdAt))} ago
        </Text>
        <Menu>
          <MenuButton>
            <HiOutlineDotsHorizontal cursor={"pointer"} fontSize={"24px"} />
          </MenuButton>
          <Portal>
            <MenuList>
              {postOwner ? (
                <PostOwnerActions postId={post._id} />
              ) : (
                <PostActions postId={post._id} postedBy={postedBy} />
              )}
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
    </Flex>
  );
};

PostInfo.propTypes = {
  post: PropTypes.object.isRequired,
  postedBy: PropTypes.object.isRequired,
  postOwner: PropTypes.bool.isRequired,
};

export default PostInfo;
