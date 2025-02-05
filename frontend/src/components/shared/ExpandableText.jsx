import { useTranslation } from "react-i18next";
import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";


const ExpandableText = ({ children, limit = "160" }) => {
  const { t } = useTranslation();
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
          <span> {isExpanded ? t("common.seeLess") : t("common.seeMore")}</span>
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
