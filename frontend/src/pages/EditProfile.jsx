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
const EditProfile = () => {
  return (
    <Flex
      px={{ base: 0, md: 6, lg: 24 }}
      h={"full"}
      justifyContent={"center"}
      w={"100%"}
    >
      <form style={{ width: "100%" }}>
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
                    name="John Doe"
                    src={"https://bit.ly/dan-abramov"}
                    rounded={"full"}
                    shadow={"xl"}
                    border={"1px solid"}
                  />
                </Box>
                <Text fontSize={"md"}>@fidelio</Text>
              </Flex>
              <Center>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Change photo
                </Button>{" "}
              </Center>
            </Stack>
          </FormControl>
          <FormControl isRequired>
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
            />
          </FormControl>
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
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"lg"} fontWeight={"bold"}>
              Password
            </FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              borderColor={useColorModeValue(
                "blackAlpha.400",
                "whiteAlpha.400"
              )}
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
