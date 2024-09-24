import { Box,Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import BlockedUserTile from "../components/BlockedUserTile"

const BlockedUsers = () => {
    const user = useRecoilValue(userAtom)

    return (
        <Flex
            px={{ base: 0, md: 6, lg: 24 }}
            h={"full"}
            flexDirection={"column"}
            alignContent={"center"}
            w={"100%"}
            maxH={{ base: "80dvh", md: "100dvh" }}
        >
            <Flex direction={"column"} gap={3} mb={4} py={5} w={"full"}>
                <Heading>
                    Blocked Users
                    <Text
                        as={"span"}
                        bgGradient="linear(to-r, red.500,pink.500)"
                        bgClip="text"
                    >
                        !
                    </Text>
                </Heading>
                <Box>
                    <Text fontSize={"md"} color={"gray.500"} >
                        You can block people at any time by going to their profiles.
                    </Text>
                </Box>
            </Flex>
            <Stack
                spacing={6}
                w={{ base: "100%", lg: "80%" }}
                mb={6}
                overflow={"auto"}
            >
                <BlockedUserTile user={user} />
            </Stack>
        </Flex >
    )
}

export default BlockedUsers