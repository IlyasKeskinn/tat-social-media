import { Text, Flex, Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const MenuItem = ({ title, icon: Icon, to, callbackFunction = () => { }, notificationCount = 0 }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    if (callbackFunction) {
      callbackFunction();
    }
  };

  const displayCount = notificationCount > 9 ? "9+" : notificationCount;

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
          <Box position="relative">
            <Icon fontSize={"24px"} />
            {notificationCount > 0 && (
              <Box
                position={"absolute"}
                top={-2}
                right={-2}
                backgroundColor={"red.500"}
                color={"white"}
                fontSize={"sm"}
                borderRadius={"full"}
                width={"20px"}
                height={"20px"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text>{displayCount}</Text>
              </Box>
            )}
          </Box>
          <Text fontSize={"md"} textTransform={"uppercase"}>
            {title}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default MenuItem;

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  to: PropTypes.string.isRequired,
  callbackFunction: PropTypes.func,
  notificationCount: PropTypes.number, 
};
