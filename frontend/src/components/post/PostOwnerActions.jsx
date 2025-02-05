import { MenuItem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CiMedicalClipboard } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { GoPencil } from "react-icons/go";
import PropTypes from "prop-types";
import { useEffect } from "react";

import { API_POST_ROUTES } from "../../constants/API_ROUTES";
import useCopyPost from "../../hooks/useCopyPost";
import useDelete from "../../hooks/useDelete";
import userAtom from "../../atoms/userAtom";
import postAtom from "../../atoms/postAtom";


const PostOwnerActions = ({ postId }) => {
  const { t } = useTranslation();
  const currentUser = useRecoilValue(userAtom);
  const copyPost = useCopyPost();
  const URL = API_POST_ROUTES.DELETE_POST(postId);
  const [posts, setPosts] = useRecoilState(postAtom);


  const { handleDelete, isLoading, deleted } = useDelete(
    postId,
    URL,
    "Post is successfully deleted!"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (deleted) {
      setPosts(posts.filter((p) => p._id !== postId));
      navigate(`/profile/${currentUser.userName}`);
    }
  }, [deleted]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen} color={"red.500"} fontSize={"lg"}>
        <MdDeleteOutline style={{ marginRight: "8px" }} />
        {t("postActions.deletePost")}
      </MenuItem>
      <MenuItem fontSize={"lg"}>
        <GoPencil style={{ marginRight: "8px" }} />
        {t("postActions.editPost")}
      </MenuItem>
      <MenuItem
        fontSize={"lg"}
        onClick={() => {
          copyPost(postId);
        }}
      >
        <CiMedicalClipboard style={{ marginRight: "8px" }} />
        {t("postActions.sendPost")}
      </MenuItem>
      {/* Delete Post Modal */}
      <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>{t("postActions.deletePost")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            {t("postActions.deletePostModal")}
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Flex direction={"column"} gap={5}>
              <Button
                variant={"ghost"}
                colorScheme="red"
                mr={3}
                type="submit"
                isLoading={isLoading}
                onClick={handleDelete}
              >
                {t("postActions.deletePostButton")}
              </Button>{" "}
              <Button
                variant={"ghost"}
                colorScheme="light"
                mr={3}
                type="submit"
                isLoading={isLoading}
                onClick={onClose}
              >
                {t("common.cancel")}
              </Button>{" "}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

PostOwnerActions.propTypes = {
  postId: PropTypes.string.isRequired,
};
export default PostOwnerActions;
