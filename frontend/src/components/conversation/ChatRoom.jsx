import { Flex, Text, Avatar, IconButton, Input, VStack, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, InputGroup, InputLeftElement, useDisclosure } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import { API_CONVERSATION_ROUTES } from "../../constants/API_ROUTES";
import ChatRoomSearchResult from "./ChatRoomSearchResult";
import useShowToast from "../../hooks/showToast";
import userAtom from "../../atoms/userAtom";
import useFetch from "../../hooks/useFetch";
import MessageBar from "./MessageBar";
import Message from "./Message";


const DUMMY_MESSAGES = {
    "1": [
        {
            _id: "m1",
            sender: { _id: "otherUser1" },
            content: "Hey, what's up?",
            type: "text",
            createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            status: 'read'
        },
        {
            _id: "m2",
            sender: { _id: "664decfe3b3d84df525d7f29" },
            content: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74",
            type: "image",
            createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
            status: 'delivered'
        }
    ],
    "2": [
        {
            _id: "m3",
            sender: { _id: "otherUser2" },
            content: "/audio/forest-ambience-morningspring-localization-poland-5-296921.mp3",
            type: "audio",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            status: 'sent'
        },
        {
            _id: "m4",
            sender: { _id: "664decfe3b3d84df525d7f29" },
            content: "Did you listen to this recording?",
            type: "text",
            createdAt: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
            status: 'read'
        },
        {
            _id: "m5",
            sender: { _id: "otherUser2" },
            content: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
            type: "image",
            createdAt: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
            status: 'delivered'
        }, {
            _id: "m6",
            sender: { _id: "664decfe3b3d84df525d7f29" },
            content: "/audio/forest-ambience-morningspring-localization-poland-5-296921.mp3",
            type: "audio",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            status: 'sent'
        }
    ]
};

const ChatRoom = ({ conversation, onBack }) => {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const messagesEndRef = useRef();
    const showToast = useShowToast();
    const user = useRecoilValue(userAtom);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const { data: messages } = useQuery({
        queryKey: ["messages", conversation._id],
        queryFn: async () => {
            // Backend is not ready, so we are returning dummy messages
            return DUMMY_MESSAGES[conversation._id] || [];
        }
    });

    const { postData, isLoading } = useFetch(API_CONVERSATION_ROUTES.SEND_MESSAGE, "POST");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (content) => {
        try {
             postData({
                conversationId: conversation._id,
                content
            });
        } catch (error) {
            showToast("Error", "Failed to send message", "error");
        }
    };


    const otherParticipant = conversation.participants.find(
        (p) => p._id !== user._id
    );

    const handleProfileClick = () => {
        navigate(`/profile/${otherParticipant.userName}`);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const results = messages?.filter(message =>
            message.content.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleSearchResultClick = (messageId) => {
        const element = document.getElementById(`message-${messageId}`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        onClose();
    };

    return (
        <Flex direction="column" h="100%">
            <Flex
                align="center"
                p={4}
                borderBottom="1px"
                borderColor={colorMode === "dark" ? "gray.700" : "gray.300"}
                gap={3}
            >
                {onBack && (
                    <IconButton
                        icon={<IoIosArrowBack />}
                        onClick={onBack}
                        variant="ghost"
                    />
                )}
                <Flex
                    align="center"
                    gap={3}
                    flex={1}
                    cursor="pointer"
                    onClick={handleProfileClick}
                    _hover={{ opacity: 0.8 }}
                >
                    <Avatar
                        size="md"
                        name={otherParticipant.fullName}
                        src={otherParticipant.profilePic}
                    />
                    <Text fontWeight="bold">{otherParticipant.fullName}</Text>
                </Flex>
                <IconButton
                    icon={<BsSearch />}
                    variant="ghost"
                    colorScheme="blue"
                    size="md"
                    aria-label="Search in chat"
                    onClick={onOpen}
                />
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Search in chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <InputGroup mb={4}>
                            <InputLeftElement>
                                <BsSearch />
                            </InputLeftElement>
                            <Input
                                placeholder="Search in messages..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                autoFocus
                            />
                        </InputGroup>
                        <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
                            {searchResults.map(message => (
                                <ChatRoomSearchResult
                                    key={message._id}
                                    message={message}
                                    searchQuery={searchQuery}
                                    onResultClick={handleSearchResultClick}
                                />
                            ))}
                            {searchQuery && !searchResults.length && (
                                <Text color="gray.500" textAlign="center">
                                    No results found
                                </Text>
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <VStack
                flex="1"
                overflowY="auto"
                p={4}
                spacing={4}
                align="stretch"
            >
                {messages?.map((message) => (
                    <Message
                        key={message._id}
                        message={message}
                        isOwnMessage={message.sender._id === user._id}
                    />
                ))}
                <div ref={messagesEndRef} />
            </VStack>

            <MessageBar
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
            />
        </Flex>
    );
};

ChatRoom.propTypes = {
    conversation: PropTypes.object.isRequired,
    onBack: PropTypes.func
};

export default ChatRoom; 