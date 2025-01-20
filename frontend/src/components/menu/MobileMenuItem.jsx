import { Flex, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MobileMenuItem = ({ children, to, callbackFunction = () => { }, notificationCount = 0 }) => {
  const handleClick = () => {
    if (callbackFunction) {
      callbackFunction();
    }
  };

  const displayCount = notificationCount > 9 ? "9+" : notificationCount;

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      as={Link}
      to={to}
      aria-label="Home"
      w={"48px"}
      h={"48px"}
      position="relative"
      onClick={handleClick}
    >
      <Box position="relative">
        {children}
        {notificationCount > 0 && (
          <Box
            position={"absolute"}
            top={-2}
            right={-2}
            backgroundColor={"red.500"}
            color={"white"}
            fontSize={"sm"}
            borderRadius={"full"}
            width={"16px"}
            height={"16px"}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize={"xs"}>{displayCount}</Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default MobileMenuItem;

MobileMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  callbackFunction: PropTypes.func,
  notificationCount: PropTypes.number,
};
