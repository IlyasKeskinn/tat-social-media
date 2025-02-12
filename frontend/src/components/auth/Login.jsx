import { Box, Flex, Stack, Heading, Text, Input, Button, Link, InputGroup, InputRightElement, } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import * as z from "zod";

import { API_AUTH_ROUTES } from "../../constants/API_ROUTES";
import authScreenAtom from "../../atoms/authAtom";
import useShowToast from "../../hooks/showToast";
import userAtom from "../../atoms/userAtom";
import useFetch from "../../hooks/useFetch";


const Login = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const schema = z.object({
    email: z.string().email(t("userFormValidation.invalidEmail")),
    password: z
      .string()
      .min(6, t("userFormValidation.passwordMin"))
      .max(24, t("userFormValidation.passwordMax")),
  });
  const handleClick = () => setShow(!show);
  const showToast = useShowToast();

  const LOGIN_URL = API_AUTH_ROUTES.LOGIN;

  const { statusCode, responseData, isLoading, error, postData } = useFetch(
    LOGIN_URL,
    "POST"
  );

  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUserState = useSetRecoilState(userAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
  }, [error, responseData]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} >
      <Stack
        bg={"gray.50"}
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: "lg" }}
        mx={3}
        w={"100%"}
      >
        <Stack spacing={4}>
          <Heading
            color={"gray.800"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            {t("auth.loginTitle")}
            <Text
              as={"span"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
            {t("auth.loginDesc")}
          </Text>
        </Stack>
        <Box as={"form"} mt={10} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Input
              placeholder={t("user.emailPlaceholder")}
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
                placeholder={t("user.passwordPlaceholder")}
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
            {t("auth.login")}
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
                {t("auth.forgotPassword")}
              </Link>
            </Text>
          </Flex>
          <Flex gap={1}>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              {t("auth.notMember")}
            </Text>
            <Link
              color={"blue.400"}
              onClick={() => {
                setAuthScreen("signup");
              }}
            >
              {t("auth.joinTAT")}
            </Link>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Login;
