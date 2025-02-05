import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, Avatar, Center, Box, Text, Textarea, } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import { editProfileSchema } from "../formSchemas/editProfileSchema";
import { API_USER_ROUTES } from "../constants/API_ROUTES";
import useShowToast from "../hooks/showToast";
import usePrevImg from "../hooks/usePrevImg";
import userAtom from "../atoms/userAtom";
import useFetch from "../hooks/useFetch";


const EditProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const { t } = useTranslation();

  const UPDATE_URL = API_USER_ROUTES.UPDATE_USER(user._id);

  const showToast = useShowToast();

  const fileRef = useRef(null);
  const navigate = useNavigate();

  const { handleImageChange, imgUrl } = usePrevImg();
  const { statusCode, putData, responseData, error, isLoading } = useFetch(
    UPDATE_URL,
    "PUT"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: user.fullName,
      userName: user.userName,
      bio: user.bio,
    },
  });

  const onSubmit = (data) => {
    const updateProfile = { ...data, profilePic: imgUrl };
    putData(updateProfile);
  };

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
    if (statusCode == 200) {
      localStorage.setItem("tatuser", JSON.stringify(responseData));
      setUser(responseData);
      showToast("Success", "Updated profile!", "success");
      navigate(`/profile/${user._id}`);
    }
  }, [error, responseData]);

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
          <Box cursor={"pointer"}
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft />
          </Box>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            {t("common.editProfile")}
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
                  {t("common.changePhoto")}
                </Button>{" "}
              </Center>
            </Stack>
          </FormControl>
          <Flex gap={5}>
            <FormControl>
              <FormLabel fontSize={"lg"} fontWeight={"bold"}>
                {t("user.fullName")}
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
                {t("user.userName")}
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
              {t("user.bio")}
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
              isInvalid={errors.bio}
            />
            {errors.bio && <Text color={"red.500"}>{errors.bio.message}</Text>}
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
              {t("common.apply")}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
};

export default EditProfile;
