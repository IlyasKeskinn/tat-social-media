import { Box, Flex, IconButton, Input, useColorMode } from "@chakra-ui/react";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { useRef, useState } from "react";
import PropTypes from "prop-types";


const MessageBar = ({ onSendMessage, isLoading }) => {
    const { colorMode } = useColorMode();
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const content = inputRef.current.value.trim();
        if (!content || isLoading) return;

        onSendMessage(content);
        inputRef.current.value = "";
        setInputValue("");
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <Flex gap={2} align="center">
                    <IconButton
                        icon={<BsEmojiSmile />}
                        variant="ghost"
                        colorScheme="blue"
                        size="md"
                    />
                    <IconButton
                        icon={<BsImage />}
                        variant="ghost"
                        colorScheme="blue"
                        size="md"
                    />
                    <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Write your message..."
                        disabled={isLoading}
                        size="lg"
                        py={6}
                        bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                        _hover={{
                            bg: colorMode === "dark" ? "gray.600" : "gray.100"
                        }}
                        _focus={{
                            bg: colorMode === "dark" ? "gray.600" : "gray.100",
                            borderColor: "blue.400"
                        }}
                    />
                    {!inputValue.trim() ? (
                        <IconButton
                            icon={<FaMicrophone />}
                            bgGradient="linear(to-r, blue.400,cyan.400)"
                            color="white"
                            size="md"
                            isRound
                            _hover={{
                                bgGradient: "linear(to-r, blue.500,cyan.500)"
                            }}
                        />
                    ) : (
                        <IconButton
                            type="submit"
                            bgGradient="linear(to-r, blue.400,cyan.400)"
                            color="white"
                            isLoading={isLoading}
                            icon={<FaPaperPlane />}
                            size="md"
                            isRound
                            _hover={{
                                bgGradient: "linear(to-r, blue.500,cyan.500)"
                            }}
                        />
                    )}
                </Flex>
            </form>
        </Box>
    );
};

MessageBar.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default MessageBar; 