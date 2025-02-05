import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";


const NotificationsButton = ({ notificationCount }) => {
    const navigate = useNavigate();
    const displayCount = notificationCount > 9 ? "9+" : notificationCount;

    return (
        <Flex 
            position={"relative"} 
            justifyContent={"center"} 
            alignItems={"center"} 
            cursor={"pointer"} 
            borderRadius={"full"} 
            w={"full"} 
            h={"full"}
            onClick={() => navigate("/notifications")}
        >
            <IoIosNotificationsOutline size={36} />
            {notificationCount > 0 &&
                <Flex position={"absolute"} justifyContent={"center"} alignItems={"center"} borderRadius={"full"} bg={"red.500"} w={"20px"} h={"20px"} top={0} right={0} padding={2}>
                    <Text color={"white"} fontSize={"sm"}>{displayCount}</Text>
                </Flex>}
        </Flex>
    )
}

NotificationsButton.propTypes = {
    notificationCount: PropTypes.number
}

export default NotificationsButton