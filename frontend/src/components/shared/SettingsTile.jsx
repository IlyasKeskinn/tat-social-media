import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react"
import { LuChevronLeft } from "react-icons/lu";
import { useSetRecoilState } from "recoil";
import selectedSettingAtom from "../../atoms/selectedSetting";
import PropTypes from "prop-types";


const SettingsTile = ({ settingTile }) => {
    const setSelectedSetting = useSetRecoilState(selectedSettingAtom);
    const isMdOrLarger = useBreakpointValue({ base: false, md: true });


    const handleBack = () => {
        setSelectedSetting(null);
    };
    return (
        <Flex direction={"row"} gap={3} mb={4} w={"full"} alignItems={"center"} textAlign={"start"}>
            {!isMdOrLarger && <Box
                cursor={"pointer"}
                onClick={handleBack}
            >
                <LuChevronLeft size={24} />
            </Box>}
            <Text
                fontSize={"xl"}
                fontWeight={"bold"}
            >
                {settingTile}
            </Text>
        </Flex>
    )
}

SettingsTile.propTypes = {
    settingTile: PropTypes.string.isRequired,
}
export default SettingsTile