import { Flex, Heading } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import NotificationsButton from "../shared/NotificationsButton";
import notificationAtom from "../../atoms/notificationAtom";


const TopBar = () => {
    const unreadNotifications = useRecoilValue(notificationAtom);


    return (
        <Flex position={"relative"} w={"full"} justifyContent={"space-between"} alignItems={"center"} mb={2} display={{ base: "flex", md: "none" }}
        >
            <Flex>
                <Heading >T.A.T</Heading>
            </Flex>
            <Flex justifyItems={"end"} alignItems={"center"} >
                <NotificationsButton notificationCount={unreadNotifications} />
            </Flex>
        </Flex>
    )
}


export default TopBar