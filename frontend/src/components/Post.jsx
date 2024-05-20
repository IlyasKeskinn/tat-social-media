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
  MenuItem,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import Actions from "./Actions";

const Post = ({ post }) => {
  return (
      <Flex gap={3} mb={4} py={5} w={"full"}>
        <Flex direction={"column"} alignItems={"center"}>
          <Flex gap={2} alignItems={"center"}>
            <Avatar size={"md"} name="John Doe" src={post.avatar} />
          </Flex>
          <Box w={"1px"} h={"full"} bg={"lightgrey"} my={2}></Box>
          <Box>
            <Text fontSize={"2xl"} align={"center"}>
              {post.emoji}
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
                {post.postedBy}
              </Text>
              <Text fontSize={"xs"}>@{post.userName}</Text>
            </Flex>

            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"xs"}>2d</Text>
              <Menu>
                <MenuButton>
                  <HiOutlineDotsHorizontal
                    cursor={"pointer"}
                    fontSize={"24px"}
                  />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem>Report this post!</MenuItem>
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
            h={{ sm: "600px", md: "650px", lg: "500px" }}
            w={"100%"}
          >
            <Image
              src={post.image}
              w={"full"}
              h={"full"}
              objectFit={"cover"}
              objectPosition={"top"}
            />
          </AspectRatio>
          <Text className="nonSelectableText">{post.text}</Text>
          <Actions />
          <Divider />
        </Flex>
      </Flex>
  );
};

export default Post;
