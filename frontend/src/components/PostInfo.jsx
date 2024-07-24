import {
  Flex,
  Text,
  Menu,
  MenuButton,
  Portal,
  MenuList,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { formatDistanceToNow } from "date-fns";

import PostOwnerActions from "./PostOwnerActions";
import PostActions from "./PostActions";

const PostInfo = ({ post, postedBy, postOwner }) => {
  return (
    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
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

export default PostInfo;
