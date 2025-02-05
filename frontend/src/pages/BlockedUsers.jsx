import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import BlockedUserTile from "../components/profile/BlockedUserTile";
import SettingsTile from "../components/shared/SettingsTile";
import { API_USER_ROUTES } from "../constants/API_ROUTES";
import Loading from "../components/shared/Loading";
import useShowToast from "../hooks/showToast";
import useFetch from "../hooks/useFetch";


const BlockedUsers = () => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const { responseData, isLoading, error, statusCode } = useFetch(API_USER_ROUTES.GET_BLOCKED_USERS);
    const showToast = useShowToast();
    const { t } = useTranslation();

    useEffect(() => {
        if (error) {
            showToast("Error", error.message, "error");
        }
        if (statusCode === 200) {
            setBlockedUsers(responseData);
        }
    }, [error, setBlockedUsers, statusCode, responseData, showToast]);


    const renderContent = () => {
        if (isLoading) {
            return <Loading />;
        }

        if (blockedUsers.length > 0) {
            return blockedUsers.map((blockedUser) => (
                <BlockedUserTile user={blockedUser} key={blockedUser._id} />
            ));
        }

        return (
            <Box>
                <Text>{t("blockedUsers.noBlockedUsers")}</Text>
            </Box>
        );
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
            <SettingsTile onClick={() => { }} settingTile={t("blockedUsers.blockedUsersTitle")} />
            <Box my={2}>
                <Text fontSize={"md"} color={"gray.500"} >
                    {t("blockedUsers.blockedUsersDesc")}
                </Text>
            </Box>
            <Stack
                spacing={6}
                w={{ base: "100%", lg: "80%" }}
                mb={6}
                overflow={"auto"}
            >
                {renderContent()}
            </Stack>
        </Flex >
    )
}

export default BlockedUsers