import { Menu, MenuButton, Portal, MenuList, MenuItem, Text, } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";

import useCopyProfile from "../../hooks/useCopyProfile";
import userAtom from "../../atoms/userAtom";


const OwnerProfileActions = () => {
    const user = useRecoilValue(userAtom)
    const copyProfile = useCopyProfile();
    const navigate = useNavigate();
    const PROFILE_EDIT_URL = `/profile/edit/${user.userName}`;

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
                            Copy Profile URL
                        </Text>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate(PROFILE_EDIT_URL);
                        }}
                    >
                        <Text>Edit Profile</Text>
                    </MenuItem>
                    <MenuItem>
                        <Text>Settings & Privacy</Text>
                    </MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    )
}

export default OwnerProfileActions