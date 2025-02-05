import { Box, Text, useColorMode, Highlight } from "@chakra-ui/react";
import PropTypes from "prop-types";


const ChatRoomSearchResult = ({ message, searchQuery, onResultClick }) => {
    const { colorMode } = useColorMode();

    return (
        <Box
            p={3}
            borderRadius="md"
            bg={colorMode === "dark" ? "gray.700" : "gray.50"}
            cursor="pointer"
            _hover={{ bg: colorMode === "dark" ? "gray.600" : "gray.100" }}
            onClick={() => onResultClick(message._id)}
        >
            <Text fontSize="sm" color={colorMode === "dark" ? "gray.300" : "gray.600"}>
                {new Date(message.createdAt).toLocaleString()}
            </Text>
            <Text>
                <Highlight
                    query={searchQuery}
                    styles={{ bg: "yellow.200", color: "black", px: 1, py: 0.5, rounded: "md" }}
                >
                    {message.content}
                </Highlight>
            </Text>
        </Box>
    );
};

ChatRoomSearchResult.propTypes = {
    message: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired,
    searchQuery: PropTypes.string.isRequired,
    onResultClick: PropTypes.func.isRequired
};

export default ChatRoomSearchResult; 