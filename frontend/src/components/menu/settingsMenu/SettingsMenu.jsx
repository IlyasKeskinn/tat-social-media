import { VStack, Flex, Heading, } from "@chakra-ui/react"
import SettingsMenuItem from "./SettingsMenuItem";
const SettingsMenu = () => {


    return (
        <>
            <Flex
                position={"sticky"}
                top={0}
                flex={1}
                h={"full"}
                borderRight={{base : "none", md : "1px solid gray"}}
                
            >
                <VStack
                    alignItems={"center"}
                    justifyContent={"start"}
                    spacing={2}
                    w={"full"}
                >
                    <Flex w={"full"} alignItems={"start"} justifyContent={"start"}>
                        <Heading
                            textAlign={"start"}
                            fontSize={"2xl"}
                            fontWeight={"bold"}
                            mb={12}
                        >
                            Settings
                        </Heading>
                    </Flex>
                    <SettingsMenuItem label={"Your Account"} to="/settings" />
                    <SettingsMenuItem label={"Blocked accounts"} to="/settings/blocked_accounts" />
                    <SettingsMenuItem label={"Account Privacy"} to="/settings/account_privacy" />
                    <SettingsMenuItem label={"Help"} to="/settings/help" />
                </VStack>
            </Flex>
        </>
    );
}

export default SettingsMenu