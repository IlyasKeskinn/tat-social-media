import { Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <VStack alignItems={"center"} justifyContent={"center"} flex={1}>
      <Spinner />
    </VStack>
  );
};

export default Loading;
