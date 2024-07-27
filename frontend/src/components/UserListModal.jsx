import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useShowToast from "../hooks/showToast";
import Loading from "./Loading";
import { useNavigate } from "react-router";
import ProfilePreviewPopover from "./ProfilePreviewPopover";

const UserListModal = ({ isOpen, onClose, likesArr }) => {
  const LIKE_USERS_URL = "user/fetchlikeduser";
  const [likedUsers, setLikedUsers] = useState([]);
  const showToast = useShowToast();

  const {
    responseData: likeUsers,
    statusCode: fetchUserStatusCode,
    error: fetchUsersError,
    postData: likeUsersPostData,
    isLoading: fetchingUsers,
  } = useFetch(LIKE_USERS_URL, "POST");

  useEffect(() => {
    if (likesArr) {
      likeUsersPostData(likesArr);
    }
  }, [likesArr]);

  useEffect(() => {
    if (fetchUsersError) {
      showToast("Error", fetchUsersError.message, "error");
    }
  }, [fetchUsersError]);

  useEffect(() => {
    if (likeUsers) {
      setLikedUsers(likeUsers);
    }
  }, [likeUsers]);

  const navigateProfile = (userName) => {
    navigate(`/profile/${userName}`);
  };

  //popoever
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Likes</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody maxH={"400px"} overflowY={"auto"} textAlign={"center"}>
          {fetchingUsers && <Loading />}
          {likeUsers.length <= 0 && <Text>No likes</Text>}
          {likedUsers.map((user) => (
            <Popover key={user._id} trigger="hover">
              <PopoverTrigger>
                <Flex my={4} mx={2} gap={4} alignItems={"center"}>
                  <Avatar
                    cursor={"pointer"}
                    onClick={() => navigateProfile(user.userName)}
                    size={"md"}
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
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
                  <ProfilePreviewPopover userId={user._id} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserListModal;
