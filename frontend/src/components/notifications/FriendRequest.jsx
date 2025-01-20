import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import userAtom from "../../atoms/userAtom"
import { useNavigate } from "react-router";

const FriendRequest = () => {
    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();
    const navigateProfile = (userName) => {
        const url = `/profile/${userName}`;
        navigate(url);
    };
    return (
        <Box w={"full"}  p={4} borderRadius={"md"} >
            <Flex gap={4} justifyContent={"space-between"}>
                <Flex gap={4} alignItems={"center"}>
                    <Avatar
                        cursor={"pointer"}
                        size={"md"}
                        name={user.fullName}
                        src={user.profilePic}
                        onClick={() => navigateProfile(user.userName)}
                        rounded={"full"}
                        shadow={"xl"}
                        border={"1px solid"}
                    />
                    <Flex
                        alignItems={"start"}
                    >
                        <Text fontSize={"md"}><b>{user.userName}</b> wants to be your friend.</Text>
                    </Flex>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                    <Button
                        bg={"blue.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                            bg: "blue.500",
                        }}
                        size={"sm"}
                    >
                        Accept
                    </Button>{" "}
                    <Button
                        bg={"gray.600"}
                        color={"white"}
                        w="full"
                        _hover={{
                            bg: "gray.700",
                        }}
                        size={"sm"}
                    >
                        Reject
                    </Button>{" "}
                </Flex>

            </Flex>
        </Box>
    )
}

export default FriendRequest