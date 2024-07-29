import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const ExpandableText = ({ children, limit = "160" }) => {
  const [isExpanded, setExpanded] = useState(false);

  const getDisplayText = () => {
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
        {children.length > limit && (
          <span> {isExpanded ? "see less" : "see more"}</span>
        )}
      </Text>
    </Box>
  );
};

export default ExpandableText;
