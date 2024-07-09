import { AspectRatio, GridItem, Image, Box, Flex } from "@chakra-ui/react";

import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";

const ProfilePagePost = ({ post }) => {
  return (
    <GridItem
      h={{ base: "150px", md: "200px", lg: "300px" }}
      position={"relative"}
      cursor={"pointer"}
    >
      <AspectRatio ratio={16 / 9} overflow={"hidden"} w={"full"} h={"full"}>
        <Image
          src={post.images[0]}
          w={"full"}
          h={"full"}
          loading="lazy"
          objectFit={"cover"}
          objectPosition={"center"}
        />
      </AspectRatio>
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bg="rgba(0, 0, 0, 0.5)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        opacity="0"
        _hover={{ opacity: 1 }}
        transition="opacity 0.3s"
      >
        <Flex alignItems={"center"} gap={2}>
          <Flex alignItems={"center"} gap={2}>
            85 <FaHeart />
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            12 <FaCommentAlt />
          </Flex>
        </Flex>
      </Box>
    </GridItem>
  );
};

export default ProfilePagePost;
