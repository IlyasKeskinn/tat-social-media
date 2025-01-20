import { Flex, Heading } from "@chakra-ui/react"
import NotificationsButton from "../shared/NotificationsButton"


const TopBar = () => {

    return (
        <Flex position={"relative"} w={"full"} justifyContent={"space-between"} alignItems={"center"} mb={2} display={{ base: "flex", md: "none" }}
        >
            <Flex>
                <Heading >T.A.T</Heading>
            </Flex>
            <Flex justifyItems={"end"} alignItems={"center"} >
                <NotificationsButton notificationCount={5} />
            </Flex>
        </Flex>
    )
}


export default TopBar