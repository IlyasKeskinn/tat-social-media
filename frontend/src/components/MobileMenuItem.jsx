import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileMenuItem = ({ children, to }) => {

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      as={Link}
      to={to}
      aria-label="Home"
      w={"48px"}
      h={"48px"}
    >
      {children}
    </Flex>
  );
};

export default MobileMenuItem;
