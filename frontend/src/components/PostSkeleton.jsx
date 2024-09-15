import {
  Flex,
  Box,
  AspectRatio,
  Divider,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";

const PostSkeleton = () => {
  return (
    <Flex gap={3} mb={4} py={5} w={"full"}>
      <Flex direction={"column"} alignItems={"center"}>
        <Box>
          <SkeletonCircle speed={3} size={14} />
        </Box>
        <Box w={"1px"} h={"full"} bg={"lightgrey"} my={2}></Box>
        <Box>
          <SkeletonCircle speed={3} size={8} />
        </Box>
      </Flex>
      <Flex flex={1} direction={"column"} gap={2}>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Skeleton speed={3} height="14px" w={"100px"} mb={2} />
            <Skeleton speed={3} height="8px" w={"60px"} mb={4} />
          </Box>
          <Skeleton speed={3} height="14px" w={"100px"} mb={2} />
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
          <Skeleton speed={10} />
        </AspectRatio>
        <Flex justify={"space-between"}>
          <Flex gap={4}>
            <Skeleton speed={3} height="8px" w={"60px"} />
            <Skeleton speed={3} height="8px" w={"60px"} />
          </Flex>
          <Box>
            <Skeleton speed={3} height="32px" w={"32px"} mb={2} />
          </Box>
        </Flex>
        <Divider />
      </Flex>
    </Flex>
  );
};

export default PostSkeleton;
