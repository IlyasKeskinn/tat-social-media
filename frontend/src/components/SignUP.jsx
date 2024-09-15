import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Link,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import useFetch from "../hooks/useFetch";
import useShowToast from "../hooks/showToast";
const schema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(24, "First name must be at most 24 characters"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(24, "Last name must be at most 24 characters"),
  email: z.string().email("Invalid email address"),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(24, "Username must be at most 24 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password must be at most 24 characters"),
});

const SignUP = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const setUserState = useSetRecoilState(userAtom);

  const showToast = useShowToast();

  const REGISTER_URL = "user/register";
  const { statusCode, responseData, isLoading, error, postData } = useFetch(
    REGISTER_URL,
    "POST"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const onSubmit = (data) => {
    postData(data);
  };

  useEffect(() => {
    if (statusCode == 201) {
      localStorage.setItem("tatuser", JSON.stringify(responseData));
      setUserState(responseData);
      reset();
    }

    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [responseData, error]);

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Connect, Share{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Discover
          </Heading>

          <Stack direction={"row"} spacing={4} align={"center"}>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, blue.400,blue.800)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              T.A.T
            </Flex>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Join T.A.T
              <Text
                as={"span"}
                bgGradient="linear(to-r, blue.400,cyan.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Ready to shine? Join T.A.T and shine by sharing your world!
            </Text>
          </Stack>
          <Box as={"form"} mt={10} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Flex gap={2}>
                <Input
                  placeholder="Firstname"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("firstName")}
                  isInvalid={errors.firstName}
                />{" "}
                <Input
                  placeholder="Lastname"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("lastName")}
                  isInvalid={errors.lastName}
                />
              </Flex>
              <Flex gap={2}>
                {errors.firstName && (
                  <Text color="red.500">{errors.firstName?.message}</Text>
                )}
                {errors.lastName && (
                  <Text color="red.500">{errors.lastName?.message}</Text>
                )}
              </Flex>
              <Input
                placeholder="tatmember@example.com"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                {...register("email")}
                isInvalid={errors.email}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
              <Input
                placeholder="Username"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                {...register("userName")}
                isInvalid={errors.userName}
              />
              {errors.userName && (
                <Text color="red.500">{errors.userName.message}</Text>
              )}
              <InputGroup>
                <Input
                  placeholder="password"
                  bg={"gray.100"}
                  type={show ? "text" : "password"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("password")}
                  isInvalid={errors.password}
                />
                <InputRightElement>
                  <Button
                    bg={"gray.100"}
                    color={"gray.500"}
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? <LuEyeOff /> : <LuEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red.500">{errors.password.message}</Text>
              )}
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
              type="submit"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Box>
          <Stack>
            <Text
              align={"end"}
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "md" }}
            >
              Already a T.A.T member?{" "}
              <Link
                color={"blue.400"}
                onClick={() => {
                  setAuthScreen("login");
                }}
              >
                Log in
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignUP;
