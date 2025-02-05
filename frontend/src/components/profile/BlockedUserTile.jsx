import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import useBlockUnblock from "../../hooks/useBlockUnblock";


const BlockedUserTile = ({ user }) => {
    const { t } = useTranslation();
    const { handleBlockUnblock, isLoading: blockLoading } = useBlockUnblock(user);

    const handleBlockButtonClick = () => {
        if (blockLoading) return;
        handleBlockUnblock();
    };

    return (
        <Flex gap={2} justifyContent={"space-between"}>
            <Flex gap={6} justifyContent={"space-between"} alignItems={"center"}>
                <Box>
                    <Avatar
                        size={"md"}
                        name={user ? user.fullName : "John Doe"}
                        src={user && user.profilePic}
                        rounded={"full"}
                        shadow={"xl"}
                        border={"1px solid"}
                    />
                </Box>
                <Text fontSize={"md"} textTransform={"capitalize"}>
                    {user ? user.fullName : t("common.tatUser")}
                </Text>
            </Flex>
            <Box>
                <Button
                    bg={"red.400"}
                    color={"white"}
                    _hover={{
                        bg: "red.500",
                    }}
                    onClick={handleBlockButtonClick}
                    isLoading={blockLoading}
                >
                    {t("common.unblock")}
                </Button>
            </Box>
        </Flex>
    )
}

BlockedUserTile.propTypes = {
    user: PropTypes.object.isRequired
}

export default BlockedUserTile