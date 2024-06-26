import {
  VStack,
  Flex,
  Box,
  Avatar,
  Text,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ShareSvg } from "./Actions";
import showToast from "../hooks/showToast";
import { useNavigate } from "react-router";
const UserHeader = () => {
  const toast = showToast();
  const navigaye = useNavigate();

  const handleCopyProfileURL = () => {
    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL).then(() => {
      toast(
        "Copied to clipboard",
        "Profile URL has been copied successfully.",
        "success"
      );
    });
  };

  return (
    <VStack>
      <Flex
        w={"full"}
        gap={4}
        px={{ base: "2", lg: "24" }}
        alignItems={"start"}
      >
        <Flex w={"full"} px={{ base: "2", lg: "12" }}>
          <Flex direction={"column"} alignItems={"center"} gap={2}>
            <Box>
              <Avatar
                size={{ base: "xl", lg: "2xl" }}
                name="John Doe"
                src={"https://bit.ly/dan-abramov"}
                rounded={"full"}
                shadow={"xl"}
                border={"1px solid"}
              />
            </Box>
            <Text fontSize={"md"}>@fidelio</Text>
          </Flex>
          <VStack w={"full"} alignItems={"start"} gap={2} mx={6} my={2}>
            <Flex w={"full"} justifyContent={"space-between"}>
              <Flex direction={"column"} alignItems={"start"}>
                <Flex alignItems={"center"} gap={4}>
                  <Text fontSize={{ base: "xl" }} fontWeight={"bold"}>
                    Ilyas Keskin
                  </Text>
                </Flex>
              </Flex>
              <Box>
                <Menu>
                  <MenuButton>
                    <HiOutlineDotsHorizontal
                      cursor={"pointer"}
                      fontSize={"24px"}
                    />
                  </MenuButton>
                  <Portal>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          handleCopyProfileURL();
                        }}
                      >
                        Copy Profile URL
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigaye("/profile/edit/:ilyas");
                        }}
                      >
                        Edit Profile
                      </MenuItem>
                      <MenuItem>Block this account!</MenuItem>
                      <MenuItem>Report!</MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </Box>
            </Flex>
            <Flex direction={"column"} gap={5} my={5}>
              <Flex gap={4}>
                <Text fontSize={"lg"}>
                  <Text fontWeight={"bold"} as={"span"}>
                    5421
                  </Text>{" "}
                  followers
                </Text>
                <Text fontSize={"lg"}>
                  <Text fontWeight={"bold"} as={"span"}>
                    421
                  </Text>{" "}
                  following
                </Text>
                <Text fontSize={"lg"}>
                  <Text fontWeight={"bold"} as={"span"}>
                    21
                  </Text>{" "}
                  post
                </Text>
              </Flex>
              <Flex gap={4}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Follow
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Message
                  <ShareSvg />
                </Button>
              </Flex>
              <Text fontSize={"sm"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas omnis modi quo, repellendus commodi esse mollitia
                dolores vitae aperiam officiis?
              </Text>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid"}
          borderColor={"currentColor"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Posts</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Saved</Text>
        </Flex>
      </Flex>{" "}
    </VStack>
  );
};

export default UserHeader;
