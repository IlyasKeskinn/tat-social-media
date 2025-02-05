import { Menu, MenuButton, Portal, MenuList, MenuItem, Text, } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import useBlockUnblock from "../../hooks/useBlockUnblock";
import useCopyProfile from "../../hooks/useCopyProfile";


const ProfileActions = ({ user }) => {
    const { t } = useTranslation();
    const copyProfile = useCopyProfile();
    const { handleBlockUnblock, isLoading } = useBlockUnblock(user)

    const handleBlockMenuClick = () => {
        if (isLoading) return;
        handleBlockUnblock();
    }

    return (
        <Menu>
            <MenuButton>
                <HiOutlineDotsHorizontal
                    cursor={"pointer"}
                    fontSize={"24px"}
                />
            </MenuButton>
            <Portal>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            handleBlockMenuClick();
                        }}
                    >
                        <Text color={"red.500"}>
                            {user.blocked ? t("common.unblock") : t("common.block")}
                        </Text>
                    </MenuItem>
                    <MenuItem>
                        <Text color={"red.500"}>{t("common.report")}</Text>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            copyProfile();
                        }}
                    >
                        <Text>
                            {t("common.copyProfileURL")}
                        </Text>
                    </MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    )
}


ProfileActions.propTypes = {
    user: PropTypes.object.isRequired,
}
export default ProfileActions