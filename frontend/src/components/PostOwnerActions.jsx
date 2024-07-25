import {
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { CiMedicalClipboard } from "react-icons/ci";

import useCopyPost from "../hooks/useCopyPost";
import useDelete from "../hooks/useDelete";

import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const PostOwnerActions = ({ postId }) => {
  const currentUser = useRecoilValue(userAtom);
  const copyPost = useCopyPost();
  const URL = `post/deletepost/${postId}`;
  const { handleDelete, isLoading, deleted } = useDelete(
    postId,
    URL,
    "Post is successfully deleted!"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (deleted) {
      navigate(`/profile/${currentUser.userName}`);
    }
  }, [deleted]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen} color={"red.500"} fontSize={"lg"}>
        <MdDeleteOutline style={{ marginRight: "8px" }} />
        Delete
      </MenuItem>
      <MenuItem fontSize={"lg"}>
        <GoPencil style={{ marginRight: "8px" }} />
        Edit
      </MenuItem>
      <MenuItem
        fontSize={"lg"}
        onClick={() => {
          copyPost(postId);
        }}
      >
        <CiMedicalClipboard style={{ marginRight: "8px" }} />
        Send the post.
      </MenuItem>
      {/* Delete Post Modal */}
      <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Delete Post?</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            Are you sure you want to delete this post?
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
                Delete
              </Button>{" "}
              <Button
                variant={"ghost"}
                colorScheme="light"
                mr={3}
                type="submit"
                isLoading={isLoading}
                onClick={onClose}
              >
                Cancel
              </Button>{" "}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostOwnerActions;
