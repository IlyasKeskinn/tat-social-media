import { Box, VStack, Text, Avatar, Flex, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import userAtom from "../../atoms/userAtom";


const ConversationList = ({ conversations, onSelect, selectedId }) => {
    const user = useRecoilValue(userAtom);
    const { colorMode } = useColorMode();

    return (
        <VStack spacing={0} w="100%" h="100%" overflowY="auto" pe={6}>
            {conversations.map((conversation) => {
                const otherParticipant = conversation.participants.find(
                    (p) => p._id !== user._id
                );

                return (
                    <Box
                        key={conversation._id}
                        w="100%"
                        p={4}
                        cursor="pointer"
                        onClick={() => onSelect(conversation)}
                        _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.100" }}
                        borderRadius={8}
                        border="1px"
                        borderColor={selectedId === conversation._id ? "gray.600" : "transparent"}
                        transition="all 0.2s ease-in-out"
                        
                    >
                        <Flex align="center" gap={3}>
                            <Avatar
                                size="md"
                                name={otherParticipant.fullName}
                                src={otherParticipant.profilePic}
                            />
                            <Box>
                                <Text fontWeight="bold">
                                    {otherParticipant.fullName}
                                </Text>
                                <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                    {conversation.lastMessage?.content}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                );
            })}
        </VStack>
    );
};

ConversationList.propTypes = {
    conversations: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedId: PropTypes.string
};

export default ConversationList; 