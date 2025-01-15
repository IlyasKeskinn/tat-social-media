import { Box, Flex, Switch, Text } from "@chakra-ui/react"
import SettingsTile from "../components/shared/SettingsTile"


const AccountPrivacy = () => {
    return (
        <Flex
            px={{ base: 0, md: 6, lg: 24 }}
            h={"full"}
            flexDirection={"column"}
            alignContent={"center"}
            w={"100%"}
            maxH={{ base: "80dvh", md: "100dvh" }}
        >
            <SettingsTile onClick={() => { }} settingTile={"Account Privacy"} />
            <Box my={2}>
                <Text fontSize={"md"} color={"gray.500"} >
                    Manage what information you see and share on T.A.T
                </Text>
            </Box>

            <Flex>
                <Box
                    borderRadius={6}
                    w={"100%"}
                    shadow={"lg"}
                    p={4}
                    border={"1px solid"}
                    borderColor={"whiteAlpha.300"}
                >
                    <Flex gap={2} alignItems={"center"}>
                        <Box>
                            <Flex direction={"column"} gap={1}>
                                <Text>Private Account</Text>
                                <Text
                                    color={"gray.500"}
                                >When your account is public, your profile and posts can be seen by anyone on or off T.A.T. even if they don&apos;t have an T.A.T account.</Text>

                            </Flex>
                        </Box>
                        <Box>
                            <Switch size="lg" />
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex >
    )
}

export default AccountPrivacy