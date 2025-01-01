import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MobileMenuItem = ({ children, to, callbackFunction = () => {} }) => {
  const handleClick = () => {
    if (callbackFunction) {
      callbackFunction();
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      as={Link}
      to={to}
      aria-label="Home"
      w={"48px"}
      h={"48px"}
      onClick={handleClick}
    >
      {children}
    </Flex>
  );
};

export default MobileMenuItem;

MobileMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  callbackFunction: PropTypes.func,
};
