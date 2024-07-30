import {
  Flex,
  Box,
  Avatar,
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Textarea,
  Text,
  Input,
  Image,
  AspectRatio,
  CloseButton,
} from "@chakra-ui/react";

import usePrevImg from "../hooks/usePrevImg";
import useFetch from "../hooks/useFetch";
import useShowToast from "../hooks/showToast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import userAtom from "../atoms/userAtom";

import { FaRegImage } from "react-icons/fa6";

import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import postAtom from "../atoms/postAtom";
import EmojiPickerBox from "./EmojiPickerBox";

const postSchema = z.object({
  text: z.string().max(500, "Post text must be at most 500 characters"),
});

const MAX_CHAR = 500;

const CreatePost = () => {
  const URL = `post/createpost`;

  // Chakra UI hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Custom hooks
  const { imgUrl, handleImageChange, setImgUrl } = usePrevImg();
  const { statusCode, responseData, error, isLoading, postData } = useFetch(
    URL,
    "POST"
  );
  const showToast = useShowToast();

  // Recoil state
  const [posts, setPosts] = useRecoilState(postAtom);
  const user = useRecoilValue(userAtom);

  // useRef
  const fileRef = useRef(null);

  // useState
  const [selectedTatmoji, setSelectedTatmoji] = useState("🥺");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [postText, setPostText] = useState("");

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  // Handlers
  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length > MAX_CHAR) {
      setPostText(text.slice(0, MAX_CHAR));
      setRemainingChar(0);
    } else {
      setPostText(text);
      setRemainingChar(MAX_CHAR - text.length);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedTatmoji(emoji);
  };

  const onSubmit = (data) => {
    if (!imgUrl) {
      showToast("Error", "Please select an image", "error");
      return;
    }
    const dataPost = {
      postedBy: user._id,
      text: data.text,
      tatmoji: selectedTatmoji,
      images: imgUrl,
    };
    postData(dataPost);
  };

  // useEffect
  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
    if (statusCode === 201) {
      showToast("Successfully", "Post shared successfully", "success");
      setPosts([responseData, ...posts]);
      setPostText("");
      setImgUrl("");
    }
  }, [responseData, error]);

  return (
    <>
      <Box
        mb={5}
        w={"full"}
        pt={4}
        pb={8}
        px={2}
        borderRadius={"xl"}
        shadow={useColorModeValue("lg", "xl")}
        backgroundColor={useColorModeValue("whiteAlpha.100", "whiteAlpha.50")}
      >
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex>
            <Avatar size={"md"} name={user.fullName} src={user.profilePic} />
          </Flex>
          <Flex w={"full"} justifyContent={"center"} alignItems={"center"}>
            <Button
              display={"flex"}
              justifyContent={"start"}
              marginStart={5}
              w={"full"}
              variant="outline"
              borderRadius={"3xl"}
              borderColor={useColorModeValue("gray.600", "gray.500")}
              _hover={{
                backgroundColor: useColorModeValue("gray.200", "gray.700"),
                borderColor: useColorModeValue("gray.500", "gray.600"),
              }}
              onClick={onOpen}
            >
              Start post
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Share Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody minH={"500px"}>
              <FormControl mt={5}>
                <Textarea
                  placeholder={`Some text...`}
                  _placeholder={{ color: "gray.500" }}
                  resize={"none"}
                  borderColor={useColorModeValue(
                    "blackAlpha.400",
                    "whiteAlpha.400"
                  )}
                  {...register("text")}
                  value={postText}
                  onChange={handleTextChange}
                  isInvalid={errors.text}
                />
                {errors.text && (
                  <Text fontSize={"sm"} color={"red.500"}>
                    {errors.text.message}
                  </Text>
                )}
                <Text
                  fontSize={"sm"}
                  color={"gray.500"}
                  textAlign={"right"}
                  m={"1"}
                >
                  {remainingChar}/500
                </Text>
                <Input
                  type="file"
                  display={"none"}
                  ref={fileRef}
                  onChange={handleImageChange}
                />
                <Flex gap={4}>
                  <Button onClick={() => fileRef.current.click()} size={"md"}>
                    <FaRegImage size={24} />
                  </Button>
                  <Button
                    size={"md"}
                    variant={"outline"}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Box w={"24px"}>
                      <Text fontSize={"2xl"}>{selectedTatmoji}</Text>
                    </Box>
                  </Button>
                </Flex>
              </FormControl>
              {imgUrl && (
                <AspectRatio
                  mt={2}
                  ratio={4 / 3}
                  borderRadius={6}
                  overflow={"hidden"}
                  h={{ sm: "400px", md: "450px", lg: "300px" }}
                  w={"100%"}
                >
                  <Flex position={"relative"} overflow={"hidden"}>
                    <Image
                      src={imgUrl}
                      h={"full"}
                      w={"full"}
                      objectFit={"contain"}
                      objectPosition={"center"}
                    />
                    <CloseButton
                      position={"absolute"}
                      top={2}
                      right={2}
                      border={"1px"}
                      borderColor={"gray.500"}
                      onClick={() => setImgUrl("")}
                    />
                  </Flex>
                </AspectRatio>
              )}
              <EmojiPickerBox
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                onEmojiSelect={handleEmojiSelect}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant={"outline"}
                colorScheme="blue"
                mr={3}
                type="submit"
                isDisabled={!imgUrl}
                isLoading={isLoading}
              >
                Share
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
