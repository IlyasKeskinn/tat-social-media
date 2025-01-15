import { Box, Flex, Text } from "@chakra-ui/react"
import SettingsTile from "../components/shared/SettingsTile"
import { LiaKeySolid } from "react-icons/lia";
import { CiSaveDown2 } from "react-icons/ci";
import { IoBanOutline } from "react-icons/io5";

import FeatureTile from "../components/shared/FeatureTile";

const YourAccount = () => {
    return (
        <Flex
            px={{ base: 0, md: 6, lg: 24 }}
            h={"full"}
            flexDirection={"column"}
            alignContent={"center"}
            w={"100%"}
            maxH={{ base: "80dvh", md: "100dvh" }}
        >
            <SettingsTile onClick={() => { }} settingTile={"Your Account"} />
            <Box my={2}>
                <Text fontSize={"md"} color={"gray.500"} >
                    See information about your account, download an archive of your data, or learn about your account deactivation options
                </Text>
            </Box>
            <Flex direction={"column"} gap={1} mt={4}>
                <FeatureTile
                    icon={LiaKeySolid}
                    title="Change your password"
                    description="Change your password at anytime."
                    onClick={() => console.log("Change password clicked")}
                />
                <FeatureTile
                    icon={CiSaveDown2}
                    title="Download your data"
                    description="Get insights and analytics on your account."
                    onClick={() => console.log("Download data clicked")}
                />
                <FeatureTile
                    icon={IoBanOutline}
                    title="Delete Account"
                    description="Delete your account and your data permanently."
                    onClick={() => console.log("Change password clicked")}
                />
            </Flex>

        </Flex >
    )
}

export default YourAccount