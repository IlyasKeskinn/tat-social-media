import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";

const ExpandableText = ({ children, limit = "160" }) => {
  const [isExpanded, setExpanded] = useState(false);

  // Add a check to ensure children is a string
  const getDisplayText = () => {
    if (!children || typeof children !== 'string') {
      return ''; // Return an empty string if children is undefined or not a string
    }

    if (isExpanded) {
      return children;
    }
    return children.length > limit
      ? children.substring(0, limit) + "..."
      : children;
  };

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <Box>
      <Text textAlign={"start"}>{getDisplayText()}</Text>
      <Text
        textAlign={"start"}
        cursor={"pointer"}
        color={"blue.500"}
        onClick={toggleExpand}
      >
        {children && children.length > limit && (
          <span> {isExpanded ? "see less" : "see more"}</span>
        )}
      </Text>
    </Box>
  );
};


ExpandableText.propTypes = {
  children: PropTypes.string.isRequired,
  limit: PropTypes.string,
};

export default ExpandableText;
