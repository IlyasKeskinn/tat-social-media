import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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
import UserTile from "./UserTile";

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
    if (isOpen) {
      likeUsersPostData(likesArr);
    }
  }, [isOpen]);

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

  //popoever
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader m={4} textAlign={"center"}>
          Likes
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          minH={"400px"}
          maxH={"400px"}
          overflowY={"auto"}
          textAlign={"center"}
        >
          {fetchingUsers && <Loading />}
          {likeUsers.length <= 0 && (
            <Box
              position={"absolute"}
              top={"50%"}
              left={"50%"}
              transform={"translate(-50% , -50%)"}
            >
              <Text fontSize={"xl"}>No likes </Text>
              <Text fontSize={"4xl"}>🥺</Text>
            </Box>
          )}
          {likedUsers.map((user) => (
            <Popover key={user._id} trigger="hover">
              <PopoverTrigger>
                <Box>
                  <UserTile user={user} />
                </Box>
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
