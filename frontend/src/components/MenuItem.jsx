import { Text, Flex, Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
const MenuItem = ({ title, icon: Icon, to, callbackFunction = () => {} }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    if (callbackFunction) {
      callbackFunction();
    }
  };
  return (
    <Link style={{ width: "100%" }} to={to}>
      <Box
        cursor={"pointer"}
        backgroundColor={isActive === true ? "whiteAlpha.200" : "transparent"}
        _hover={{
          backgroundColor: "whiteAlpha.300",
          borderColor: "gray.400",
          shadow: "lg",
        }}
        onClick={handleClick}
        transition={"all 500ms"}
        shadow={isActive === true ? "lg" : "0"}
        border={"1px solid"}
        borderColor={isActive === true ? "whiteAlpha.400" : "transparent"}
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
    </Link>
  );
};

export default MenuItem;
