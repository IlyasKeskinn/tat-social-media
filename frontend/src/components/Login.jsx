import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Link,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";

import useShowToast from "../hooks/showToast";
import useFetch from "../hooks/useFetch";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password must be at most 24 characters"),
});

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const showToast = useShowToast();

  const LOGIN_URL = "user/login";
  const { statusCode, responseData, isLoading, error, postData } = useFetch(
    LOGIN_URL,
    "POST"
  );

  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUserState = useSetRecoilState(userAtom);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    postData(data);
    if (statusCode == 200) {
      localStorage.setItem("tatuser", JSON.stringify(responseData));
      setUserState(responseData);
      reset();
    }
  };

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
    if (statusCode == 200) {
      localStorage.setItem("tatuser", JSON.stringify(responseData));
      setUserState(responseData);
      reset();
    }
  }, [error,responseData]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        bg={"gray.50"}
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: "lg" }}
        mx={3}
      >
        <Stack spacing={4}>
          <Heading
            color={"gray.800"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            Welcome back to T.A.T
            <Text
              as={"span"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
            Dive into new discoveries by logging into your account and continue
            exploring!
          </Text>
        </Stack>
        <Box as={"form"} mt={10} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
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
            Log in
          </Button>
        </Box>
        <Flex justifyContent={"space-between"}>
          <Flex>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              <Link
                color={"blue.400"}
                onClick={() => {
                  setAuthScreen("forgotpassword");
                }}
              >
                Forgot Password?
              </Link>
            </Text>
          </Flex>
          <Flex>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Not a T.A.T member yet?{" "}
              <Link
                color={"blue.400"}
                onClick={() => {
                  setAuthScreen("signup");
                }}
              >
                Join the T.A.T
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Login;
