import { VStack, Flex, Box, Avatar, Text, Button, Grid, } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import useFollowUnfollow from "../../hooks/useFollowUnfollow";
import useBlockUnblock from "../../hooks/useBlockUnblock";
import OwnerProfileActions from "./OwnerProfileActions";
import ProfileActions from "./ProfileActions";
import { ShareSvg } from "../shared/Actions";
import userAtom from "../../atoms/userAtom";


const UserHeader = ({ user, posts, handlePost, handleSaved, tab }) => {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);
  const PROFILE_EDIT_URL = `/profile/edit/${user.userName}`;

  const { handleFollowUnfollow, isLoading, isUserFollowing, isRequestSent } =
    useFollowUnfollow(user);

  const isProfileOwner = currentUser?._id === user?._id;

  const { handleBlockUnblock, isLoading: blockLoading } = useBlockUnblock(user);

  const handleBlockButtonClick = () => {
    if (blockLoading) return;
    handleBlockUnblock();
  };

  return (
    <VStack w={"full"}>
      <Flex
        w={"full"}
        gap={4}
        px={{ base: "0", lg: "24" }}
        alignItems={"start"}
      >
        <Flex w={"full"} px={{ base: "0", lg: "12" }}>
          <Flex direction={"column"} alignItems={"center"} gap={2}>
            <Box>
              <Avatar
                size={{ base: "xl", lg: "2xl" }}
                name={user.fullName}
                src={user.profilePic}
                rounded={"full"}
                shadow={"xl"}
                border={"1px solid"}
              />
            </Box>
            <Text fontSize={"md"}>@{user.userName}</Text>
          </Flex>
          <VStack w={"full"} alignItems={"start"} gap={2} mx={6} my={2}>
            <Flex w={"full"} justifyContent={"space-between"}>
              <Flex direction={"column"} alignItems={"start"}>
                <Flex alignItems={"center"} gap={4}>
                  <Text fontSize={{ base: "xl" }} fontWeight={"bold"}>
                    {user.fullName}
                  </Text>
                </Flex>
              </Flex>
              <Box>
                {isProfileOwner ?
                  <OwnerProfileActions />
                  :
                  <ProfileActions user={user} />
                }
              </Box>
            </Flex>
            <Flex direction={"column"} gap={5} my={5}>
              <Flex gap={4}>
                <Text fontSize={"lg"}>
                  <Text fontWeight={"bold"} as={"span"}>
                    {user.followers?.length}
                  </Text>{" "}
                  followers
                </Text>
                <Text fontSize={"lg"}>
                  <Text fontWeight={"bold"} as={"span"}>
                    {user.following?.length}
                  </Text>{" "}
                  following
                </Text>
                <Text fontSize={"lg"}>
                  <Text fontWeight={"bold"} as={"span"}>
                    {posts}
                  </Text>{" "}
                  post
                </Text>
              </Flex>
              {isProfileOwner ? (
                <Flex gap={4}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => {
                      navigate(PROFILE_EDIT_URL);
                    }}
                  >
                    Edit Profile
                  </Button>
                </Flex>
              ) : user.blocked ? (
                <Button
                  bg={"red.400"}
                  color={"white"}
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={handleBlockButtonClick}
                  isLoading={blockLoading}
                >
                  Unblock
                </Button>
              ) : (
                <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
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
                    {isRequestSent ? "Request Sent" : isUserFollowing ? "Unfollow" : "Follow"}
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Message
                    <ShareSvg />
                  </Button>
                </Grid>
              )}
              <Text fontSize={"sm"}>{user.bio}</Text>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid"}
          borderColor={`${tab === "post" ? "currentColor" : "gray"}`}
          color={`${tab === "post" ? "currentColor" : "gray"}`}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
          onClick={handlePost}
        >
          <Text fontWeight={"bold"}>Posts</Text>
        </Flex>
        {isProfileOwner && (
          <Flex
            flex={1}
            borderBottom={"1px solid"}
            borderColor={`${tab === "saved" ? "currentColor" : "gray"}`}
            color={`${tab === "saved" ? "currentColor" : "gray"}`}
            justifyContent={"center"}
            pb="3"
            cursor={"pointer"}
            onClick={handleSaved}
          >
            <Text fontWeight={"bold"}>
              {" "}
              Saved ({currentUser.bookmarksCollection ? currentUser.bookmarksCollection.length : 0})
            </Text>
          </Flex>
        )}
      </Flex>
    </VStack>
  );
};

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  handlePost: PropTypes.func.isRequired,
  handleSaved: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
};
export default UserHeader;
