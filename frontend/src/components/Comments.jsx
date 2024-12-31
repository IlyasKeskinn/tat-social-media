import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  useColorMode,
  Icon,
  FormControl,
} from "@chakra-ui/react";

import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.jsx";
import useShowToast from "../hooks/showToast.jsx";

import postAtom from "../atoms/postAtom.js";
import commentAtom from "../atoms/commentAtom.js";
import { useRecoilState, useRecoilValue } from "recoil";

import Loading from "./Loading.jsx";
import userAtom from "../atoms/userAtom.js";

import Comment from "./Comment.jsx";
import EmojiPickerBox from "./EmojiPickerBox.jsx";

import PropTypes from "prop-types";

const schema = z.object({
  text: z.string().min(1, "cannot be sent empty"),
});

const Comments = ({ isOpen, onClose, currentPost }) => {
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const { colorMode } = useColorMode();

  const API_URL = import.meta.env.VITE_BASE_API_URL;
  const COMMENT_URL = `post/makecomment/${currentPost._id}`;
  const FETCH_COMMENTS = `post/getcomments/${currentPost._id}`;

  const { responseData, isLoading, statusCode, error, putData } = useFetch(
    COMMENT_URL,
    "PUT"
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const [text, setText] = useState("");
  const [comments, setComments] = useRecoilState(commentAtom);
  const [posts, setPosts] = useRecoilState(postAtom);
  const [fetchingComments, setFetchingComments] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handle new comment submission
  const onSubmit = () => {
    putData({ text });
  };

  // Handle response data and errors
  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
    if (statusCode === 201) {
      const newComment = {
        _id: responseData._id,
        comment: text,
        commentBy: {
          _id: currentUser._id,
          userName: currentUser.userName,
          fullName: currentUser.fullName,
          profilePic: currentUser.profilePic,
        },
        replies: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setComments([...comments, newComment]);
      setPosts(
        posts.map((post) =>
          post._id === currentPost._id
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setText("");
      reset();
    }
  }, [responseData, error]);

  // Fetch comments on mount
  useEffect(() => {
    if (isOpen) {
      setFetchingComments(true);
      const fetchComments = async () => {
        try {
          const response = await fetch(`${API_URL}/${FETCH_COMMENTS}`);
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

  // Handle emoji picker
  const onEmojiClick = (emoji) => {
    setText(text + emoji);
    setShowEmojiPicker(false);
  };

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
              <Text fontSize={"xl"}>No Comments </Text>
              <Text fontSize={"3xl"}>🧐</Text>
            </Box>
          )}
          {comments.length > 0 &&
            comments.map((comment) => {
              return <Comment key={comment._id} comment={comment} post={currentPost} />;
            })}
        </ModalBody>
        <ModalFooter my={4}>
          <Flex
            flex="1"
            justifyContent={"center"}
            alignItems={"center"}
            gap={4}
          >
            <Box
              h={"32px"}
              w={"32px"}
              as="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Icon
                as={MdEmojiEmotions}
                color={colorMode === "dark" ? "blue.100" : "blue.300"}
                boxSize={8}
              />
            </Box>
            <Box w={"full"}>
              <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <InputGroup>
                    <Input
                      placeholder="Write a comment..."
                      size="lg"
                      {...register("text")}
                      onChange={(e) => setText(e.target.value)}
                      isInvalid={errors.text}
                      value={text}
                    />
                    <InputRightElement height="full" pe={2}>
                      <Button
                        borderRadius={"full"}
                        colorScheme="blue"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        type="submit"
                        isDisabled={text.length <= 0}
                        isLoading={isLoading}
                      >
                        <IoSend />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </form>
            </Box>
          </Flex>
          <EmojiPickerBox
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            onEmojiSelect={onEmojiClick}
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
