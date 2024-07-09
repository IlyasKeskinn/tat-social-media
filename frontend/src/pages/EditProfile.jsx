import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Box,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(24, "Username must be at most 24 characters"),
  fullName: z
    .string()
    .min(6, "Full name must be at least 6 characters")
    .max(48, "Full name must be at most 48 characters"),
  bio: z.string().max(300, "Bio must be at most 300 characters"),
});

import usePrevImg from "../hooks/usePrevImg";
import useFetch from "../hooks/useFetch";
import useShowToast from "../hooks/showToast";

import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const UPDATE_URL = `user/update/${user._id}`;

  const showToast = useShowToast();
  
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const { handleImageChange, imgUrl } = usePrevImg();
  const { status, putData, responseData, error, isLoading } = useFetch(
    UPDATE_URL,
    "PUT"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user.fullName,
      userName: user.userName,
      bio: user.bio,
    },
  });

  const onSubmit = (data) => {
    const updateProfile = { ...data, profilePic : imgUrl };
    putData(updateProfile);
  };

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
    if (status === "ok") {
      setUser(responseData);
      showToast("Success", "Updated profile!", "success");
      navigate(`/profile/${user._id}`)
    }
  }, [error, status]);

  return (
    <Flex
      px={{ base: 0, md: 6, lg: 24 }}
      h={"full"}
      justifyContent={"center"}
      w={"100%"}
    >
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={6}
          w={{ base: "100%", lg: "80%" }}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          mb={8}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Profile Edit
          </Heading>
          <FormControl>
            <Stack
              direction={["column, row"]}
              justifyContent={"space-between"}
              spacing={6}
              rounded={"xl"}
              px={4}
              py={2}
              bg={useColorModeValue("whiteAlpha.400", "blackAlpha.300")}
            >
              <Flex direction={"column"} alignItems={"center"} gap={2}>
                <Box>
                  <Avatar
                    size={"lg"}
                    name={user.fullName}
                    src={imgUrl || user.profilePic}
                    rounded={"full"}
                    shadow={"xl"}
                    border={"1px solid"}
                  />
                </Box>
                <Text fontSize={"md"}>@{user.userName}</Text>
              </Flex>
              <Input
                type="file"
                display={"none"}
                ref={fileRef}
                onChange={handleImageChange}
              />
              <Center>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => {
                    fileRef.current.click();
                  }}
                  isDisabled={isLoading}
                >
                  Change photo
                </Button>{" "}
              </Center>
            </Stack>
          </FormControl>
          <Flex gap={5}>
            <FormControl>
              <FormLabel fontSize={"lg"} fontWeight={"bold"}>
                Full name
              </FormLabel>
              <Input
                placeholder="John Doe"
                _placeholder={{ color: "gray.500" }}
                type="text"
                borderColor={useColorModeValue(
                  "blackAlpha.400",
                  "whiteAlpha.400"
                )}
                {...register("fullName")}
                isInvalid={errors.fullName}
              />
              {errors.fullName && (
                <Text color={"red.500"}>{errors.fullName.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"lg"} fontWeight={"bold"}>
                Username
              </FormLabel>
              <Input
                placeholder="JohnDoe"
                _placeholder={{ color: "gray.500" }}
                type="text"
                borderColor={useColorModeValue(
                  "blackAlpha.400",
                  "whiteAlpha.400"
                )}
                {...register("userName")}
              />
              {errors.userName && (
                <Text color={"red.500"}>{errors.userName.message}</Text>
              )}
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel fontSize={"lg"} fontWeight={"bold"}>
              Bio
            </FormLabel>
            <Textarea
              placeholder="Bio..."
              _placeholder={{ color: "gray.500" }}
              resize={"none"}
              borderColor={useColorModeValue(
                "blackAlpha.400",
                "whiteAlpha.400"
              )}
              {...register("bio")}
            />
          </FormControl>
          <Stack
            spacing={6}
            direction={["column", "row"]}
            justifyContent={"end"}
          >
            <Button
              bg={"blue.400"}
              color={"white"}
              w={"30%"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
};

export default EditProfile;
