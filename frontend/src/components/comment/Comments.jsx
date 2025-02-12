import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import PropTypes from "prop-types";

import { API_COMMENT_ROUTES } from "../../constants/API_ROUTES.js";
import CommentInputForm from "./CommentInputForm.jsx";
import useShowToast from "../../hooks/showToast.jsx";
import commentAtom from "../../atoms/commentAtom.js";
import Loading from "../shared/Loading.jsx";
import Comment from "./Comment.jsx";


const Comments = ({ isOpen, onClose, currentPost }) => {
  const { t } = useTranslation();
  const showToast = useShowToast();

  const FETCH_COMMENTS = API_COMMENT_ROUTES.FETCH_COMMENTS(currentPost._id);

  const [comments, setComments] = useRecoilState(commentAtom);

  const [fetchingComments, setFetchingComments] = useState(false);

  // Fetch comments on mount
  useEffect(() => {
    if (isOpen) {
      setFetchingComments(true);
      const fetchComments = async () => {
        try {
          const response = await fetch(FETCH_COMMENTS);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setComments(data);
        } catch (error) {
          showToast("Error", error.message, "error");
        } finally {
          setFetchingComments(false);
        }
      };
      fetchComments();
    }
  }, [isOpen]);


  return (
    <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader m={4} textAlign={"center"}>
          Comments
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          minH={"400px"}
          maxH={"400px"}
          overflowY={"auto"}
          textAlign={"center"}
        >
          {fetchingComments && <Loading />}
          {!fetchingComments && comments.length <= 0 && (
            <Box
              position={"absolute"}
              top={"50%"}
              left={"50%"}
              transform="translate(-50%, -50%)"
            >
              <Text fontSize={"xl"}>{t("comment.noComments")}</Text>
              <Text fontSize={"3xl"}>🧐</Text>
            </Box>
          )}
          {comments.length > 0 &&
            comments.map((comment) => {
              return <Comment key={comment._id} comment={comment} post={currentPost} />;
            })}
        </ModalBody>
        <ModalFooter my={4}>
          <CommentInputForm
            currentPost={currentPost}
            setComments={setComments}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Comments;

Comments.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentPost: PropTypes.object.isRequired,
};
