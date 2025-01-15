import { Box, Flex, Stack, useBreakpointValue } from "@chakra-ui/react"
import SettingsMenu from "../components/menu/settingsMenu/SettingsMenu"
import { Outlet } from "react-router"
import { useRecoilValue } from "recoil"
import selectedSettingAtom from "../atoms/selectedSetting"


const Settings = () => {
    const selectedSetting = useRecoilValue(selectedSettingAtom);
    const isMdOrLarger = useBreakpointValue({ base: false, md: true });

    return (
        <Box position={"relative"} w={"full"} h={"full"}>
            <Stack spacing={{ base: "0", sm: 8 }} direction={"row"} h={"full"}>
                {isMdOrLarger ? <SettingsMenu /> : selectedSetting === null && <SettingsMenu />}
                <Flex
                    flex={4}
                    direction="column"
                    display={selectedSetting !== null ? "flex" : { base: "none", md: "flex" }}
                >
                    <Outlet />
                </Flex>
            </Stack>
        </Box>
    )
}

export default Settings
