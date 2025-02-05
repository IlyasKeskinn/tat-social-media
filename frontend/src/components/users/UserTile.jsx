import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import useFollowUnfollow from "../../hooks/useFollowUnfollow";
import userAtom from "../../atoms/userAtom";


const UserTile = ({ user }) => {
  const { t } = useTranslation();
  const currentUser = useRecoilValue(userAtom);
  const isProfileOwner = user._id === currentUser._id;

  const navigate = useNavigate();
  const navigateProfile = (userName) => {
    const url = `/profile/${userName}`;
    navigate(url);
  };


  const { handleFollowUnfollow, isLoading, isUserFollowing, isRequestSent } =
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
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => {
              handleFollowUnfollow();
            }}
            isLoading={isLoading}
            isDisabled={isRequestSent || isLoading} // Disable during loading or if request is sent
          >
            {isRequestSent ? t("common.requestSent") : isUserFollowing ? t("common.unfollow") : t("common.follow")}
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
