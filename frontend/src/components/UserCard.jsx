import { Avatar, Box, Flex, VStack, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const UserCard = ({ user, onClose = {} }) => {
  const currentUser = useRecoilValue(userAtom);

  const PROFILE_URL = `/profile/${user.userName}`;
  const FOLLOW_URL = `user/followUnfollow/${user._id}`;

  const [isUserFollowing, setIsUserFollowing] = useState(false);

  const isProfileOwner = user._id === currentUser._id;

  const navigate = useNavigate();

  const {
    isLoading,
    error,
    putData,
    responseData: followData,
    statusCode: followStatusCode,
  } = useFetch(FOLLOW_URL, "PUT");

  useEffect(() => {
    if (user) {
      setIsUserFollowing(user.followers?.includes(currentUser?._id));
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      console.log(error);
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
                <Box></Box>
              ) : (
                <Flex gap={4}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => {
                      navigate(PROFILE_URL);
                      onClose();
                    }}
                  >
                    See Profile
                  </Button>
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
                </Flex>
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

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};
export default UserCard;
