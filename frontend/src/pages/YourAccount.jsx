import { Box, Flex, Text, Heading, Select, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IoBanOutline } from "react-icons/io5";
import { LiaKeySolid } from "react-icons/lia";
import { CiSaveDown2 } from "react-icons/ci";

import SettingsTile from "../components/shared/SettingsTile";
import FeatureTile from "../components/shared/FeatureTile";


const YourAccount = () => {
    const { t, i18n } = useTranslation();
    const { colorMode } = useColorMode();

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
        //Language preference saved in local storage
        localStorage.setItem('preferredLanguage', e.target.value);
    };

    return (
        <Flex
            px={{ base: 0, md: 6, lg: 24 }}
            h={"full"}
            flexDirection={"column"}
            alignContent={"center"}
            w={"100%"}
            maxH={{ base: "80dvh", md: "100dvh" }}
        >
            <SettingsTile onClick={() => { }} settingTile={t('yourAccountSettings.yourAccount')} />
            <Box my={2}>
                <Text fontSize={"md"} color={"gray.500"} >
                    {t('yourAccountSettings.settingsDesc')}
                </Text>
            </Box>
            <Box my={2}>
                <Text fontSize={"md"} color={"gray.500"} >
                    {t('yourAccountSettings.accountInfo')}
                </Text>
            </Box>
            <Flex direction={"column"} gap={1} mt={4}>
                <FeatureTile
                    icon={LiaKeySolid}
                    title={t('yourAccountSettings.changePassword')}
                    description={t('yourAccountSettings.changePasswordDesc')}
                    onClick={() => console.log("Change password clicked")}
                />
                <FeatureTile
                    icon={CiSaveDown2}
                    title={t('yourAccountSettings.downloadData')}
                    description={t('yourAccountSettings.downloadDataDesc')}
                    onClick={() => console.log("Download data clicked")}
                />
                <FeatureTile
                    icon={IoBanOutline}
                    title={t('yourAccountSettings.deleteAccount')}
                    description={t('yourAccountSettings.deleteAccountDesc')}
                    onClick={() => console.log("Delete account clicked")}
                />
            </Flex>

            <Box>
                <Heading size="sm" mb={2}>{t('yourAccountSettings.language')}</Heading>
                <Select
                    value={i18n.language}
                    onChange={handleLanguageChange}
                    bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                >
                    <option value="en">{t('languages.english')}</option>
                    <option value="tr">{t('languages.turkish')}</option>
                </Select>
            </Box>
        </Flex>

    )
}

export default YourAccount

