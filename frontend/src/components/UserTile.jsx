import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserTile = ({ user }) => {
  const currentUser = useRecoilValue(userAtom);
  const isProfileOwner = user._id === currentUser._id;

  const navigate = useNavigate();
  const navigateProfile = (userName) => {
    const url = `/profile/${userName}`;
    navigate(url);
  };


  const { handleFollowUnfollow, isLoading, isUserFollowing } =
    useFollowUnfollow(user);

  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
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
      {isProfileOwner ? (
        <Box></Box>
      ) : (
        <Box>
          <Button
            w={24}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => {
              handleFollowUnfollow();
            }}
            isLoading={isLoading}
          >
            {isUserFollowing ? "Unfollow" : "Follow"}
          </Button>
        </Box>
      )}
    </Flex>
  );
};

UserTile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserTile;
