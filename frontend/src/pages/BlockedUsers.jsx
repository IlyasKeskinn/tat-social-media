import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { API_USER_ROUTES } from "../constants/API_ROUTES";
import useShowToast from "../hooks/showToast";
import Loading from "../components/shared/Loading";
import useFetch from "../hooks/useFetch";
import BlockedUserTile from "../components/profile/BlockedUserTile"
import SettingsTile from "../components/shared/SettingsTile";



const BlockedUsers = () => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const { responseData, isLoading, error, statusCode } = useFetch(API_USER_ROUTES.GET_BLOCKED_USERS);
    const showToast = useShowToast();

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
                <Text>No blocked users</Text>
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
            <SettingsTile onClick={() => { }} settingTile={"Blocked Users"} />
            <Box my={2}>
                <Text fontSize={"md"} color={"gray.500"} >
                    You can block people at any time by going to their profiles.
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