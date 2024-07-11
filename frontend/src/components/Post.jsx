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

import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const Post = ({ post, postedBy }) => {
  const URL = `user/profile/${postedBy}`;
  const [user, setUser] = useState(null);
  const { responseData, isLoading, error, statusCode } = useFetch(URL);

  useEffect(() => {
    if (statusCode === 200) {
      setUser(responseData);
    }
  }, [statusCode, responseData, error]);
  return (
    <Flex gap={3} mb={4} py={5} w={"full"}>
      <Flex direction={"column"} alignItems={"center"}>
        <Flex gap={2} alignItems={"center"}>
          <Avatar size={"md"} name={user?.fullName} src={user?.profilePic} />
        </Flex>
        <Box w={"1px"} h={"full"} bg={"lightgrey"} my={2}></Box>
        <Box>
          <Text fontSize={"2xl"} align={"center"}>
            {post.tatmoji}
          </Text>
        </Box>
      </Flex>
      <Flex flex={1} direction={"column"} gap={2}>
        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
          <Flex direction={"column"} alignItems={"start"}>
            <Text fontSize={{ base: "md" }} fontWeight={"bold"}>
              {user?.fullName}
            </Text>
            <Text fontSize={"xs"}>@{user?.userName}</Text>
          </Flex>

          <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"xs"}>2d</Text>
            <Menu>
              <MenuButton>
                <HiOutlineDotsHorizontal cursor={"pointer"} fontSize={"24px"} />
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
  );
};

export default Post;
