import { Box, Flex, Text } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import selectedSettingAtom from "../../../atoms/selectedSetting";
import PropTypes from "prop-types";


const SettingsMenuItem = ({ label, to }) => {
    const setSelectedSetting = useSetRecoilState(selectedSettingAtom);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const isActive = location.pathname === to;

    const handleSelectSetting = () => {
        setSelectedSetting(to);
    }


    return (
        <Link style={{ width: "100%" }} to={to} onClick={handleSelectSetting}>
            <Flex
                w={"full"}
                alignItems={"center"}
                justifyContent={"space-between"}
                cursor={"pointer"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                transition={"all 300ms"}
                px={1}
                py={3}
                rounded={8}
                position={"relative"}
            >
                <Box
                    w="5px"
                    h="100%"
                    bg={
                        isActive
                            ? "green.400"
                            : isHovered
                                ? "green.200"
                                : "transparent"
                    }
                    transition="all 300ms"
                    position={"absolute"}
                    left={0}
                    top={0}
                />
                <Text ml={2}>{label}</Text>
                <LuChevronRight />
            </Flex>
        </Link>
    );
};

SettingsMenuItem.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default SettingsMenuItem;
