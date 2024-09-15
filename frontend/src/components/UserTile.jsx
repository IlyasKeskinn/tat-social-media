import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const UserTile = ({ user }) => {
  const navigate = useNavigate();
  const navigateProfile = (userName) => {
    const url = `/profile/${userName}`;
    navigate(url);
  };
  return (
    <Flex my={4} mx={2} gap={4} alignItems={"center"}>
      <Avatar
        cursor={"pointer"}
        onClick={() => navigateProfile(user.userName)}
        size={"md"}
        name={user.fullName}
        src={user.profilePic}
      />
      <Flex
        cursor={"pointer"}
        onClick={() => navigateProfile(user.userName)}
        direction={"column"}
        alignItems={"start"}
      >
        <Text fontSize={"md"}>{user.userName}</Text>
        <Text fontSize={"sm"}>{user.fullName}</Text>
      </Flex>
    </Flex>
  );
};

UserTile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserTile;
