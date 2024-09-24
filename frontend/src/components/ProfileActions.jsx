import {
    Menu,
    MenuButton,
    Portal,
    MenuList,
    MenuItem,
    Text,
} from "@chakra-ui/react"

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useCopyProfile from "../hooks/useCopyProfile";


const ProfileActions = () => {

    const copyProfile = useCopyProfile();

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
                    <MenuItem>
                        <Text color={"red.500"}>Block</Text>
                    </MenuItem>
                    <MenuItem>
                        <Text color={"red.500"}>Report!</Text>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            copyProfile();
                        }}
                    >
                        <Text>
                            Copy Profile URL
                        </Text>
                    </MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    )
}

export default ProfileActions