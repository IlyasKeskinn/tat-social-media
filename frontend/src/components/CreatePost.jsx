import {
  Avatar,
  Flex,
  Box,
  Stack,
  Center,
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

import { FaRegImage } from "react-icons/fa6";

import { useRef, useState } from "react";

const MAX_CHAR = 500;

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileRef = useRef(null);
  const { imgUrl, handleImageChange, setImgUrl } = usePrevImg();

  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [postText, setPostText] = useState("");

  const handleTextChange = (e) => {
    const text = e.target.value;

    if (text.length > MAX_CHAR) {
      const truncatedText = text.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
      return;
    } else {
      setPostText(text);
      setRemainingChar(MAX_CHAR - text.length);
    }
  };
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
            <Avatar size={"md"} name="John Doe" src={""} />
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
        <ModalContent>
          <ModalHeader>Share Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={5}>
              <Textarea
                placeholder={`Some text...`}
                _placeholder={{ color: "gray.500" }}
                resize={"none"}
                borderColor={useColorModeValue(
                  "blackAlpha.400",
                  "whiteAlpha.400"
                )}
                onChange={handleTextChange}
                value={postText}
              />
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
              <FaRegImage
                size={24}
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={() => {
                  fileRef.current.click();
                }}
              />
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
                    onClick={() => {
                      setImgUrl("");
                    }}
                  />
                </Flex>
              </AspectRatio>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant={"outline"}
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              Share
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
