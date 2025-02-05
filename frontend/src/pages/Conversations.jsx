import { Box, Flex, Text, Button, useBreakpointValue, Divider, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ConversationList from "../components/conversation/ConversationList";
import ChatRoom from "../components/conversation/ChatRoom";


const DUMMY_CONVERSATIONS = [
    {
        _id: "1",
        participants: [
            {
                _id: "otherUser1",
                fullName: "John Doe",
                profilePic: "https://bit.ly/dan-abramov",
                userName: "johndoe"
            }
        ],
        lastMessage: {
            content: "Hey, nasılsın?",
            createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 dakika önce
        }
    },
    {
        _id: "2",
        participants: [
            {
                _id: "otherUser2",
                fullName: "Jane Smith",
                profilePic: "https://bit.ly/sage-adebayo",
                userName: "janesmith"
            }
        ],
        lastMessage: {
            content: "Projeyi tamamladın mı?",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 dakika önce
        }
    },
    {
        _id: "3",
        participants: [
            {
                _id: "otherUser1",
                fullName: "John Doe",
                profilePic: "https://bit.ly/dan-abramov",
                userName: "johndoe"
            }
        ],
        lastMessage: {
            content: "Hey, nasılsın?",
            createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 dakika önce
        }
    },
    {
        _id: "4",
        participants: [
            {
                _id: "otherUser2",
                fullName: "Jane Smith",
                profilePic: "https://bit.ly/sage-adebayo",
                userName: "janesmith"
            }
        ],
        lastMessage: {
            content: "Projeyi tamamladın mı?",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 dakika önce
        }
    }, {
        _id: "5",
        participants: [
            {
                _id: "otherUser1",
                fullName: "John Doe",
                profilePic: "https://bit.ly/dan-abramov",
                userName: "johndoe"
            }
        ],
        lastMessage: {
            content: "Hey, nasılsın?",
            createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 dakika önce
        }
    },
    {
        _id: "6",
        participants: [
            {
                _id: "otherUser2",
                fullName: "Jane Smith",
                profilePic: "https://bit.ly/sage-adebayo",
                userName: "janesmith"
            }
        ],
        lastMessage: {
            content: "Projeyi tamamladın mı?",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 dakika önce
        }
    },
    {
        _id: "7",
        participants: [
            {
                _id: "otherUser1",
                fullName: "John Doe",
                profilePic: "https://bit.ly/dan-abramov",
                userName: "johndoe"
            }
        ],
        lastMessage: {
            content: "Hey, nasılsın?",
            createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 dakika önce
        }
    },
    {
        _id: "8",
        participants: [
            {
                _id: "otherUser2",
                fullName: "Jane Smith",
                profilePic: "https://bit.ly/sage-adebayo",
                userName: "janesmith"
            }
        ],
        lastMessage: {
            content: "Projeyi tamamladın mı?",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 dakika önce
        }
    },
    {
        _id: "9",
        participants: [
            {
                _id: "otherUser1",
                fullName: "John Doe",
                profilePic: "https://bit.ly/dan-abramov",
                userName: "johndoe"
            }
        ],
        lastMessage: {
            content: "Hey, nasılsın?",
            createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 dakika önce
        }
    },
    {
        _id: "10",
        participants: [
            {
                _id: "otherUser2",
                fullName: "Jane Smith",
                profilePic: "https://bit.ly/sage-adebayo",
                userName: "janesmith"
            }
        ],
        lastMessage: {
            content: "Projeyi tamamladın mı?",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 dakika önce
        }
    },
    {
        _id: "11",
        participants: [
            {
                _id: "otherUser1",
                fullName: "John Doe",
                profilePic: "https://bit.ly/dan-abramov",
                userName: "johndoe"
            }
        ],
        lastMessage: {
            content: "Hey, nasılsın?",
            createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 dakika önce
        }
    },
    {
        _id: "12",
        participants: [
            {
                _id: "otherUser2",
                fullName: "Jane Smith",
                profilePic: "https://bit.ly/sage-adebayo",
                userName: "janesmith"
            }
        ],
        lastMessage: {
            content: "Projeyi tamamladın mı?",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 dakika önce
        }
    },
    {
        _id: "13",
        participants: [
            {
                _id: "otherUser1",
                fullName: "John Doe",
                profilePic: "https://bit.ly/dan-abramov",
                userName: "johndoe"
            }
        ],
        lastMessage: {
            content: "Hey, nasılsın?",
            createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 dakika önce
        }
    },
    {
        _id: "14",
        participants: [
            {
                _id: "otherUser2",
                fullName: "Jane Smith",
                profilePic: "https://bit.ly/sage-adebayo",
                userName: "janesmith"
            }
        ],
        lastMessage: {
            content: "Projeyi tamamladın mı?",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 dakika önce
        }
    }
];


const Conversations = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { colorMode } = useColorMode();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState(DUMMY_CONVERSATIONS);
    const { t } = useTranslation();

    const handleConversationSelect = (conversation) => {
        setSelectedConversation(conversation);
    };

    const handleBack = () => {
        setSelectedConversation(null);
    };


    if (!conversations?.length) {
        return (
            <Flex
                direction="column"
                align="center"
                justify="center"
                h="100vh"
                p={4}
            >
                <Text fontSize="xl" mb={4}>
                    {t("conversations.noMessages")}
                </Text>
                <Button
                    colorScheme="blue"
                    onClick={() => navigate("/explore")}
                >
                    {t("conversations.startNewConversation")}
                </Button>
            </Flex>
        );
    }

    return (
        <Flex h="100vh" overflow="hidden" w="100%">
            {(!isMobile || !selectedConversation) && (
                <Flex 
                    w={isMobile ? "100%" : "auto"}
                    flex={isMobile ? "1" : "none"}
                >
                    <Box w="100%">
                        <ConversationList
                            conversations={conversations}
                            onSelect={handleConversationSelect}
                            selectedId={selectedConversation?._id}
                        />
                    </Box>
                    {!isMobile && (
                        <Divider orientation="vertical" borderColor={colorMode === "dark" ? "gray.700" : "gray.300"} />
                    )}
                </Flex>
            )}

            {(!isMobile || selectedConversation) && (
                <Box flex="1">
                    {selectedConversation ? (
                        <ChatRoom
                            conversation={selectedConversation}
                            onBack={isMobile ? handleBack : undefined}
                        />
                    ) : (
                        !isMobile && (
                            <Flex
                                h="100%"
                                align="center"
                                justify="center"
                            >
                                <Text>
                                    {t("conversations.selectConversation")}
                                </Text>
                            </Flex>
                        )
                    )}
                </Box>
            )}
        </Flex>
    );
};

export default Conversations; 