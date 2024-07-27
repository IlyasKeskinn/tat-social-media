import { Button, Image, VStack, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

const NotFoundPage = ({ text }) => {
  const navigate = useNavigate();
  return (
    <VStack alignItems={"center"} justifyContent={"center"} flex={1}>
      <Box w={"full"} h={"65vh"} maxW={"600px"}>
        <Image
          src={"../../public/notFoundPage.svg"}
          loading="lazy"
          objectFit={"cover"}
          objectPosition={"center"}
          w="full"
          h="full"
        />
      </Box>
      <Flex direction={"column"} gap={4}>
        <Text fontSize={"4xl"}>{text}</Text>
        <Button
          size={"lg"}
          variant="outline"
          w="full"
          colorScheme="purple"
          onClick={() => {
            navigate("/");
          }}
        >
          Bact to feed
        </Button>{" "}
      </Flex>
    </VStack>
  );
};

export default NotFoundPage;
