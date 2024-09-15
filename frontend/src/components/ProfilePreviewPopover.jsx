import { VStack, Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";

import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/showToast";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";

import PropTypes from "prop-types";

const ProfilePreviewPopover = ({ userId }) => {
  const navigate = useNavigate();
  const showToast = useShowToast();

  const URL = `user/profile/${userId}`;
  const FOLLOW_URL = `user/followUnfollow/${userId}`;
  const PROFILE_URL = `/profile/${userId}`;

  const currentUser = useRecoilValue(userAtom);
  const { responseData: user, isLoading: userLoading } = useFetch(URL);

  const {
    isLoading,
    error,
    putData,
    responseData: followData,
    statusCode: followStatusCode,
  } = useFetch(FOLLOW_URL, "PUT");

  const [isUserFollowing, setIsUserFollowing] = useState(false);

  const isProfileOwner = currentUser?._id === userId;

  useEffect(() => {
    if (user) {
      setIsUserFollowing(user.followers?.includes(currentUser?._id));
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
    if (followStatusCode === 200) {
      if (isUserFollowing) {
        user.followers.pop();
      } else {
        user.followers.push(currentUser._id);
      }
      setIsUserFollowing(!isUserFollowing);
    }
  }, [followData]);

  const handleFollowUnfollow = () => {
    putData();
  };

  if (userLoading) return <Loading />;

  return (
    <VStack w={"full"}>
      <Flex w={"full"} gap={4} alignItems={"start"}>
        <Flex w={"full"}>
          <Flex direction={"column"} alignItems={"center"} gap={2}>
            <Box>
              <Avatar
                size={{ base: "lg", lg: "xl" }}
                name={user?.fullName}
                src={user?.profilePic}
                rounded={"full"}
                shadow={"xl"}
                border={"1px solid"}
              />
            </Box>
            <Text fontSize={"md"}>@{user?.userName}</Text>
          </Flex>
          <VStack w={"full"} alignItems={"start"} gap={2} mx={6} my={2}>
            <Flex w={"full"} justifyContent={"space-between"}>
              <Flex direction={"column"} alignItems={"start"}>
                <Flex alignItems={"center"} gap={4}>
                  <Text fontSize={{ base: "xl" }} fontWeight={"bold"}>
                    {user?.fullName}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction={"column"} gap={5} my={5}>
              <Flex gap={4}>
                <Text textAlign={"center"} fontSize={"lg"}>
                  <Text fontWeight={"bold"} as={"span"}>
                    {user?.followers?.length}
                  </Text>{" "}
                  followers
                </Text>
                <Text textAlign={"center"} fontSize={"lg"}>
                  <Text fontWeight={"bold"} as={"span"}>
                    {user?.following?.length}
                  </Text>{" "}
                  following
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
                      navigate(PROFILE_URL);
                    }}
                  >
                    See Profile
                  </Button>
                </Flex>
              ) : (
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
                >
                  {isUserFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
              <Text noOfLines={2} fontSize={"sm"}>
                {user?.bio}
              </Text>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </VStack>
  );
};

ProfilePreviewPopover.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default ProfilePreviewPopover;
