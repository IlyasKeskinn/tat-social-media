import {
    Menu,
    MenuButton,
    Portal,
    MenuList,
    MenuItem,
    Text,
} from "@chakra-ui/react"

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PropTypes from "prop-types"
import useCopyProfile from "../hooks/useCopyProfile";
import useBlockUnblock from "../hooks/useBlockUnblock";


const ProfileActions = ({ user }) => {

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
                            {user.blocked ? "Unblock" : "Block"}
                        </Text>
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


ProfileActions.propTypes = {
    user: PropTypes.object.isRequired,
}
export default ProfileActions