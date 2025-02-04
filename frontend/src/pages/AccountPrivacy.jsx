import { Box, Flex, Switch, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SettingsTile from "../components/shared/SettingsTile";
import { API_USER_ROUTES } from "../constants/API_ROUTES";
import useFetch from "../hooks/useFetch";


const AccountPrivacy = () => {
    const [checked, setChecked] = useState(false);
    const toast = useToast();
    
    const { responseData: privacyStatus, isLoading: isLoadingStatus } = useFetch(API_USER_ROUTES.GET_PRIVACY_STATUS, "GET");
    const { statusCode, isLoading: isUpdating, error, putData } = useFetch(API_USER_ROUTES.SET_ACCOUNT_PRIVACY, "PUT");

    useEffect(() => {
        if (privacyStatus?.isPrivate !== undefined) {
            setChecked(privacyStatus.isPrivate);
        }
    }, [privacyStatus]);

    const handlePrivacyChange = () => {
        if (isUpdating) return;
        putData();
        setChecked(!checked);
    }

    useEffect(() => {
        if (statusCode === 200) {
            toast({
                title: "Success",
                description: "Account privacy updated successfully",
                status: "success",
            });
        }
        if (error) {
            toast({
                title: "Error",
                description: "Account privacy update failed",
                status: "error",
            });
        }
    }, [statusCode, error, toast]);

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
                            <Switch
                                size="lg"
                                isChecked={checked}
                                onChange={handlePrivacyChange}
                                isDisabled={isUpdating || isLoadingStatus}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex >
    )
}

export default AccountPrivacy