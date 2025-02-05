import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Popover, PopoverTrigger, PopoverContent, PopoverBody, Box, } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { API_USER_ROUTES } from "../../constants/API_ROUTES";
import ProfilePreviewPopover from "./ProfilePreviewPopover";
import useShowToast from "../../hooks/showToast";
import useFetch from "../../hooks/useFetch";
import Loading from "../shared/Loading";
import UserTile from "./UserTile";


const UserListModal = ({ isOpen, onClose, likesArr }) => {
  const { t } = useTranslation();
  const LIKE_USERS_URL = API_USER_ROUTES.FETCH_LIKED_USERS;
  const [likedUsers, setLikedUsers] = useState([]);
  const showToast = useShowToast();

  const {
    responseData: likeUsers,
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

  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader m={4} textAlign={"center"}>
          {t("common.likes")}
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
              <Text fontSize={"xl"}>{t("common.noLikes")}</Text>
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

UserListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  likesArr: PropTypes.array.isRequired,
};
export default UserListModal;
