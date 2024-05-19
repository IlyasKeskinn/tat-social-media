import { Box, Text, Flex } from "@chakra-ui/react";
const MenuItem = ({ title, icon: Icon, active = "false" }) => {
  return (
    <Box
      cursor={"pointer"}
      backgroundColor={active === true ? "whiteAlpha.200" : "transparent"}
      _hover={{
        backgroundColor: "whiteAlpha.300",
        borderColor: "gray.400",
        shadow: "lg",
      }}
      transition={"all 500ms"}
      shadow={active === true ? "lg" : "0"}
      border={"1px solid"}
      borderColor={active === true ? "whiteAlpha.400" : "transparent"}
      px={2}
      py={3}
      rounded={8}
      w={"full"}
    >
      <Flex gap={4} alignItems={"center"} justifyContent={"start"} px={2}>
        <Icon fontSize={"24px"} />
        <Text fontSize={"md"} textTransform={"uppercase"}>
          {title}
        </Text>
      </Flex>
    </Box>
  );
};

export default MenuItem;
