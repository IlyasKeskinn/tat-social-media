import { Menu, MenuButton, Portal, MenuList, MenuItem, Text, } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";

import useCopyProfile from "../../hooks/useCopyProfile";
import userAtom from "../../atoms/userAtom";


const OwnerProfileActions = () => {
    const user = useRecoilValue(userAtom)
    const copyProfile = useCopyProfile();
    const navigate = useNavigate();
    const PROFILE_EDIT_URL = `/profile/edit/${user.userName}`;
    const settingsURL = `/settings`;
    const { t } = useTranslation();

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
                            copyProfile();
                        }}
                    >
                        <Text>
                            {t("common.copyProfileURL")}
                        </Text>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate(PROFILE_EDIT_URL);
                        }}
                    >
                        <Text>{t("common.editProfile")}</Text>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate(settingsURL);
                        }}>
                        <Text>{t("common.settingsPrivacy")}</Text>
                    </MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    )
}

export default OwnerProfileActions