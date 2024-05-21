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

import { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
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
        <Box as={"form"} mt={10}>
          <Stack spacing={4}>
            <Input
              placeholder="tatmember@example.com"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
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
          >
            Log in
          </Button>
        </Box>
        <Flex justifyContent={"space-between"}>
          <Flex>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              <Link color={"blue.400"}>Forgot Password?</Link>
            </Text>
          </Flex>
          <Flex>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Not a T.A.T member yet?{" "}
              <Link color={"blue.400"}>Join the T.A.T</Link>
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Login;
