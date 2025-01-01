import { useNavigate } from "react-router-dom";

import { AspectRatio, GridItem, Image, Box, Flex } from "@chakra-ui/react";

import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const ProfilePagePost = ({ post }) => {
  const navigate = useNavigate();

  return (
    <GridItem
      h={{ base: "150px", md: "200px", lg: "300px" }}
      position={"relative"}
      cursor={"pointer"}
      onClick={() => {
        navigate(`/post/${post._id}`);
      }}
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
            {post.likes.length} <FaHeart />
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            {post.comments.length} <FaCommentAlt />
          </Flex>
        </Flex>
      </Box>
    </GridItem>
  );
};

ProfilePagePost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ProfilePagePost;
