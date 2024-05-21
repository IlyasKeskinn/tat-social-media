import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";

const ForgotPassword = () => {
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
            Forgot your password
            <Text
              as={"span"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
            You'll get an email with a reset link
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
            Request Reset
          </Button>
        </Box>
        <Flex justifyContent={"space-between"}>
          <Flex>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              <Link color={"blue.400"}>Login Page</Link>
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
