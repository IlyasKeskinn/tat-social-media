import { Flex, Avatar } from "@chakra-ui/react";

const PostAvatar = ({ postedBy }) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      <Avatar
        size={"md"}
        name={postedBy?.fullName}
        src={postedBy?.profilePic}
      />
    </Flex>
  );
};

export default PostAvatar;
