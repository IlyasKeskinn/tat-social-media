import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

const Conservations = () => {
  // Example users and messages
  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
  ];

  const messages = [
    {
      id: 1,
      text: "Hello, how are you?",
      sender: "User 1",
      timestamp: "10:00 AM",
      isMine: false,
    },
    {
      id: 2,
      text: "I'm good, thanks! And you?",
      sender: "User 2",
      timestamp: "10:01 AM",
      isMine: true,
    },
    {
      id: 3,
      text: "Doing well, working on a project.",
      sender: "User 1",
      timestamp: "10:02 AM",
      isMine: false,
    },
    {
      id: 1,
      text: "Hello, how are you?",
      sender: "User 1",
      timestamp: "10:00 AM",
      isMine: false,
    },
    {
      id: 2,
      text: "I'm good, thanks! And you?",
      sender: "User 2",
      timestamp: "10:01 AM",
      isMine: true,
    },
    {
      id: 3,
      text: "Doing well, working on a project.",
      sender: "User 1",
      timestamp: "10:02 AM",
      isMine: false,
    },
    {
      id: 1,
      text: "Hello, how are you?",
      sender: "User 1",
      timestamp: "10:00 AM",
      isMine: false,
    },
    {
      id: 2,
      text: "I'm good, thanks! And you?",
      sender: "User 2",
      timestamp: "10:01 AM",
      isMine: true,
    },
    {
      id: 3,
      text: "Doing well, working on a project.",
      sender: "User 1",
      timestamp: "10:02 AM",
      isMine: false,
    },
    {
      id: 1,
      text: "Hello, how are you?",
      sender: "User 1",
      timestamp: "10:00 AM",
      isMine: false,
    },
    {
      id: 2,
      text: "I'm good, thanks! And you?",
      sender: "User 2",
      timestamp: "10:01 AM",
      isMine: true,
    },
    {
      id: 3,
      text: "Doing well, working on a project.",
      sender: "User 1",
      timestamp: "10:02 AM",
      isMine: false,
    },
  ];

  return (
      <Flex height="100vh" width="100%">
        {/* Users List */}
        <Box
          width="30%"
          borderRightWidth="1px"
          p={4}
          overflowY="auto"
          boxShadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Users
          </Text>
          <VStack spacing={3}>
            {users.map((user) => (
              <HStack
                key={user.id}
                w="100%"
                p={2}
                borderRadius="md"
                _hover={{ bg: "gray.700" }}
                cursor="pointer"
              >
                <Avatar size="sm" name={user.name} />
                <Text fontWeight="medium">{user.name}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Chat Area */}
        <Flex direction="column" flex="1" p={4}>
          {/* Chat Messages */}
          <VStack
            flex="1"
            overflowY="auto"
            spacing={4}
            p={4}
            borderRadius="md"
            boxShadow="sm"
            marginBottom={4}
          >
            {messages.map((message) => (
              <HStack
                key={message.id}
                bg={message.isMine ? "blue.200" : "gray.200"}
                alignSelf={message.isMine ? "flex-end" : "flex-start"}
                p={3}
                borderRadius="md"
                maxWidth="70%"
              >
                {!message.isMine && <Avatar size="sm" name={message.sender} />}
                <Box>
                  <Text fontSize="sm" color="gray.600">
                    {message.sender} • {message.timestamp}
                  </Text>
                  <Text>{message.text}</Text>
                </Box>
                {message.isMine && <Avatar size="sm" name={message.sender} />}
              </HStack>
            ))}
          </VStack>

          {/* Input Box */}
          <HStack p={4} boxShadow="md" borderRadius="md">
            <Input placeholder="Type your message..." variant="filled" />
            <IconButton
              icon={<FiSend />}
              colorScheme="blue"
              aria-label="Send Message"
            />
          </HStack>
        </Flex>
      </Flex>
  );
};

export default Conservations;
