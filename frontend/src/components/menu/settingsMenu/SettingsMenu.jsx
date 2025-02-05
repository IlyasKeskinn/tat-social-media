import { VStack, Flex, Heading, } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SettingsMenuItem from "./SettingsMenuItem";


const SettingsMenu = () => {
    const { t } = useTranslation();


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
                            {t("settingsMenu.settings")}
                        </Heading>
                    </Flex>
                    <SettingsMenuItem label={t("settingsMenu.yourAccount")} to="/settings" />
                    <SettingsMenuItem label={t("settingsMenu.blockedAccounts")} to="/settings/blocked_accounts" />
                    <SettingsMenuItem label={t("settingsMenu.accountPrivacy")} to="/settings/account_privacy" />
                    <SettingsMenuItem label={t("settingsMenu.help")} to="/settings/help" />
                </VStack>
            </Flex>
        </>
    );
}

export default SettingsMenu